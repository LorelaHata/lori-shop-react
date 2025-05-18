
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { addOrder } from "../data/orders";
import { addresses, paymentMethods } from "../data/orders";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const newCardSchema = z.object({
  cardHolderName: z.string().min(2, { message: "Card holder name is required" }),
  cardNumber: z.string()
    .min(16, { message: "Card number must be at least 16 digits" })
    .max(19, { message: "Card number must be at most 19 digits" })
    .regex(/^[0-9\s-]+$/, { message: "Card number must contain only digits, spaces, or hyphens" }),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, { message: "Expiry date must be in MM/YY format" }),
  cvv: z.string()
    .length(3, { message: "CVV must be 3 digits" })
    .regex(/^[0-9]+$/, { message: "CVV must contain only digits" }),
});

const newAddressSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  street: z.string().min(2, { message: "Street address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zipCode: z.string().min(3, { message: "ZIP code is required" }),
  country: z.string().min(2, { message: "Country is required" }),
});

const Checkout = () => {
  const { user, isAuthenticated } = useAuth();
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || "");
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0]?.id || "");
  const [addressTab, setAddressTab] = useState("existing");
  const [paymentTab, setPaymentTab] = useState("existing");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const newCardForm = useForm<z.infer<typeof newCardSchema>>({
    resolver: zodResolver(newCardSchema),
    defaultValues: {
      cardHolderName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });
  
  const newAddressForm = useForm<z.infer<typeof newAddressSchema>>({
    resolver: zodResolver(newAddressSchema),
    defaultValues: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
  });
  
  if (!isAuthenticated()) {
    navigate("/login", { replace: true });
    return null;
  }
  
  if (items.length === 0) {
    navigate("/cart", { replace: true });
    return null;
  }
  
  const handleSubmitOrder = async () => {
    if (!user) {
      toast.error("You must be logged in to place an order");
      navigate("/login");
      return;
    }
    
    if (addressTab === "new" && !newAddressForm.formState.isValid) {
      newAddressForm.trigger();
      toast.error("Please complete your shipping information");
      return;
    }
    
    if (paymentTab === "new" && !newCardForm.formState.isValid) {
      newCardForm.trigger();
      toast.error("Please complete your payment information");
      return;
    }
    
    if (addressTab === "existing" && !selectedAddress) {
      toast.error("Please select a shipping address");
      return;
    }
    
    if (paymentTab === "existing" && !selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create order items from cart items
      const orderItems = items.map(item => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));
      
      // Get the selected address and payment method
      const shippingAddress = addressTab === "existing" 
        ? addresses.find(addr => addr.id === selectedAddress)! 
        : { 
            id: `addr-${Date.now()}`, 
            isDefault: false,
            ...newAddressForm.getValues() 
          };
      
      const paymentMethod = paymentTab === "existing"
        ? paymentMethods.find(pm => pm.id === selectedPayment)!
        : {
            id: `pm-${Date.now()}`,
            cardNumber: `•••• ${newCardForm.getValues().cardNumber.slice(-4)}`,
            cardHolderName: newCardForm.getValues().cardHolderName,
            expiryDate: newCardForm.getValues().expiryDate,
            isDefault: false,
            cardType: "visa" as const, // Default to visa for simplicity
          };
      
      // Create the order
      const newOrder = addOrder({
        userId: user.id,
        items: orderItems,
        total: getCartTotal(),
        status: "processing",
        shippingAddress,
        paymentMethod,
      });
      
      // Clear the cart and redirect to the order success page
      setTimeout(() => {
        clearCart();
        toast.success("Order placed successfully!");
        navigate(`/order/${newOrder.id}`);
      }, 1000);
      
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("There was an error placing your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        {/* Main checkout form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={addressTab} onValueChange={setAddressTab}>
                <TabsList className="grid grid-cols-2 w-[300px] mb-6">
                  <TabsTrigger value="existing">Use Existing</TabsTrigger>
                  <TabsTrigger value="new">Add New</TabsTrigger>
                </TabsList>
                
                <TabsContent value="existing">
                  {addresses.length > 0 ? (
                    <RadioGroup
                      value={selectedAddress}
                      onValueChange={setSelectedAddress}
                      className="space-y-4"
                    >
                      {addresses.map((address) => (
                        <div key={address.id} className="flex items-start space-x-3">
                          <RadioGroupItem 
                            value={address.id} 
                            id={`address-${address.id}`} 
                            className="mt-1"
                          />
                          <div className="grid gap-1">
                            <label
                              htmlFor={`address-${address.id}`}
                              className="font-medium cursor-pointer"
                            >
                              {address.name} {address.isDefault && "(Default)"}
                            </label>
                            <div className="text-sm text-muted-foreground">
                              <p>{address.street}</p>
                              <p>{address.city}, {address.state} {address.zipCode}</p>
                              <p>{address.country}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <p className="text-muted-foreground">No saved addresses. Please add a new one.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="new">
                  <Form {...newAddressForm}>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={newAddressForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Address Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Home, Work, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={newAddressForm.control}
                        name="street"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Input placeholder="1234 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={newAddressForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="City" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-6">
                        <FormField
                          control={newAddressForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="State" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={newAddressForm.control}
                          name="zipCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input placeholder="12345" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={newAddressForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="Country" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={paymentTab} onValueChange={setPaymentTab}>
                <TabsList className="grid grid-cols-2 w-[300px] mb-6">
                  <TabsTrigger value="existing">Saved Cards</TabsTrigger>
                  <TabsTrigger value="new">New Card</TabsTrigger>
                </TabsList>
                
                <TabsContent value="existing">
                  {paymentMethods.length > 0 ? (
                    <RadioGroup
                      value={selectedPayment}
                      onValueChange={setSelectedPayment}
                      className="space-y-4"
                    >
                      {paymentMethods.map((payment) => (
                        <div key={payment.id} className="flex items-start space-x-3">
                          <RadioGroupItem 
                            value={payment.id} 
                            id={`payment-${payment.id}`} 
                            className="mt-1"
                          />
                          <div className="grid gap-1">
                            <label
                              htmlFor={`payment-${payment.id}`}
                              className="font-medium cursor-pointer"
                            >
                              {payment.cardType === "visa" ? "Visa" :
                               payment.cardType === "mastercard" ? "MasterCard" : "Amex"} {payment.cardNumber}
                              {payment.isDefault && " (Default)"}
                            </label>
                            <p className="text-sm text-muted-foreground">
                              {payment.cardHolderName} • Expires {payment.expiryDate}
                            </p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  ) : (
                    <p className="text-muted-foreground">No saved payment methods. Please add a new one.</p>
                  )}
                </TabsContent>
                
                <TabsContent value="new">
                  <Form {...newCardForm}>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={newCardForm.control}
                        name="cardHolderName"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Cardholder Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={newCardForm.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="4242 4242 4242 4242" {...field} />
                            </FormControl>
                            <FormDescription>
                              Use 4242 4242 4242 4242 for testing
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={newCardForm.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={newCardForm.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVV</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="sticky top-20">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>
                  {items.length} item{items.length !== 1 ? "s" : ""} in your cart
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="max-h-64 overflow-auto space-y-3 pr-1">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-grow">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            €{item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-sm font-medium">
                          €{(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Order Totals */}
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>€{getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>€0.00</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between text-base font-medium">
                      <span>Total</span>
                      <span>€{getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button
                    className="w-full mt-4"
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
