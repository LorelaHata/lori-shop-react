import { useState } from "react";
import { Mail, MessageSquare, HelpCircle, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";

// Schema for the email dialog form
const emailFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." })
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

const Contact = () => {
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);

  // For the email dialog form
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const submitEmailForm = emailForm.handleSubmit((data) => {
    toast({
      title: "Message sent successfully",
      description: "We'll get back to you within 24 hours.",
    });
    setIsEmailDialogOpen(false);
    emailForm.reset();
  });

  return (
    <div className="container mx-auto px-4 py-12 bg-[#f8f6f1]">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact & Support</h1>
      
      <div className="max-w-4xl mx-auto">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="bg-[#f5f2eb] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-5 w-5 text-[#c4a484]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Support</h3>
            <p className="text-muted-foreground mb-4">Get help with orders, returns & general inquiries</p>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(true)}>
              Send Email
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="bg-[#f5f2eb] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-5 w-5 text-[#c4a484]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
            <p className="text-muted-foreground mb-4">Chat with our support team instantly</p>
            <Button variant="outline" asChild>
              <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
                Start Chat
              </a>
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="bg-[#f5f2eb] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-5 w-5 text-[#c4a484]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Help Center</h3>
            <p className="text-muted-foreground mb-4">Browse our FAQ and support articles</p>
            <Button variant="outline" onClick={() => document.getElementById('faq')?.scrollIntoView({behavior: 'smooth'})}>
              View FAQ
            </Button>
          </div>
        </div>
        
        {/* FAQ Section */}
        <div id="faq" className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                How secure is my personal information?
              </h3>
              <p className="text-muted-foreground">We use industry-standard SSL encryption and are fully PCI DSS compliant. Your data is stored securely and never shared with third parties without your consent.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                What about GDPR compliance?
              </h3>
              <p className="text-muted-foreground">We are fully GDPR compliant. You have the right to access, modify, or delete your personal data at any time. Contact us to exercise these rights or view our Privacy Policy for details.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2">How are payments processed?</h3>
              <p className="text-muted-foreground">All payments are processed through secure, encrypted connections. We don't store your credit card information on our servers - it's handled by certified payment processors.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2">Can I request my data or account deletion?</h3>
              <p className="text-muted-foreground">Yes, under GDPR you can request a copy of all your data or complete account deletion. Contact our support team and we'll process your request within 30 days.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2">How do you handle cookies?</h3>
              <p className="text-muted-foreground">We use essential cookies for website functionality and optional analytics cookies to improve your experience. You can manage cookie preferences in your browser settings.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2">What's your refund policy?</h3>
              <p className="text-muted-foreground">We offer a 30-day return policy for most items. Refunds are processed within 5-7 business days to your original payment method once we receive the returned item.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2">How do I track my order?</h3>
              <p className="text-muted-foreground">You'll receive tracking information via email once your order ships. You can also view order status in your account under 'My Orders'.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">Who can I contact for technical issues?</h3>
              <p className="text-muted-foreground">Our technical support team is available 24/7 via email or live chat. For urgent issues, use the live chat option for immediate assistance.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Support</DialogTitle>
          </DialogHeader>
          
          <Form {...emailForm}>
            <form onSubmit={submitEmailForm} className="space-y-4 pt-4">
              <FormField
                control={emailForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={emailForm.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="How can we help?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={emailForm.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe your inquiry..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#F97316] hover:bg-[#F97316]/90">
                  Send Message
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
