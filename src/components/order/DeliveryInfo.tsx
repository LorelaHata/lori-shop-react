
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Info } from "lucide-react";
import { Order } from "../../types/order";

interface DeliveryInfoProps {
  order: Order;
}

const DeliveryInfo = ({ order }: DeliveryInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delivery Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Package className="h-4 w-4" /> Shipping Address
            </h3>
            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
          <div>
            <h3 className="font-medium mb-2 flex items-center gap-2">
              <Info className="h-4 w-4" /> Shipping Status
            </h3>
            {order.trackingNumber ? (
              <>
                <p className="text-sm">Tracking Number:</p>
                <p className="font-medium">{order.trackingNumber}</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">
                {order.status === "processing" ? "Your order is being processed" : 
                 order.status === "pending" ? "Awaiting processing" : 
                 "Tracking information unavailable"}
              </p>
            )}
            <div className="mt-2">
              <Button variant="outline" size="sm" disabled={!order.trackingNumber}>
                Track Package
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryInfo;
