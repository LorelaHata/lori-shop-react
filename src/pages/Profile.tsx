
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";
import ProfileForm from "../components/profile/ProfileForm";
import AddressForm from "../components/profile/AddressForm";
import PaymentMethodForm from "../components/profile/PaymentMethodForm";
import { Address } from "../types/order";
import { PaymentMethod } from "../types/payment";
import { CreditCard, MapPin, UserRound, PackageOpen } from "lucide-react";

// Mock data for orders
interface Order {
  id: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "canceled" | "refunded" | "partially_refunded";
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

const mockOrders: Order[] = [
  {
    id: "ORD12345",
    date: "2024-03-15",
    total: 159.99,
    status: "delivered",
    items: [
      {
        id: 1,
        name: "Minimalist Watch",
        price: 159.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1399&q=80"
      }
    ]
  },
  {
    id: "ORD12346",
    date: "2024-04-20",
    total: 219.98,
    status: "shipped",
    items: [
      {
        id: 2,
        name: "Wool Sweater",
        price: 89.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80"
      },
      {
        id: 3,
        name: "Leather Backpack",
        price: 129.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1028&q=80"
      }
    ]
  },
  {
    id: "ORD12347",
    date: "2024-05-05",
    total: 199.99,
    status: "processing",
    items: [
      {
        id: 4,
        name: "Wireless Headphones",
        price: 199.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      }
    ]
  },
  {
    id: "ORD12348",
    date: "2024-05-12",
    total: 59.98,
    status: "pending",
    items: [
      {
        id: 5,
        name: "Cotton T-Shirt",
        price: 29.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
      }
    ]
  },
  {
    id: "ORD12349",
    date: "2024-04-28",
    total: 39.99,
    status: "refunded",
    items: [
      {
        id: 6,
        name: "Ceramic Mug Set",
        price: 39.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      }
    ]
  }
];

const Profile = () => {
  const { user } = useAuth();
  const { addresses, paymentMethods, setDefaultAddress, setDefaultPaymentMethod, deleteAddress, deletePaymentMethod } = useProfile();
  const [activeTab, setActiveTab] = useState("orders");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>(undefined);
  const [isAddingPaymentMethod, setIsAddingPaymentMethod] = useState(false);
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | undefined>(undefined);

  const startAddingAddress = () => {
    setEditingAddress(undefined);
    setIsAddingAddress(true);
  };

  const startEditingAddress = (address: Address) => {
    setEditingAddress(address);
    setIsAddingAddress(true);
  };

  const startAddingPaymentMethod = () => {
    setEditingPaymentMethod(undefined);
    setIsAddingPaymentMethod(true);
  };

  const startEditingPaymentMethod = (method: PaymentMethod) => {
    setEditingPaymentMethod(method);
    setIsAddingPaymentMethod(true);
  };

  const renderPaymentMethodDetails = (method: PaymentMethod) => {
    switch (method.type) {
      case "credit_card":
        return (
          <>
            <div className="font-medium">
              {method.cardNumber}{" "}
              {method.isDefault && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">
                  Default
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {method.cardHolder}
              <br />
              Expires {method.expiryDate}
            </div>
          </>
        );
      case "paypal":
        return (
          <>
            <div className="font-medium">
              PayPal{" "}
              {method.isDefault && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">
                  Default
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {method.accountEmail}
            </div>
          </>
        );
      case "bank_transfer":
        return (
          <>
            <div className="font-medium">
              Bank Transfer{" "}
              {method.isDefault && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">
                  Default
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              {method.bankName}
              <br />
              Account: {method.accountNumber}
            </div>
          </>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl text-gray-600">
                {user?.name ? user.name[0] : "U"}
              </div>
              <div className="font-medium text-lg">{user?.name}</div>
              <div className="text-sm text-gray-500">{user?.email}</div>
            </div>

            <nav className="space-y-2">
              <button
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                  activeTab === "orders"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("orders")}
              >
                <PackageOpen className="h-4 w-4" />
                Orders
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                  activeTab === "addresses"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("addresses")}
              >
                <MapPin className="h-4 w-4" />
                Addresses
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                  activeTab === "payments"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("payments")}
              >
                <CreditCard className="h-4 w-4" />
                Payment Methods
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 ${
                  activeTab === "account"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("account")}
              >
                <UserRound className="h-4 w-4" />
                Account Details
              </button>
            </nav>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-3">
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>My Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {mockOrders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You haven't placed any orders yet.</p>
                    <Button asChild className="mt-4">
                      <Link to="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {mockOrders.map((order) => (
                      <div
                        key={order.id}
                        className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                          <div>
                            <div className="font-medium">{order.id}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(order.date).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="mt-2 sm:mt-0 flex flex-col sm:items-end">
                            <div className="font-medium">${order.total.toFixed(2)}</div>
                            <StatusBadge status={order.status} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3">
                              <div className="h-12 w-12 bg-gray-100 rounded overflow-hidden">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-sm truncate">
                                  {item.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Qty: {item.quantity}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/order/${order.id}`}>View Details</Link>
                          </Button>
                          {(order.status === "delivered") && (
                            <Button asChild size="sm" variant="outline">
                              <Link to="/refund-request">Request Refund</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>My Addresses</CardTitle>
              </CardHeader>
              <CardContent>
                {isAddingAddress ? (
                  <AddressForm 
                    address={editingAddress} 
                    onCancel={() => {
                      setIsAddingAddress(false);
                      setEditingAddress(undefined);
                    }} 
                  />
                ) : (
                  <>
                    <div className="space-y-4">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">
                                {address.name}{" "}
                                {address.isDefault && (
                                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">
                                    Default
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500 mt-1">
                                {address.street}
                                <br />
                                {address.city}, {address.state} {address.zipCode}
                                <br />
                                {address.country}
                              </div>
                            </div>
                            <div className="space-x-2">
                              <Button size="sm" variant="ghost" onClick={() => startEditingAddress(address)}>
                                Edit
                              </Button>
                              {!address.isDefault && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => setDefaultAddress(address.id)}
                                  >
                                    Set Default
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => deleteAddress(address.id)}
                                  >
                                    Delete
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-6" onClick={startAddingAddress}>
                      Add New Address
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Payment Methods Tab */}
          {activeTab === "payments" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent>
                {isAddingPaymentMethod ? (
                  <PaymentMethodForm 
                    paymentMethod={editingPaymentMethod} 
                    onCancel={() => {
                      setIsAddingPaymentMethod(false);
                      setEditingPaymentMethod(undefined);
                    }} 
                  />
                ) : (
                  <>
                    <div className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              {renderPaymentMethodDetails(method)}
                            </div>
                            <div className="space-x-2">
                              <Button size="sm" variant="ghost" onClick={() => startEditingPaymentMethod(method)}>
                                Edit
                              </Button>
                              {!method.isDefault && (
                                <>
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => setDefaultPaymentMethod(method.id)}
                                  >
                                    Set Default
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="ghost"
                                    onClick={() => deletePaymentMethod(method.id)}
                                  >
                                    Delete
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="mt-6" onClick={startAddingPaymentMethod}>
                      Add New Payment Method
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* Account Details Tab */}
          {activeTab === "account" && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditingProfile ? (
                  <ProfileForm onCancel={() => setIsEditingProfile(false)} />
                ) : (
                  <div>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Full Name
                        </dt>
                        <dd className="mt-1">{user?.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Email
                        </dt>
                        <dd className="mt-1">{user?.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Phone
                        </dt>
                        <dd className="mt-1">{user?.phone || "Not provided"}</dd>
                      </div>
                    </dl>
                    <Button
                      onClick={() => setIsEditingProfile(true)}
                      className="mt-6"
                    >
                      Edit Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
