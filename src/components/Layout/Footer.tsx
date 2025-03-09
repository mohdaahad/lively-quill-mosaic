
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Twitter, Linkedin, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-playfair font-bold text-gray-900 dark:text-white mb-4 block">
              Prose<span className="text-blog-purple">Pulse</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              A next-generation blog platform with stunning visuals, 
              seamless animations, and an immersive reading experience.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <Twitter size={18} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Linkedin size={18} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Github size={18} />
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors">Home</Link></li>
              <li><Link to="/trending" className="text-gray-600 dark:text-gray-300 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors">Trending</Link></li>
              <li><Link to="/categories" className="text-gray-600 dark:text-gray-300 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors">Categories</Link></li>
              <li><Link to="/authors" className="text-gray-600 dark:text-gray-300 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors">Authors</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 dark:text-gray-300 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 sm:mb-0">
            &copy; {currentYear} ProsePulse. All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-blog-purple" /> by ProsePulse Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
