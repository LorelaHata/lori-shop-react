import { Product } from "./product";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  stock: number;
}

export interface PaymentMethod {
  id: string;
  cardNumber: string; // Last 4 digits only for display
  cardHolderName: string;
  expiryDate: string;
  isDefault: boolean;
  cardType: "visa" | "mastercard" | "amex";
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type OrderStatus = 
  | "pending" 
  | "processing" 
  | "shipped" 
  | "delivered" 
  | "canceled" 
  | "refunded" 
  | "partially_refunded";

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
  notes?: string;
}

export interface RefundRequest {
  id: string;
  orderId: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  amount: number;
  requestDate: string;
  responseDate?: string;
  items?: OrderItem[];
}
