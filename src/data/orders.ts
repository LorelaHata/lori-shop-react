
import { Order, RefundRequest, PaymentMethod, Address } from "../types/order";

// Sample addresses
export const addresses: Address[] = [
  {
    id: "addr-1",
    name: "Home",
    street: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
    isDefault: true
  },
  {
    id: "addr-2",
    name: "Work",
    street: "456 Market Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    country: "United States",
    isDefault: false
  }
];

// Sample payment methods
export const paymentMethods: PaymentMethod[] = [
  {
    id: "pm-1",
    cardNumber: "•••• 4242",
    cardHolderName: "John Doe",
    expiryDate: "09/25",
    isDefault: true,
    cardType: "visa"
  },
  {
    id: "pm-2",
    cardNumber: "•••• 5555",
    cardHolderName: "John Doe",
    expiryDate: "12/24",
    isDefault: false,
    cardType: "mastercard"
  }
];

// Helper function to generate real-time dates based on order status
const generateOrderDates = (status: string, baseDate?: Date) => {
  const now = baseDate || new Date();
  let orderDate: Date;
  
  switch (status) {
    case "delivered":
      orderDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
      break;
    case "shipped":
      orderDate = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days ago
      break;
    case "processing":
      orderDate = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000); // 1 day ago
      break;
    default:
      orderDate = new Date(now.getTime() - 2 * 60 * 60 * 1000); // 2 hours ago
  }
  
  return {
    createdAt: orderDate.toISOString(),
    updatedAt: new Date(orderDate.getTime() + 2 * 60 * 60 * 1000).toISOString() // 2 hours after creation
  };
};

// Sample orders with real-time dates
export const orders: Order[] = [
  {
    id: "ord-001",
    userId: "2", // matches consumer user ID in AuthContext
    items: [
      {
        productId: 1,
        name: "Designer Coffee Table",
        price: 299.99,
        quantity: 1,
        image: "/placeholder.svg"
      },
      {
        productId: 3,
        name: "Modern Table Lamp",
        price: 59.99,
        quantity: 2,
        image: "/placeholder.svg"
      }
    ],
    total: 419.97,
    status: "delivered",
    ...generateOrderDates("delivered"),
    shippingAddress: addresses[0],
    paymentMethod: paymentMethods[0],
    trackingNumber: "UPS-12345678"
  },
  {
    id: "ord-002",
    userId: "2",
    items: [
      {
        productId: 5,
        name: "Minimalist Desk Chair",
        price: 149.99,
        quantity: 1,
        image: "/placeholder.svg"
      }
    ],
    total: 149.99,
    status: "shipped",
    ...generateOrderDates("shipped"),
    shippingAddress: addresses[0],
    paymentMethod: paymentMethods[0],
    trackingNumber: "FEDEX-87654321"
  },
  {
    id: "ord-003",
    userId: "2",
    items: [
      {
        productId: 8,
        name: "Premium Sofa",
        price: 899.99,
        quantity: 1,
        image: "/placeholder.svg"
      }
    ],
    total: 899.99,
    status: "processing",
    ...generateOrderDates("processing"),
    shippingAddress: addresses[1],
    paymentMethod: paymentMethods[1]
  }
];

// Helper function to generate real-time refund dates
const generateRefundDates = (status: string) => {
  const now = new Date();
  let requestDate: Date;
  let responseDate: Date | undefined;
  
  if (status === "approved" || status === "rejected") {
    requestDate = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000); // 5 days ago
    responseDate = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
  } else {
    requestDate = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000); // 2 days ago
  }
  
  return {
    requestDate: requestDate.toISOString(),
    responseDate: responseDate?.toISOString()
  };
};

// Sample refund requests with real-time dates
export const refundRequests: RefundRequest[] = [
  {
    id: "ref-001",
    orderId: "ord-001",
    reason: "Item arrived damaged",
    status: "approved",
    amount: 59.99,
    ...generateRefundDates("approved"),
    items: [
      {
        productId: 3,
        name: "Modern Table Lamp",
        price: 59.99,
        quantity: 1,
        image: "/placeholder.svg"
      }
    ]
  },
  {
    id: "ref-002",
    orderId: "ord-002",
    reason: "Wrong size",
    status: "pending",
    amount: 149.99,
    ...generateRefundDates("pending"),
    items: [
      {
        productId: 5,
        name: "Minimalist Desk Chair",
        price: 149.99,
        quantity: 1,
        image: "/placeholder.svg"
      }
    ]
  }
];

// Helper functions to get orders by user ID
export const getUserOrders = (userId: string): Order[] => {
  return orders.filter(order => order.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Get order by ID
export const getOrderById = (orderId: string): Order | undefined => {
  return orders.find(order => order.id === orderId);
};

// Get refund requests by user ID
export const getUserRefundRequests = (userId: string): RefundRequest[] => {
  const userOrderIds = getUserOrders(userId).map(order => order.id);
  return refundRequests.filter(refund => userOrderIds.includes(refund.orderId))
    .sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
};

// Get refund requests by order ID
export const getRefundsByOrderId = (orderId: string): RefundRequest[] => {
  return refundRequests.filter(refund => refund.orderId === orderId);
};

// Format date string
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Add a new order
export const addOrder = (order: Omit<Order, "id" | "createdAt" | "updatedAt">): Order => {
  const now = new Date().toISOString();
  const newOrder: Order = {
    ...order,
    id: `ord-${Math.floor(1000 + Math.random() * 9000)}`, // Generate a random ID
    createdAt: now,
    updatedAt: now
  };
  
  orders.unshift(newOrder);
  return newOrder;
};

// Add a refund request
export const addRefundRequest = (refund: Omit<RefundRequest, "id" | "requestDate" | "status">): RefundRequest => {
  const now = new Date().toISOString();
  const newRefund: RefundRequest = {
    ...refund,
    id: `ref-${Math.floor(1000 + Math.random() * 9000)}`, // Generate a random ID
    requestDate: now,
    status: "pending"
  };
  
  refundRequests.push(newRefund);
  return newRefund;
};
