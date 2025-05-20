
import React from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const FAQPage = () => {
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Items must be unworn, unwashed, and with all original tags attached. Please contact our customer service team to initiate a return."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 3-5 business days within the country and 10-15 business days for international orders. Express shipping options are available at checkout."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping costs and delivery times vary by location. Please check the shipping calculator at checkout for specific details."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you will receive a confirmation email with a tracking number and instructions on how to track your package."
    },
    {
      question: "What sizes do you offer?",
      answer: "Our clothing items are available in sizes XS through XXXL. Please refer to our size guide on each product page for specific measurements to ensure the perfect fit."
    },
    {
      question: "Are your products sustainable?",
      answer: "We are committed to sustainability and ethical production. Many of our products use eco-friendly materials, and we're constantly working to improve our environmental footprint."
    },
    {
      question: "How do I care for my purchases?",
      answer: "Care instructions are provided on the label of each item. Generally, we recommend washing in cold water and air drying to extend the life of your garments."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 page-transition">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className="mt-10 text-center">
        <p className="mb-4">Can't find an answer to your question?</p>
        <p className="text-muted-foreground">
          Contact our customer support team at <a href="mailto:support@example.com" className="underline text-primary">support@example.com</a>
        </p>
      </div>
    </div>
  );
};

export default FAQPage;
