
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getUserOrders, getUserRefundRequests, formatDate } from "../data/orders";
import { Order, OrderStatus, RefundRequest } from "../types/order";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Package, CreditCard, User } from "lucide-react";

const getOrderStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "delivered":
      return "bg-green-500";
    case "shipped":
      return "bg-blue-500";
    case "processing":
      return "bg-yellow-500";
    case "pending":
      return "bg-gray-500";
    case "canceled":
      return "bg-red-500";
    case "refunded":
      return "bg-purple-500";
    case "partially_refunded":
      return "bg-purple-300";
    default:
      return "bg-gray-500";
  }
};

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <CardDescription>Placed on {formatDate(order.createdAt)}</CardDescription>
          </div>
          <Badge className={`${getOrderStatusColor(order.status)} text-white`}>
            {order.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Items</span>
            <span>{order.items.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span>€{order.total.toFixed(2)}</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {order.trackingNumber ? (
                <Package className="h-4 w-4" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
              <span>
                {order.trackingNumber 
                  ? `Tracking: ${order.trackingNumber}` 
                  : "Awaiting shipment"}
              </span>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link to={`/order/${order.id}`}>Details</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const RefundCard = ({ refund }: { refund: RefundRequest }) => {
  const statusColors = {
    pending: "bg-yellow-500",
    approved: "bg-green-500",
    rejected: "bg-red-500"
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Refund #{refund.id}</CardTitle>
          <Badge className={`${statusColors[refund.status]} text-white`}>
            {refund.status}
          </Badge>
        </div>
        <CardDescription>
          Order #{refund.orderId} • Requested on {formatDate(refund.requestDate)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Amount</span>
            <span>€{refund.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Reason</span>
            <span>{refund.reason}</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-end">
            <Button asChild variant="outline" size="sm">
              <Link to={`/order/${refund.orderId}`}>View Order</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  const orders = user ? getUserOrders(user.id) : [];
  const refunds = user ? getUserRefundRequests(user.id) : [];
  
  return (
    <div className="container mx-auto px-4 py-8 page-transition">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar with user info */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Personal Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <nav className="space-y-1">
                <button 
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    activeTab === "orders" ? "bg-muted font-medium" : "hover:bg-muted/50"
                  }`}
                >
                  <Package className="h-4 w-4" />
                  <span>My Orders</span>
                </button>
                <button 
                  onClick={() => setActiveTab("payment")}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    activeTab === "payment" ? "bg-muted font-medium" : "hover:bg-muted/50"
                  }`}
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Payment Methods</span>
                </button>
                <button 
                  onClick={() => setActiveTab("refunds")}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md ${
                    activeTab === "refunds" ? "bg-muted font-medium" : "hover:bg-muted/50"
                  }`}
                >
                  <Clock className="h-4 w-4" />
                  <span>Refunds</span>
                </button>
              </nav>
              
              <Separator className="my-4" />
              
              <div className="flex justify-center">
                <Button asChild variant="outline">
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-2">
          {activeTab === "orders" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">My Orders</h2>
                <Link to="/shop">
                  <Button>Shop More</Button>
                </Link>
              </div>
              
              {orders.length > 0 ? (
                <div>
                  {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-8">
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">You haven't placed any orders yet.</p>
                    <Button asChild>
                      <Link to="/shop">Start Shopping</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
          
          {activeTab === "payment" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Payment Methods</h2>
                <Button>Add New</Button>
              </div>
              
              <div className="space-y-4">
                {user && paymentMethods.map((method) => (
                  <Card key={method.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 p-2 rounded-md">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">
                              {method.cardType === "visa" ? "Visa" : 
                               method.cardType === "mastercard" ? "MasterCard" : "Amex"} {method.cardNumber}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {method.cardHolderName} • Expires {method.expiryDate}
                            </p>
                          </div>
                        </div>
                        
                        {method.isDefault && (
                          <Badge variant="outline">Default</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === "refunds" && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Refund Requests</h2>
              
              {refunds.length > 0 ? (
                <div>
                  {refunds.map((refund) => (
                    <RefundCard key={refund.id} refund={refund} />
                  ))}
                </div>
              ) : (
                <Card className="text-center py-8">
                  <CardContent>
                    <p className="text-muted-foreground">You don't have any refund requests.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
