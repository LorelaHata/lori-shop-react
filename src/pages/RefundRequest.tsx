
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Order, OrderStatus, OrderItem } from "../types/order";
import { Check } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { getUserOrders, addRefundRequest } from "../data/orders";

const formSchema = z.object({
  reason: z.string().min(10, {
    message: "Reason must be at least 10 characters.",
  }),
  selectedItems: z.array(z.object({
    orderId: z.string(),
    productId: z.number(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    image: z.string()
  })).min(1, {
    message: "Please select at least one item to refund."
  })
});

type RefundFormValues = z.infer<typeof formSchema>;

const getOrderStatusBadge = (status: OrderStatus) => {
  switch (status) {
    case "delivered":
      return <Badge className="bg-green-500">Delivered</Badge>;
    case "shipped":
      return <Badge className="bg-blue-500">Shipped</Badge>;
    case "processing":
      return <Badge className="bg-yellow-500">Processing</Badge>;
    case "canceled":
      return <Badge variant="destructive">Canceled</Badge>;
    case "refunded":
      return <Badge variant="secondary">Refunded</Badge>;
    case "partially_refunded":
      return <Badge variant="secondary">Partially Refunded</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const RefundRequest = () => {
  const [selectedItems, setSelectedItems] = useState<Array<OrderItem & { orderId: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const form = useForm<RefundFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: "",
      selectedItems: []
    }
  });

  useEffect(() => {
    if (user) {
      const userOrders = getUserOrders(user.id);
      // Only show delivered orders that can be refunded
      const refundableOrders = userOrders.filter(order => order.status === "delivered");
      setOrders(refundableOrders);
    }
    setLoading(false);
  }, [user]);
  
  const handleItemSelect = (order: Order, item: OrderItem) => {
    const itemWithOrderId = { ...item, orderId: order.id };
    const isSelected = selectedItems.some(
      selected => selected.orderId === order.id && selected.productId === item.productId
    );
    
    if (isSelected) {
      const newSelectedItems = selectedItems.filter(
        selected => !(selected.orderId === order.id && selected.productId === item.productId)
      );
      setSelectedItems(newSelectedItems);
      form.setValue("selectedItems", newSelectedItems);
    } else {
      const newSelectedItems = [...selectedItems, itemWithOrderId];
      setSelectedItems(newSelectedItems);
      form.setValue("selectedItems", newSelectedItems);
    }
  };
  
  const isItemSelected = (orderId: string, productId: number) => {
    return selectedItems.some(
      selected => selected.orderId === orderId && selected.productId === productId
    );
  };
  
  const getTotalRefundAmount = () => {
    return selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  function onSubmit(data: RefundFormValues) {
    if (!user) {
      toast.error("Please sign in to submit a refund request");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create refund request for each selected item
      data.selectedItems.forEach(item => {
        // Convert the form item to OrderItem format
        const orderItem: OrderItem = {
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        };

        addRefundRequest({
          orderId: item.orderId,
          reason: data.reason,
          amount: item.price * item.quantity,
          items: [orderItem]
        });
      });

      toast.success(`Refund request submitted for €${getTotalRefundAmount().toFixed(2)}`, {
        description: "We'll review your request and get back to you shortly."
      });
      
      navigate("/profile");
    } catch (error) {
      toast.error("Failed to submit refund request. Please try again.");
      console.error("Refund request error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Sign In Required</h1>
        <p className="text-muted-foreground mb-8">
          Please sign in to request refunds for your orders.
        </p>
        <Button onClick={() => navigate("/login")}>
          Sign In
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">No Refundable Orders</h1>
        <p className="text-muted-foreground mb-8">
          You don't have any delivered orders that can be refunded at this time.
        </p>
        <Button onClick={() => navigate("/shop")}>
          Continue Shopping
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Request a Refund</h1>
      <p className="text-muted-foreground mb-8">
        Click on the product images you want to refund and provide a reason for your request.
      </p>
      
      <div className="max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Product Selection */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Select Items to Refund</h2>
              {orders.map(order => (
                <Card key={order.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Order #{order.id.slice(-6)}</span>
                      <span>{getOrderStatusBadge(order.status)}</span>
                    </CardTitle>
                    <CardDescription>
                      Placed on {formatDate(order.createdAt)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.items.map((item) => (
                        <div
                          key={`${order.id}-${item.productId}`}
                          className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                            isItemSelected(order.id, item.productId)
                              ? 'border-primary bg-primary/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleItemSelect(order, item)}
                        >
                          <div className="p-4">
                            <div className="relative mb-3">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="w-full h-32 object-cover rounded-md"
                              />
                              {isItemSelected(order.id, item.productId) && (
                                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                                  <Check className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                              <p className="text-sm text-muted-foreground mb-1">
                                Qty: {item.quantity}
                              </p>
                              <p className="font-semibold text-sm">
                                €{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Selected Items Summary */}
            {selectedItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Refund Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div className="flex items-center space-x-3">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="font-medium">
                          €{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 font-semibold">
                      <span>Total Refund Amount:</span>
                      <span>€{getTotalRefundAmount().toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Refund</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please explain why you're requesting a refund..."
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/profile")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || selectedItems.length === 0}>
                {isSubmitting ? "Submitting..." : `Submit Refund Request (€${getTotalRefundAmount().toFixed(2)})`}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RefundRequest;
