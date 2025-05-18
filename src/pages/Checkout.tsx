
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Mock data
interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  isDefault: boolean;
}

const mockAddresses: Address[] = [
  {
    id: "1",
    name: "Home",
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: "2",
    name: "Work",
    street: "456 Business Ave",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
    isDefault: false,
  },
];

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    cardNumber: "**** **** **** 4242",
    cardHolder: "John Doe",
    expiryDate: "12/24",
    isDefault: true,
  },
  {
    id: "2",
    cardNumber: "**** **** **** 5555",
    cardHolder: "John Doe",
    expiryDate: "10/25",
    isDefault: false,
  },
];

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState<string>(
    mockAddresses.find((addr) => addr.isDefault)?.id || ""
  );
  const [selectedPayment, setSelectedPayment] = useState<string>(
    mockPaymentMethods.find((payment) => payment.isDefault)?.id || ""
  );
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    id: "",
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  });

  const [newPayment, setNewPayment] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    isDefault: false,
  });

  const handleCheckout = () => {
    // This would normally call an API to process the order
    toast.success("Order placed successfully!");
    clearCart();
    navigate("/profile");
  };

  const handleAddAddress = () => {
    // Validate that required fields are filled
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      toast.error("Please fill in all required address fields.");
      return;
    }
    
    // In a real app, this would call an API to add the address
    setIsAddingAddress(false);
    toast.success("New address added!");
  };

  const handleAddPayment = () => {
    // Validate that required fields are filled
    if (!newPayment.cardNumber || !newPayment.cardHolder || !newPayment.expiryDate || !newPayment.cvv) {
      toast.error("Please fill in all required payment fields.");
      return;
    }
    
    // In a real app, this would call an API to add the payment method
    setIsAddingPayment(false);
    toast.success("New payment method added!");
  };

  if (cart.length === 0) {
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
              {!isAddingAddress ? (
                <>
                  <RadioGroup
                    value={selectedAddress}
                    onValueChange={setSelectedAddress}
                    className="space-y-4"
                  >
                    {mockAddresses.map((address) => (
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
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="address-name">Address Name</Label>
                      <Input
                        id="address-name"
                        placeholder="Home, Work, etc."
                        value={newAddress.name}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        placeholder="Country"
                        value={newAddress.country}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, country: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      placeholder="Street address"
                      value={newAddress.street}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, street: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={newAddress.city}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, city: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        placeholder="State"
                        value={newAddress.state}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, state: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">Zip Code</Label>
                      <Input
                        id="zip"
                        placeholder="Zip code"
                        value={newAddress.zipCode}
                        onChange={(e) =>
                          setNewAddress({ ...newAddress, zipCode: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="default-address"
                      checked={newAddress.isDefault}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          isDefault: e.target.checked,
                        })
                      }
                    />
                    <Label htmlFor="default-address">Set as default address</Label>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingAddress(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddAddress}>Save Address</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              {!isAddingPayment ? (
                <>
                  <RadioGroup
                    value={selectedPayment}
                    onValueChange={setSelectedPayment}
                    className="space-y-4"
                  >
                    {mockPaymentMethods.map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center space-x-2 border rounded-lg p-4"
                      >
                        <RadioGroupItem value={payment.id} id={`payment-${payment.id}`} />
                        <Label
                          htmlFor={`payment-${payment.id}`}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="font-medium">{payment.cardNumber}</div>
                          <div className="text-sm text-gray-500">
                            {payment.cardHolder} • Expires {payment.expiryDate}
                          </div>
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
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input
                      id="card-number"
                      placeholder="1234 5678 9012 3456"
                      value={newPayment.cardNumber}
                      onChange={(e) =>
                        setNewPayment({ ...newPayment, cardNumber: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="card-holder">Card Holder Name</Label>
                    <Input
                      id="card-holder"
                      placeholder="John Doe"
                      value={newPayment.cardHolder}
                      onChange={(e) =>
                        setNewPayment({ ...newPayment, cardHolder: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiration Date</Label>
                      <Input
                        id="expiry"
                        placeholder="MM/YY"
                        value={newPayment.expiryDate}
                        onChange={(e) =>
                          setNewPayment({
                            ...newPayment,
                            expiryDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        type="password"
                        maxLength={4}
                        value={newPayment.cvv}
                        onChange={(e) =>
                          setNewPayment({ ...newPayment, cvv: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="default-payment"
                      checked={newPayment.isDefault}
                      onChange={(e) =>
                        setNewPayment({
                          ...newPayment,
                          isDefault: e.target.checked,
                        })
                      }
                    />
                    <Label htmlFor="default-payment">
                      Set as default payment method
                    </Label>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingPayment(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddPayment}>Save Payment Method</Button>
                  </div>
                </div>
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
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <div className="font-medium">
                        {item.product.name} × {item.quantity}
                      </div>
                    </div>
                    <div>${(item.product.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-medium">
                  <div>Subtotal</div>
                  <div>${total.toFixed(2)}</div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <div>Shipping</div>
                  <div>Free</div>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <div>Total</div>
                  <div>${total.toFixed(2)}</div>
                </div>

                <Button className="w-full mt-4" size="lg" onClick={handleCheckout}>
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
