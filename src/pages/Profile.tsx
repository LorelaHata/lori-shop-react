
import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import StatusBadge from "../components/StatusBadge";
import { useAuth } from "../contexts/AuthContext";

// Mock data
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

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "555-123-4567",
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    // In a real app, this would update the user's profile via an API call
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
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "orders"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("orders")}
              >
                Orders
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "addresses"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("addresses")}
              >
                Addresses
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "payments"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("payments")}
              >
                Payment Methods
              </button>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg ${
                  activeTab === "account"
                    ? "bg-gray-100 font-medium"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab("account")}
              >
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
                <div className="space-y-4">
                  {mockAddresses.map((address) => (
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
                          <Button size="sm" variant="ghost">
                            Edit
                          </Button>
                          {!address.isDefault && (
                            <Button size="sm" variant="ghost">
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-6">
                  Add New Address
                </Button>
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
                <div className="space-y-4">
                  {mockPaymentMethods.map((payment) => (
                    <div
                      key={payment.id}
                      className="border rounded-lg p-4 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">
                            {payment.cardNumber}{" "}
                            {payment.isDefault && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {payment.cardHolder}
                            <br />
                            Expires {payment.expiryDate}
                          </div>
                        </div>
                        <div className="space-x-2">
                          <Button size="sm" variant="ghost">
                            Edit
                          </Button>
                          {!payment.isDefault && (
                            <Button size="sm" variant="ghost">
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-6">
                  Add New Payment Method
                </Button>
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
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) =>
                          setProfileData({ ...profileData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) =>
                          setProfileData({ ...profileData, email: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          setProfileData({ ...profileData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button type="submit">Save Changes</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsEditingProfile(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <dl className="space-y-4">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Full Name
                        </dt>
                        <dd className="mt-1">{profileData.name}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Email
                        </dt>
                        <dd className="mt-1">{profileData.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">
                          Phone
                        </dt>
                        <dd className="mt-1">{profileData.phone}</dd>
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
