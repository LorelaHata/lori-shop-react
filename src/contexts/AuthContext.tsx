
import { createContext, useState, useContext, ReactNode } from "react";
import { toast } from "sonner";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "consumer" | "admin";
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserProfile: (updatedUser: Partial<User>) => void;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Sample users for demo
const users: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Lorela",
    email: "user@example.com",
    role: "consumer",
    phone: "555-123-4567"
  },
];

// For demo, we're storing passwords in plain text, but in a real app this would be hashed
const passwords: Record<string, string> = {
  "admin@example.com": "admin123",
  "user@example.com": "user123",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API request delay
    await new Promise(r => setTimeout(r, 800));
    
    const userMatch = users.find(u => u.email === email);
    
    if (userMatch && passwords[email] === password) {
      setUser(userMatch);
      localStorage.setItem("user", JSON.stringify(userMatch));
      toast.success(`Welcome back, ${userMatch.name}`);
      return true;
    }
    
    toast.error("Invalid email or password");
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API request delay
    await new Promise(r => setTimeout(r, 800));
    
    if (users.some(u => u.email === email)) {
      toast.error("Email already in use");
      return false;
    }
    
    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email,
      role: "consumer",
    };
    
    users.push(newUser);
    passwords[email] = password;
    
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    toast.success("Account created successfully!");
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("You have been logged out");
  };

  const updateUserProfile = (updatedUser: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updatedUser };
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      
      // Update the user in our mock database
      const index = users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users[index] = updated;
      }
      
      toast.success("Profile updated successfully");
    }
  };

  const isAdmin = () => user?.role === "admin";
  
  const isAuthenticated = () => user !== null;

  const value = {
    user,
    login,
    register,
    logout,
    updateUserProfile,
    isAdmin,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
