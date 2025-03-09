
import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Mail, GitHub, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/mockData';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 mt-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="text-2xl font-playfair font-bold text-blog-purple">
              Insight<span className="text-blog-blue">Blog</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Delivering insightful articles and guides on technology, design, and development to help you stay at the cutting edge.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="text-gray-500 hover:text-blog-purple dark:text-gray-400 dark:hover:text-blog-light-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" className="text-gray-500 hover:text-blog-purple dark:text-gray-400 dark:hover:text-blog-light-purple transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" className="text-gray-500 hover:text-blog-purple dark:text-gray-400 dark:hover:text-blog-light-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://github.com" className="text-gray-500 hover:text-blog-purple dark:text-gray-400 dark:hover:text-blog-light-purple transition-colors">
                <GitHub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-600 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Categories</h3>
            <ul className="space-y-3">
              {categories.slice(0, 6).map(category => (
                <li key={category}>
                  <Link 
                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`} 
                    className="text-gray-600 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple text-sm transition-colors"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-6">Subscribe to our Newsletter</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Stay up to date with our latest articles and news.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="rounded-r-none focus:ring-blog-purple" 
                />
                <Button 
                  className="rounded-l-none bg-blog-purple hover:bg-blog-light-purple px-3"
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} />
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} InsightBlog. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <a href="mailto:contact@insightblog.com" className="flex items-center text-gray-600 dark:text-gray-400 text-sm hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors">
                <Mail size={16} className="mr-2" />
                contact@insightblog.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
