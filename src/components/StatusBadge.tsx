
import { OrderStatus } from "../types/order";
import { Badge } from "./ui/badge";

interface StatusBadgeProps {
  status: OrderStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const getStatusDetails = () => {
    switch (status) {
      case "pending":
        return { label: "Pending", className: "bg-yellow-500 hover:bg-yellow-600" };
      case "processing":
        return { label: "Processing", className: "bg-blue-500 hover:bg-blue-600" };
      case "shipped":
        return { label: "Shipped", className: "bg-indigo-500 hover:bg-indigo-600" };
      case "delivered":
        return { label: "Delivered", className: "bg-green-500 hover:bg-green-600" };
      case "canceled":
        return { label: "Canceled", className: "bg-red-500 hover:bg-red-600" };
      case "refunded":
        return { label: "Refunded", className: "bg-gray-500 hover:bg-gray-600" };
      case "partially_refunded":
        return { label: "Partially Refunded", className: "bg-purple-500 hover:bg-purple-600" };
      default:
        return { label: status, className: "" };
    }
  };

  const { label, className } = getStatusDetails();

  return <Badge className={className}>{label}</Badge>;
};

export default StatusBadge;
