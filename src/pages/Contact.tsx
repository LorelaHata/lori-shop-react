
import { useState } from "react";
import { Mail, MessageSquare, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form,
  FormControl,
  FormDescription,
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
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  experience: z.string().min(10, { message: "Please describe your experience." }),
  coverLetter: z.string().min(10, { message: "Cover letter must be at least 10 characters." }),
  cv: z.instanceof(File).optional().nullable()
});

type ContactFormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      experience: "",
      coverLetter: "",
      cv: null
    }
  });

  function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application sent",
        description: "Thank you for your application. We'll review it and get back to you soon!",
      });
      form.reset();
      setSelectedFile(null);
    }, 1500);
    
    console.log("Job application submitted", data);
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    form.setValue("cv", file);
  };

  // For the email dialog form
  const emailForm = useForm({
    resolver: zodResolver(z.object({
      name: z.string().min(2),
      email: z.string().email(),
      message: z.string().min(10)
    })),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  const submitEmailForm = emailForm.handleSubmit((data) => {
    toast({
      title: "Email sent",
      description: "We'll get back to you as soon as possible.",
    });
    setIsEmailDialogOpen(false);
    emailForm.reset();
  });

  return (
    <div className="container mx-auto px-4 py-12 bg-[#f8f6f1]">
      <h1 className="text-3xl font-bold mb-8 text-center">Join Our Team</h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="bg-[#f5f2eb] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-5 w-5 text-[#c4a484]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-4">Contact our support team</p>
            <Button variant="outline" onClick={() => setIsEmailDialogOpen(true)}>
              Send Email
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="bg-[#f5f2eb] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="h-5 w-5 text-[#c4a484]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">WhatsApp Chat</h3>
            <p className="text-muted-foreground mb-4">Message us directly</p>
            <Button variant="outline" asChild>
              <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
                +123 456 789
              </a>
            </Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="bg-[#f5f2eb] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <HelpCircle className="h-5 w-5 text-[#c4a484]" />
            </div>
            <h3 className="font-semibold text-lg mb-2">FAQ</h3>
            <p className="text-muted-foreground mb-4">Find answers to common questions</p>
            <Button variant="outline" onClick={() => document.getElementById('faq')?.scrollIntoView({behavior: 'smooth'})}>
              View FAQs
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm mb-12">
          <h2 className="text-2xl font-bold mb-6">Apply for Customer Assistant Position</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relevant Experience</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Please describe your customer service experience..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="coverLetter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Letter</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us why you'd be a great fit for this role..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="cv"
                render={() => (
                  <FormItem>
                    <FormLabel>Upload CV (PDF or DOC)</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input 
                          type="file" 
                          accept=".pdf,.doc,.docx" 
                          onChange={handleFileChange}
                        />
                      </div>
                    </FormControl>
                    {selectedFile && (
                      <div className="text-sm text-muted-foreground mt-2">
                        Selected file: {selectedFile.name}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="bg-[#F97316] hover:bg-[#F97316]/90 w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </Form>
        </div>
        
        {/* FAQ Section */}
        <div id="faq" className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2">What are the working hours for this position?</h3>
              <p className="text-muted-foreground">Our customer assistants typically work 40 hours per week on rotating shifts, including some weekends.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2">Is remote work available?</h3>
              <p className="text-muted-foreground">We offer hybrid working arrangements with a minimum of 2 days per week in our physical store.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2">What experience is required?</h3>
              <p className="text-muted-foreground">At least 1 year of customer service experience is preferred, but we also consider applications from enthusiastic beginners with strong communication skills.</p>
            </div>
            
            <div className="border-b pb-4">
              <h3 className="text-lg font-medium mb-2">What benefits do you offer?</h3>
              <p className="text-muted-foreground">We offer competitive salary, staff discounts on our products, health insurance, and performance bonuses.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">How long is the application process?</h3>
              <p className="text-muted-foreground">Our hiring process typically takes 2-3 weeks from application to final decision.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Email Dialog */}
      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send us an email</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={submitEmailForm} className="space-y-4 pt-4">
            <div className="space-y-2">
              <FormLabel htmlFor="email-name">Your Name</FormLabel>
              <Input 
                id="email-name" 
                placeholder="John Doe" 
                {...emailForm.register("name")} 
              />
              {emailForm.formState.errors.name && (
                <p className="text-sm text-red-500">{emailForm.formState.errors.name.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="email-address">Your Email</FormLabel>
              <Input 
                id="email-address" 
                placeholder="john@example.com" 
                {...emailForm.register("email")} 
              />
              {emailForm.formState.errors.email && (
                <p className="text-sm text-red-500">{emailForm.formState.errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <FormLabel htmlFor="email-message">Message</FormLabel>
              <Textarea 
                id="email-message" 
                placeholder="How can we help you?" 
                className="min-h-[120px]"
                {...emailForm.register("message")} 
              />
              {emailForm.formState.errors.message && (
                <p className="text-sm text-red-500">{emailForm.formState.errors.message.message}</p>
              )}
            </div>
            
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#F97316] hover:bg-[#F97316]/90">
                Send Email
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;
