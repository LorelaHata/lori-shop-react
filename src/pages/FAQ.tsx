
import React from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Shield, CreditCard, Lock, Globe, FileText, UserCheck } from "lucide-react";

const FAQPage = () => {
  const faqs = [
    {
      icon: <Shield className="h-5 w-5" />,
      question: "How secure is my personal information?",
      answer: "We use industry-standard SSL encryption to protect all data transmitted between your browser and our servers. Your personal information is stored securely and never shared with third parties without your explicit consent. We comply with GDPR and other privacy regulations."
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are processed through secure, PCI-compliant payment gateways with end-to-end encryption."
    },
    {
      icon: <Lock className="h-5 w-5" />,
      question: "How do you handle my payment information?",
      answer: "We never store your complete credit card information on our servers. Payment details are encrypted and processed through secure third-party payment processors. Only the last 4 digits and card type are stored for your convenience."
    },
    {
      icon: <Globe className="h-5 w-5" />,
      question: "Do you comply with GDPR?",
      answer: "Yes, we are fully GDPR compliant. You have the right to access, modify, or delete your personal data at any time. We only collect necessary information and with your consent. You can manage your privacy preferences in your account settings."
    },
    {
      icon: <UserCheck className="h-5 w-5" />,
      question: "What cookies do you use?",
      answer: "We use essential cookies for website functionality, analytics cookies to improve user experience, and preference cookies to remember your settings. You can manage cookie preferences through our cookie banner or browser settings."
    },
    {
      icon: <FileText className="h-5 w-5" />,
      question: "What is your return and refund policy?",
      answer: "We offer a 30-day return policy for unused items in original packaging. Refunds are processed within 5-7 business days to your original payment method. Return shipping is free for defective items, while customer returns may incur shipping costs."
    },
    {
      question: "How do you protect against fraud?",
      answer: "We use advanced fraud detection systems, secure payment gateways, and manual review processes for suspicious transactions. Our security team monitors all transactions 24/7 to protect both customers and merchants."
    },
    {
      question: "Can I modify or cancel my order?",
      answer: "Orders can be modified or cancelled within 1 hour of placement, before processing begins. After processing starts, you can still request changes, but we cannot guarantee modifications. Contact customer service immediately for assistance."
    },
    {
      question: "How do you handle data breaches?",
      answer: "In the unlikely event of a data breach, we have immediate response protocols in place. We will notify affected users within 72 hours and provide clear information about what data was involved and steps we're taking to resolve the issue."
    },
    {
      question: "Do you share my data with third parties?",
      answer: "We only share necessary information with trusted service providers (payment processors, shipping companies) to fulfill your orders. We never sell your personal information to marketers or advertisers. All partnerships are governed by strict data protection agreements."
    },
    {
      question: "How can I delete my account and data?",
      answer: "You can request account deletion through your profile settings or by contacting customer service. We will permanently delete your personal information within 30 days, except for data required by law to be retained (such as transaction records for tax purposes)."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 page-transition">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-muted-foreground">
            Everything you need to know about security, privacy, and your shopping experience
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  <div className="flex items-center gap-3">
                    {faq.icon && <span className="text-primary">{faq.icon}</span>}
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        {/* Secure Payment Icons */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-semibold mb-6">Accepted Payment Methods</h3>
          <div className="flex justify-center items-center space-x-8 mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md font-bold">VISA</div>
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-md font-bold">MasterCard</div>
            <div className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-md font-bold">AMEX</div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md font-bold">PayPal</div>
            <div className="bg-black text-white px-4 py-2 rounded-md font-bold">Apple Pay</div>
            <div className="bg-gradient-to-r from-red-500 to-yellow-500 text-white px-4 py-2 rounded-md font-bold">Google Pay</div>
          </div>
          
          <div className="border-t pt-8">
            <p className="text-sm text-muted-foreground mb-4">Still have questions?</p>
            <p className="text-muted-foreground">
              Contact our customer support team at{" "}
              <a href="mailto:support@lorishop.al" className="underline text-primary hover:text-primary/80">
                support@lorishop.al
              </a>
              {" "}or call us at{" "}
              <a href="tel:+35569123456" className="underline text-primary hover:text-primary/80">
                +355 69 123 456
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
