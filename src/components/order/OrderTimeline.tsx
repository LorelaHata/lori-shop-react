
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, Truck } from "lucide-react";
import { formatDate } from "../../data/orders";
import { Order } from "../../types/order";

interface OrderTimelineProps {
  order: Order;
}

const OrderTimeline = ({ order }: OrderTimelineProps) => {
  const currentDate = new Date().toISOString();
  const realTimeOrderDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Order Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium">Order Placed</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(realTimeOrderDate)} at {new Date(realTimeOrderDate).toLocaleTimeString()}
              </p>
            </div>
          </div>

          {order.status !== "pending" && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Processing Started</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(new Date(Date.now() - Math.random() * 2 * 24 * 60 * 60 * 1000).toISOString())}
                </p>
              </div>
            </div>
          )}

          {(order.status === "shipped" || order.status === "delivered") && (
            <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
              <Truck className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="font-medium">Order Shipped</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(new Date(Date.now() - Math.random() * 1 * 24 * 60 * 60 * 1000).toISOString())}
                </p>
              </div>
            </div>
          )}

          {order.status === "delivered" && (
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-medium">Order Delivered</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(currentDate)} (estimated)
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTimeline;
