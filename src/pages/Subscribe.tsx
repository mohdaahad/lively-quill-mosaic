
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, CheckCircle, Star, Zap, Shield } from 'lucide-react';

const Subscribe = () => {
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would normally handle the form submission
    toast({
      title: "Subscription Successful",
      description: "Welcome to ProsePulse! You've been subscribed to our newsletter.",
    });
    
    // Reset form
    e.currentTarget.reset();
  };
  
  return (
    <Layout>
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 dark:text-white mb-6">
                Subscribe to ProsePulse
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Join our community and get the latest content delivered to your inbox.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:border-blog-purple dark:focus:border-blog-light-purple focus:ring focus:ring-blog-purple/20 dark:focus:ring-blog-light-purple/20 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:border-blog-purple dark:focus:border-blog-light-purple focus:ring focus:ring-blog-purple/20 dark:focus:ring-blog-light-purple/20 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:border-blog-purple dark:focus:border-blog-light-purple focus:ring focus:ring-blog-purple/20 dark:focus:ring-blog-light-purple/20 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>
                
                <fieldset>
                  <legend className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subscription Preferences
                  </legend>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="preferences" 
                        value="daily" 
                        className="h-4 w-4 text-blog-purple dark:text-blog-light-purple rounded border-gray-300 dark:border-gray-700 focus:ring-blog-purple dark:focus:ring-blog-light-purple focus:ring-opacity-50"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Daily Digest</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="preferences" 
                        value="weekly" 
                        className="h-4 w-4 text-blog-purple dark:text-blog-light-purple rounded border-gray-300 dark:border-gray-700 focus:ring-blog-purple dark:focus:ring-blog-light-purple focus:ring-opacity-50"
                        defaultChecked
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Weekly Roundup</span>
                    </label>
                    <label className="flex items-center">
                      <input 
                        type="checkbox" 
                        name="preferences" 
                        value="featured" 
                        className="h-4 w-4 text-blog-purple dark:text-blog-light-purple rounded border-gray-300 dark:border-gray-700 focus:ring-blog-purple dark:focus:ring-blog-light-purple focus:ring-opacity-50"
                        defaultChecked
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">Featured Articles Only</span>
                    </label>
                  </div>
                </fieldset>
                
                <Button type="submit" className="w-full flex items-center justify-center gap-2">
                  <Mail size={16} />
                  Subscribe
                </Button>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
                  By subscribing, you agree to our <a href="/terms" className="text-blog-purple dark:text-blog-light-purple hover:underline">Terms</a> and <a href="/privacy" className="text-blog-purple dark:text-blog-light-purple hover:underline">Privacy Policy</a>.
                </p>
              </form>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                <CheckCircle className="w-10 h-10 text-blog-purple mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Exclusive Content</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Get access to subscriber-only articles and insights.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                <Star className="w-10 h-10 text-blog-purple mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Premium Features</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Enjoy early access to new features and improvements.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                <Zap className="w-10 h-10 text-blog-purple mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">Weekly Digest</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  A curated selection of the best content every week.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-center">
                <Shield className="w-10 h-10 text-blog-purple mx-auto mb-4" />
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">No Spam</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  We respect your inbox. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Subscribe;
