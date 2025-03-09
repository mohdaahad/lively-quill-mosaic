
import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { blogPosts, BlogPost } from '@/data/mockData';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<BlogPost[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (searchTerm.trim().length > 1) {
      const filteredPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 5); // Limit to 5 suggestions
      
      setSuggestions(filteredPosts);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);
  
  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
  };
  
  return (
    <div ref={searchRef} className="relative max-w-xl w-full mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search articles, topics, or tags..."
          className="pl-10 pr-10 py-6 w-full rounded-full border border-gray-300 dark:border-gray-700 shadow-sm focus:border-blog-purple dark:focus:border-blog-light-purple"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full"
            onClick={handleClearSearch}
          >
            <X size={16} />
          </Button>
        )}
      </div>
      
      {/* Search suggestions */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-20 animate-scale-in">
          <div className="p-2">
            <p className="text-xs text-gray-500 dark:text-gray-400 pb-2 px-2">
              Suggestions
            </p>
            
            <ul>
              {suggestions.map(post => (
                <li key={post.id} className="text-left">
                  <Link
                    to={`/blog/${post.id}`}
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    onClick={() => {
                      setIsFocused(false);
                      setSearchTerm('');
                    }}
                  >
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-10 h-10 object-cover rounded-md mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                        {post.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {post.category} • {post.readingTime} min read
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-2 px-2">
              <Link 
                to={`/search?q=${encodeURIComponent(searchTerm)}`}
                className="text-sm text-blog-purple dark:text-blog-light-purple flex items-center"
                onClick={() => setIsFocused(false)}
              >
                <Search size={14} className="mr-1" />
                View all results for "{searchTerm}"
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
