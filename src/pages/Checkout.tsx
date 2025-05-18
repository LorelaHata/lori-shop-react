
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useProfile } from "../contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import AddressForm from "../components/profile/AddressForm";
import PaymentMethodForm from "../components/profile/PaymentMethodForm";

const Checkout = () => {
  const { items, clearCart, getCartTotal } = useCart();
  const { addresses, paymentMethods } = useProfile();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState<string>(
    addresses.find((addr) => addr.isDefault)?.id || ""
  );
  const [selectedPayment, setSelectedPayment] = useState<string>(
    paymentMethods.find((payment) => payment.isDefault)?.id || ""
  );
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isAddingPayment, setIsAddingPayment] = useState(false);

  const handleCheckout = () => {
    if (!selectedAddress) {
      toast.error("Please select a shipping address");
      return;
    }

    if (!selectedPayment) {
      toast.error("Please select a payment method");
      return;
    }

    // This would normally call an API to process the order
    toast.success("Order placed successfully!");
    clearCart();
    navigate("/profile");
  };

  const renderPaymentMethodDetails = (method: any) => {
    switch (method.type) {
      case "credit_card":
        return (
          <>
            <div className="font-medium">{method.cardNumber}</div>
            <div className="text-sm text-gray-500">
              {method.cardHolder} • Expires {method.expiryDate}
            </div>
          </>
        );
      case "paypal":
        return (
          <>
            <div className="font-medium">PayPal</div>
            <div className="text-sm text-gray-500">
              {method.accountEmail}
            </div>
          </>
        );
      case "bank_transfer":
        return (
          <>
            <div className="font-medium">Bank Transfer</div>
            <div className="text-sm text-gray-500">
              {method.bankName} • {method.accountNumber}
            </div>
          </>
        );
      default:
        return <div>Unknown payment method</div>;
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="text-center py-16">
          <p className="text-xl text-gray-500">Your cart is empty</p>
          <Button className="mt-4" onClick={() => navigate("/shop")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl page-transition">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
              {isAddingAddress ? (
                <AddressForm
                  onCancel={() => setIsAddingAddress(false)}
                />
              ) : (
                <>
                  <RadioGroup
                    value={selectedAddress}
                    onValueChange={setSelectedAddress}
                    className="space-y-4"
                  >
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="flex items-center space-x-2 border rounded-lg p-4"
                      >
                        <RadioGroupItem value={address.id} id={`address-${address.id}`} />
                        <Label
                          htmlFor={`address-${address.id}`}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-medium">{address.name}</div>
                          <div className="text-sm text-gray-500">
                            {address.street}, {address.city}, {address.state} {address.zipCode}
                          </div>
                          <div className="text-sm text-gray-500">
                            {address.country}
                          </div>
                          {address.isDefault && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mt-1 inline-block">
                              Default
                            </span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() => setIsAddingAddress(true)}
                  >
                    Add New Address
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              {isAddingPayment ? (
                <PaymentMethodForm
                  onCancel={() => setIsAddingPayment(false)}
                />
              ) : (
                <>
                  <RadioGroup
                    value={selectedPayment}
                    onValueChange={setSelectedPayment}
                    className="space-y-4"
                  >
                    {paymentMethods.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center space-x-2 border rounded-lg p-4"
                      >
                        <RadioGroupItem value={payment.id} id={`payment-${payment.id}`} />
                        <Label
                          htmlFor={`payment-${payment.id}`}
                          className="flex-1 cursor-pointer"
                        >
                          {renderPaymentMethodDetails(payment)}
                          {payment.isDefault && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mt-1 inline-block">
                              Default
                            </span>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() => setIsAddingPayment(true)}
                  >
                    Add New Payment Method
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <div className="font-medium">
                        {item.name} × {item.quantity}
                      </div>
                    </div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-medium">
                  <div>Subtotal</div>
                  <div>${getCartTotal().toFixed(2)}</div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>Shipping</div>
                  <div>Free</div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <div>Total</div>
                  <div>${getCartTotal().toFixed(2)}</div>
                </div>

                <Button 
                  className="w-full mt-4" 
                  size="lg" 
                  onClick={handleCheckout}
                  disabled={!selectedAddress || !selectedPayment || isAddingAddress || isAddingPayment}
                >
                  Place Order
                </Button>
                <p className="text-center text-xs text-gray-500 mt-2">
                  By placing your order, you agree to our Terms of Service and
                  Privacy Policy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
