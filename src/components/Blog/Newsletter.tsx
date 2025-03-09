
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ArrowRight } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
        variant: "default"
      });
      
      // Reset subscription status after delay
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <section className="py-16 bg-gradient-to-r from-blog-purple/10 to-blog-blue/10 dark:from-blog-purple/5 dark:to-blog-blue/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Get the latest articles, tutorials, and news directly in your inbox.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-base py-6 border-gray-300 focus:border-blog-purple focus:ring-blog-purple dark:bg-gray-800 dark:border-gray-700"
              disabled={isSubmitting || isSubscribed}
            />
            <Button 
              type="submit" 
              className="bg-blog-purple hover:bg-blog-light-purple transition-colors py-6 font-medium"
              disabled={isSubmitting || isSubscribed}
            >
              {isSubmitting ? (
                "Subscribing..."
              ) : isSubscribed ? (
                <span className="flex items-center">
                  <CheckCircle2 size={18} className="mr-2" />
                  Subscribed
                </span>
              ) : (
                <span className="flex items-center">
                  Subscribe
                  <ArrowRight size={18} className="ml-2" />
                </span>
              )}
            </Button>
          </form>
          
          <p className="text-gray-500 dark:text-gray-400 text-xs mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
