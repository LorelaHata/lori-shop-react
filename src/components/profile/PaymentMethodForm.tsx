
import { useState, useEffect } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { PaymentMethod, PaymentMethodType } from "../../types/payment";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Wallet, Bank } from "lucide-react";

interface PaymentMethodFormProps {
  paymentMethod?: PaymentMethod;
  onCancel: () => void;
}

const PaymentMethodForm = ({ paymentMethod, onCancel }: PaymentMethodFormProps) => {
  const { addPaymentMethod, updatePaymentMethod } = useProfile();
  const [activeTab, setActiveTab] = useState<PaymentMethodType>(paymentMethod?.type || "credit_card");
  
  const [formData, setFormData] = useState({
    type: "credit_card" as PaymentMethodType,
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    accountEmail: "",
    bankName: "",
    accountNumber: "",
    isDefault: false,
  });

  useEffect(() => {
    if (paymentMethod) {
      setFormData({
        type: paymentMethod.type,
        cardNumber: paymentMethod.cardNumber || "",
        cardHolder: paymentMethod.cardHolder || "",
        expiryDate: paymentMethod.expiryDate || "",
        accountEmail: paymentMethod.accountEmail || "",
        bankName: paymentMethod.bankName || "",
        accountNumber: paymentMethod.accountNumber || "",
        isDefault: paymentMethod.isDefault,
      });
      setActiveTab(paymentMethod.type);
    }
  }, [paymentMethod]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create payment method data based on selected type
    const methodData: Omit<PaymentMethod, "id"> = {
      type: activeTab,
      isDefault: formData.isDefault
    };
    
    // Add specific fields based on type
    if (activeTab === "credit_card") {
      methodData.cardNumber = formData.cardNumber;
      methodData.cardHolder = formData.cardHolder;
      methodData.expiryDate = formData.expiryDate;
    } else if (activeTab === "paypal") {
      methodData.accountEmail = formData.accountEmail;
    } else if (activeTab === "bank_transfer") {
      methodData.bankName = formData.bankName;
      methodData.accountNumber = formData.accountNumber;
    }
    
    if (paymentMethod) {
      updatePaymentMethod(paymentMethod.id, methodData);
    } else {
      addPaymentMethod(methodData);
    }
    
    onCancel();
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as PaymentMethodType);
    setFormData(prev => ({ ...prev, type: value as PaymentMethodType }));
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="credit_card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Credit Card</span>
              </TabsTrigger>
              <TabsTrigger value="paypal" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">PayPal</span>
              </TabsTrigger>
              <TabsTrigger value="bank_transfer" className="flex items-center gap-2">
                <Bank className="h-4 w-4" />
                <span className="hidden sm:inline">Bank Transfer</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="credit_card" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    required={activeTab === "credit_card"}
                  />
                </div>
                <div>
                  <Label htmlFor="card-holder">Card Holder Name</Label>
                  <Input
                    id="card-holder"
                    placeholder="John Doe"
                    value={formData.cardHolder}
                    onChange={(e) => setFormData({ ...formData, cardHolder: e.target.value })}
                    required={activeTab === "credit_card"}
                  />
                </div>
                <div>
                  <Label htmlFor="expiry-date">Expiration Date</Label>
                  <Input
                    id="expiry-date"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    required={activeTab === "credit_card"}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="paypal" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="paypal-email">PayPal Email</Label>
                  <Input
                    id="paypal-email"
                    type="email"
                    placeholder="your-email@example.com"
                    value={formData.accountEmail}
                    onChange={(e) => setFormData({ ...formData, accountEmail: e.target.value })}
                    required={activeTab === "paypal"}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="bank_transfer" className="mt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input
                    id="bank-name"
                    placeholder="Bank of Example"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    required={activeTab === "bank_transfer"}
                  />
                </div>
                <div>
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    placeholder="123456789"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    required={activeTab === "bank_transfer"}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="default-payment"
              checked={formData.isDefault}
              onCheckedChange={(checked) => 
                setFormData({
                  ...formData,
                  isDefault: checked === true,
                })
              }
            />
            <Label htmlFor="default-payment" className="cursor-pointer">
              Set as default payment method
            </Label>
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit">
              {paymentMethod ? 'Update Payment Method' : 'Add Payment Method'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodForm;
