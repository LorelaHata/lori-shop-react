
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getOrderById, getRefundsByOrderId } from "../data/orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { OrderItem } from "../types/order";
import OrderHeader from "../components/order/OrderHeader";
import OrderTimeline from "../components/order/OrderTimeline";
import OrderItems from "../components/order/OrderItems";
import DeliveryInfo from "../components/order/DeliveryInfo";
import RefundRequests from "../components/order/RefundRequests";
import OrderSidebar from "../components/order/OrderSidebar";
import { Link } from "react-router-dom";
import { formatDate } from "../data/orders";
import { Package, CreditCard, MapPin, Calendar, Receipt } from "lucide-react";

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

  const realTimeOrderDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();
  
  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <OrderHeader order={order} />
      
      {/* Order Summary Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-md">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Order Date</p>
                <p className="font-medium">{formatDate(realTimeOrderDate)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-md">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Items</p>
                <p className="font-medium">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 p-2 rounded-md">
                <CreditCard className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="font-medium">€{order.total.toFixed(2)}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-orange-50 p-2 rounded-md">
                <MapPin className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Delivery To</p>
                <p className="font-medium">{order.shippingAddress.city}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
          
          {/* Order Notes */}
          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Order Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{order.notes}</p>
              </CardContent>
            </Card>
          )}
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
