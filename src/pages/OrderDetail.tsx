
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getOrderById, getRefundsByOrderId } from "../data/orders";
import { Button } from "@/components/ui/button";
import { OrderItem } from "../types/order";
import OrderHeader from "../components/order/OrderHeader";
import OrderTimeline from "../components/order/OrderTimeline";
import OrderItems from "../components/order/OrderItems";
import DeliveryInfo from "../components/order/DeliveryInfo";
import RefundRequests from "../components/order/RefundRequests";
import OrderSidebar from "../components/order/OrderSidebar";
import { Link } from "react-router-dom";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [itemsToRefund, setItemsToRefund] = useState<OrderItem[]>([]);
  
  if (!isAuthenticated() || !id) {
    navigate("/login", { replace: true });
    return null;
  }
  
  const order = getOrderById(id);
  const existingRefunds = getRefundsByOrderId(id);
  
  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist or you don't have permission to view it.</p>
        <Button asChild>
          <Link to="/profile">Back to Profile</Link>
        </Button>
      </div>
    );
  }
  
  // Check if this user owns this order
  if (order.userId !== user?.id) {
    navigate("/profile", { replace: true });
    return null;
  }
  
  const canRequestRefund = order.status !== "canceled" && order.status !== "refunded" && 
                          existingRefunds.filter(r => r.status === "pending").length === 0;
  
  const toggleItemForRefund = (item: OrderItem) => {
    if (itemsToRefund.some(i => i.productId === item.productId)) {
      setItemsToRefund(itemsToRefund.filter(i => i.productId !== item.productId));
    } else {
      setItemsToRefund([...itemsToRefund, item]);
    }
  };

  const handleRefundSubmit = () => {
    setItemsToRefund([]);
  };
  
  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <OrderHeader order={order} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <OrderTimeline order={order} />
          <OrderItems 
            order={order}
            canRequestRefund={canRequestRefund}
            itemsToRefund={itemsToRefund}
            onToggleItemForRefund={toggleItemForRefund}
          />
          <DeliveryInfo order={order} />
          <RefundRequests refunds={existingRefunds} />
        </div>
        
        <div>
          <OrderSidebar 
            order={order}
            existingRefunds={existingRefunds}
            itemsToRefund={itemsToRefund}
            onRefundSubmit={handleRefundSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
