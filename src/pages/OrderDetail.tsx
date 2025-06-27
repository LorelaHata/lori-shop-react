
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getOrderById, formatDate, addRefundRequest, getRefundsByOrderId } from "../data/orders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
import { OrderItem } from "../types/order";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Package, Clock, Info, CreditCard, Truck, CheckCircle, XCircle, Calendar } from "lucide-react";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [refundReason, setRefundReason] = useState("");
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
    setItemsToRefund([]);
  };
  
  const canRequestRefund = order.status !== "canceled" && order.status !== "refunded" && 
                          existingRefunds.filter(r => r.status === "pending").length === 0;
  
  const toggleItemForRefund = (item: OrderItem) => {
    if (itemsToRefund.some(i => i.productId === item.productId)) {
      setItemsToRefund(itemsToRefund.filter(i => i.productId !== item.productId));
    } else {
      setItemsToRefund([...itemsToRefund, item]);
    }
  };

  // Get status icon and color
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
  const currentDate = new Date().toISOString();
  const realTimeOrderDate = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();
  
  return (
    <div className="container mx-auto px-4 py-8 page-transition">
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Timeline */}
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

          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>
                Order placed on {formatDate(realTimeOrderDate)}
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
                          onChange={() => toggleItemForRefund(item)}
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
          
          {/* Delivery Information */}
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
          
          {/* Refund Requests */}
          {existingRefunds.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Refund Requests</CardTitle>
              </CardHeader>
              <CardContent>
                {existingRefunds.map((refund) => (
                  <div key={refund.id} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Refund #{refund.id}</p>
                        <p className="text-sm text-muted-foreground">
                          Requested on {formatDate(refund.requestDate)} • €{refund.amount.toFixed(2)}
                        </p>
                        {refund.responseDate && (
                          <p className="text-sm text-muted-foreground">
                            Processed on {formatDate(refund.responseDate)}
                          </p>
                        )}
                      </div>
                      <Badge className={`${
                        refund.status === "approved" ? "bg-green-500" :
                        refund.status === "rejected" ? "bg-red-500" :
                        "bg-yellow-500"
                      } text-white`}>
                        {refund.status}
                      </Badge>
                    </div>
                    <p className="text-sm mt-1">Reason: {refund.reason}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Sidebar */}
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
      </div>
    </div>
  );
};

export default OrderDetail;
