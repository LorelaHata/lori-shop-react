
export type PaymentMethodType = "credit_card" | "paypal" | "bank_transfer";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  cardNumber?: string; // For credit cards
  cardHolder?: string; // For credit cards
  expiryDate?: string; // For credit cards
  isDefault: boolean;
  accountEmail?: string; // For PayPal
  bankName?: string; // For bank transfers
  accountNumber?: string; // For bank transfers
}
