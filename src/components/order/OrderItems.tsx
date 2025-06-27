
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "../../data/orders";
import { Order, OrderItem } from "../../types/order";

interface OrderItemsProps {
  order: Order;
  canRequestRefund: boolean;
  itemsToRefund: OrderItem[];
  onToggleItemForRefund: (item: OrderItem) => void;
  orderDate: string;
}

const OrderItems = ({ order, canRequestRefund, itemsToRefund, onToggleItemForRefund, orderDate }: OrderItemsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Items</CardTitle>
        <CardDescription>
          Order placed on {formatDate(orderDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center space-x-4">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                {canRequestRefund && (
                  <input 
                    type="checkbox"
                    className="absolute top-0 right-0 w-4 h-4 m-1"
                    checked={itemsToRefund.some(i => i.productId === item.productId)}
                    onChange={() => onToggleItemForRefund(item)}
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-muted-foreground">
                  €{item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
              <div className="font-medium">
                €{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-end">
          <div className="w-1/2 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>€{order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>€{order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItems;
