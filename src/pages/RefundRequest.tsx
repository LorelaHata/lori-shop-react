
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
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
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Order, OrderStatus } from "../types/order";

// Mock order data for the demo
const mockOrders: Order[] = [
  {
    id: "order-123456",
    userId: "user-1",
    items: [
      {
        productId: 1,
        name: "Minimalist Watch",
        price: 159.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=80"
      },
      {
        productId: 5,
        name: "Cotton T-Shirt",
        price: 29.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
      }
    ],
    total: 219.97,
    status: "delivered",
    createdAt: "2023-04-15T10:30:00Z",
    updatedAt: "2023-04-18T09:45:00Z",
    shippingAddress: {
      id: "addr-1",
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true
    },
    paymentMethod: {
      id: "pay-1",
      cardNumber: "4242",
      cardHolderName: "John Doe",
      expiryDate: "04/25",
      isDefault: true,
      cardType: "visa"
    },
    trackingNumber: "TRK12345678"
  },
  {
    id: "order-789012",
    userId: "user-1",
    items: [
      {
        productId: 3,
        name: "Leather Backpack",
        price: 129.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1028&q=80"
      }
    ],
    total: 129.99,
    status: "delivered",
    createdAt: "2023-03-28T14:20:00Z",
    updatedAt: "2023-03-31T16:10:00Z",
    shippingAddress: {
      id: "addr-1",
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true
    },
    paymentMethod: {
      id: "pay-2",
      cardNumber: "5678",
      cardHolderName: "John Doe",
      expiryDate: "08/24",
      isDefault: false,
      cardType: "mastercard"
    },
    trackingNumber: "TRK87654321"
  }
];

const formSchema = z.object({
  orderId: z.string({
    required_error: "Please select an order.",
  }),
  reason: z.string().min(10, {
    message: "Reason must be at least 10 characters.",
  }),
  itemsToReturn: z.array(z.number()).optional()
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<RefundFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reason: ""
    }
  });
  
  const handleOrderSelect = (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId);
    setSelectedOrder(order || null);
  };
  
  function onSubmit(data: RefundFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Refund request submitted",
        description: "Your refund request has been received. We'll review it shortly.",
      });
      navigate("/profile");
    }, 1500);
    
    console.log("Refund request submitted", data);
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Request a Refund</h1>
      <p className="text-muted-foreground mb-8">
        Please select an order and provide details for your refund request.
      </p>
      
      <div className="max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="orderId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Order</FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleOrderSelect(value);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an order" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockOrders.map(order => (
                          <SelectItem key={order.id} value={order.id}>
                            Order #{order.id.slice(-6)} - {formatDate(order.createdAt)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {selectedOrder && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Order #{selectedOrder.id.slice(-6)}</span>
                    <span>{getOrderStatusBadge(selectedOrder.status)}</span>
                  </CardTitle>
                  <CardDescription>
                    Placed on {formatDate(selectedOrder.createdAt)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Items</h4>
                      {selectedOrder.items.map((item, index) => (
                        <div key={index} className="flex items-center py-2 border-b last:border-0">
                          <div className="h-16 w-16 rounded overflow-hidden mr-4">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × €{item.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="font-medium">
                            €{(item.quantity * item.price).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-right font-semibold">
                      Total: €{selectedOrder.total.toFixed(2)}
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
              <Button type="submit" disabled={isSubmitting || !selectedOrder}>
                {isSubmitting ? "Submitting..." : "Submit Refund Request"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RefundRequest;
