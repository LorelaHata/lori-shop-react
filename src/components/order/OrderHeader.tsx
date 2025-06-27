
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, Truck, CheckCircle, XCircle, CreditCard } from "lucide-react";
import { Order } from "../../types/order";

interface OrderHeaderProps {
  order: Order;
}

const OrderHeader = ({ order }: OrderHeaderProps) => {
  const getStatusDisplay = (status: string) => {
    switch (status) {
      case "delivered":
        return { icon: <CheckCircle className="h-4 w-4" />, color: "bg-green-500", text: "Delivered" };
      case "shipped":
        return { icon: <Truck className="h-4 w-4" />, color: "bg-blue-500", text: "Shipped" };
      case "processing":
        return { icon: <Clock className="h-4 w-4" />, color: "bg-yellow-500", text: "Processing" };
      case "canceled":
        return { icon: <XCircle className="h-4 w-4" />, color: "bg-red-500", text: "Canceled" };
      case "refunded":
        return { icon: <CreditCard className="h-4 w-4" />, color: "bg-purple-500", text: "Refunded" };
      case "partially_refunded":
        return { icon: <CreditCard className="h-4 w-4" />, color: "bg-orange-500", text: "Partially Refunded" };
      default:
        return { icon: <Package className="h-4 w-4" />, color: "bg-gray-500", text: "Pending" };
    }
  };

  const statusDisplay = getStatusDisplay(order.status);

  return (
    <div className="flex items-center mb-6 space-x-4">
      <Button variant="outline" size="sm" asChild>
        <Link to="/profile">
          <span>Back to Profile</span>
        </Link>
      </Button>
      <h1 className="text-2xl font-bold">Order #{order.id}</h1>
      <Badge className={`ml-2 ${statusDisplay.color} text-white flex items-center gap-1`}>
        {statusDisplay.icon}
        {statusDisplay.text}
      </Badge>
    </div>
  );
};

export default OrderHeader;
