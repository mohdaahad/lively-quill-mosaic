
import React, { useState, useRef, useEffect } from 'react';
import { BlogPost } from '@/data/mockData';
import BlogCard from './BlogCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TrendingPostsProps {
  posts: BlogPost[];
}

const TrendingPosts: React.FC<TrendingPostsProps> = ({ posts }) => {
  const trendingPosts = posts.filter(post => post.trending);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const scrollAmount = 400; // Adjust scroll amount as needed
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
    
    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
    
    setScrollPosition(newPosition);
  };
  
  // Update scroll position on scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      setScrollPosition(container.scrollLeft);
    };
    
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (trendingPosts.length === 0) return null;
  
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollContainerRef.current 
    ? scrollPosition < scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth - 10
    : false;
  
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 dark:text-white">
            Trending Now
          </h2>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="h-8 w-8 rounded-full bg-white dark:bg-gray-800"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="h-8 w-8 rounded-full bg-white dark:bg-gray-800"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </Button>
          </div>
        </div>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 pb-4 hide-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trendingPosts.map((post, index) => (
            <div 
              key={post.id} 
              className="min-w-[300px] md:min-w-[350px] flex-shrink-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingPosts;
