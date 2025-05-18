
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { PaymentMethod } from "../types/payment";
import { Address } from "../types/order";
import { useAuth } from "./AuthContext";

interface ProfileContextType {
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void;
  updatePaymentMethod: (id: string, method: Partial<PaymentMethod>) => void;
  deletePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

// Initial mock data
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
    type: "credit_card",
    cardNumber: "**** **** **** 4242",
    cardHolder: "John Doe",
    expiryDate: "12/24",
    isDefault: true,
  },
  {
    id: "2",
    type: "credit_card",
    cardNumber: "**** **** **** 5555",
    cardHolder: "John Doe",
    expiryDate: "10/25",
    isDefault: false,
  },
];

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  // Load data from localStorage when component mounts or user changes
  useEffect(() => {
    if (user) {
      const savedAddresses = localStorage.getItem(`addresses-${user.id}`);
      const savedPaymentMethods = localStorage.getItem(`paymentMethods-${user.id}`);
      
      setAddresses(savedAddresses ? JSON.parse(savedAddresses) : mockAddresses);
      setPaymentMethods(savedPaymentMethods ? JSON.parse(savedPaymentMethods) : mockPaymentMethods);
    } else {
      setAddresses([]);
      setPaymentMethods([]);
    }
  }, [user]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`addresses-${user.id}`, JSON.stringify(addresses));
      localStorage.setItem(`paymentMethods-${user.id}`, JSON.stringify(paymentMethods));
    }
  }, [addresses, paymentMethods, user]);

  const addAddress = (address: Omit<Address, "id">) => {
    const newAddress = {
      ...address,
      id: Date.now().toString(),
    };
    
    // If this is the first address or marked as default, ensure it's the only default
    if (address.isDefault || addresses.length === 0) {
      setAddresses(prev => 
        prev.map(addr => ({ ...addr, isDefault: false })).concat({ ...newAddress, isDefault: true })
      );
    } else {
      setAddresses(prev => [...prev, newAddress]);
    }
    
    toast.success("Address added successfully");
  };

  const updateAddress = (id: string, address: Partial<Address>) => {
    // If setting this address as default, update all others to not be default
    if (address.isDefault) {
      setAddresses(prev => prev.map(addr => ({ ...addr, isDefault: addr.id === id })));
    } else {
      setAddresses(prev => prev.map(addr => 
        addr.id === id ? { ...addr, ...address } : addr
      ));
    }
    
    toast.success("Address updated successfully");
  };

  const deleteAddress = (id: string) => {
    const addressToDelete = addresses.find(addr => addr.id === id);
    
    // Don't allow deleting the default address
    if (addressToDelete?.isDefault) {
      toast.error("Cannot delete default address. Set another address as default first.");
      return;
    }
    
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    toast.success("Address deleted successfully");
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    
    toast.success("Default address updated");
  };

  const addPaymentMethod = (method: Omit<PaymentMethod, "id">) => {
    const newMethod = {
      ...method,
      id: Date.now().toString(),
    };
    
    // If this is the first payment method or marked as default, ensure it's the only default
    if (method.isDefault || paymentMethods.length === 0) {
      setPaymentMethods(prev => 
        prev.map(m => ({ ...m, isDefault: false })).concat({ ...newMethod, isDefault: true })
      );
    } else {
      setPaymentMethods(prev => [...prev, newMethod]);
    }
    
    toast.success("Payment method added successfully");
  };

  const updatePaymentMethod = (id: string, method: Partial<PaymentMethod>) => {
    // If setting this payment method as default, update all others to not be default
    if (method.isDefault) {
      setPaymentMethods(prev => prev.map(m => ({ ...m, isDefault: m.id === id })));
    } else {
      setPaymentMethods(prev => prev.map(m => 
        m.id === id ? { ...m, ...method } : m
      ));
    }
    
    toast.success("Payment method updated successfully");
  };

  const deletePaymentMethod = (id: string) => {
    const methodToDelete = paymentMethods.find(m => m.id === id);
    
    // Don't allow deleting the default payment method
    if (methodToDelete?.isDefault) {
      toast.error("Cannot delete default payment method. Set another method as default first.");
      return;
    }
    
    setPaymentMethods(prev => prev.filter(m => m.id !== id));
    toast.success("Payment method deleted successfully");
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    
    toast.success("Default payment method updated");
  };

  const value = {
    addresses,
    paymentMethods,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
