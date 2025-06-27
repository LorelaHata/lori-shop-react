
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CreditCard } from "lucide-react";
import { toast } from "sonner";
import { Order, OrderItem, RefundRequest } from "../../types/order";
import { addRefundRequest } from "../../data/orders";

interface OrderSidebarProps {
  order: Order;
  existingRefunds: RefundRequest[];
  itemsToRefund: OrderItem[];
  onRefundSubmit: () => void;
}

const OrderSidebar = ({ order, existingRefunds, itemsToRefund, onRefundSubmit }: OrderSidebarProps) => {
  const [refundReason, setRefundReason] = useState("");
  
  const canRequestRefund = order.status !== "canceled" && order.status !== "refunded" && 
                          existingRefunds.filter(r => r.status === "pending").length === 0;

  const handleRefundSubmit = () => {
    if (itemsToRefund.length === 0 || !refundReason.trim()) {
      toast.error("Please select items and provide a reason for your refund request");
      return;
    }
    
    const refundAmount = itemsToRefund.reduce((total, item) => total + item.price * item.quantity, 0);
    
    addRefundRequest({
      orderId: order.id,
      reason: refundReason,
      amount: refundAmount,
      items: itemsToRefund
    });
    
    toast.success("Refund request submitted successfully");
    setRefundReason("");
    onRefundSubmit();
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-md">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">
                {order.paymentMethod.cardType === "visa" ? "Visa" : 
                 order.paymentMethod.cardType === "mastercard" ? "MasterCard" : "Amex"} {order.paymentMethod.cardNumber}
              </p>
              <p className="text-sm text-muted-foreground">
                {order.paymentMethod.cardHolderName} • Expires {order.paymentMethod.expiryDate}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            If you have any issues with your order, you can request a refund or contact customer support.
          </p>
          
          {canRequestRefund && itemsToRefund.length > 0 && (
            <div className="bg-muted p-3 rounded-md text-sm">
              <p className="font-medium">Selected for refund:</p>
              <p>
                {itemsToRefund.length} item(s) - €
                {itemsToRefund.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
              </p>
            </div>
          )}
          
          {canRequestRefund ? (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full" variant="outline">
                  Request Refund
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Request a Refund</AlertDialogTitle>
                  <AlertDialogDescription>
                    Please select the items you want to return and provide a reason.
                    {itemsToRefund.length === 0 && (
                      <p className="text-red-500 mt-1">Select at least one item from the order.</p>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                
                <div className="py-4">
                  <Textarea
                    placeholder="Please describe the reason for your refund request..."
                    className="resize-none"
                    value={refundReason}
                    onChange={(e) => setRefundReason(e.target.value)}
                  />
                  {!refundReason && (
                    <p className="text-sm text-red-500 mt-1">A reason is required.</p>
                  )}
                </div>
                
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRefundSubmit}>Submit Request</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button className="w-full" variant="outline" disabled>
              {existingRefunds.some(r => r.status === "pending") 
                ? "Refund Request Pending" 
                : "Request Refund"}
            </Button>
          )}
          
          <Button className="w-full">Contact Support</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSidebar;
