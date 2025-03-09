
import React from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '@/data/mockData';
import BlogCard from './BlogCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface FeaturedPostsProps {
  posts: BlogPost[];
}

const FeaturedPosts: React.FC<FeaturedPostsProps> = ({ posts }) => {
  const featuredPosts = posts.filter(post => post.featured);
  
  if (featuredPosts.length === 0) return null;
  
  const mainFeaturedPost = featuredPosts[0];
  const secondaryFeaturedPosts = featuredPosts.slice(1, 3);
  
  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 dark:text-white">
            Featured Articles
          </h2>
          <Link to="/featured">
            <Button variant="ghost" className="text-blog-purple hover:text-blog-light-purple dark:text-blog-light-purple">
              View All <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 gap-8">
          {/* Main featured post */}
          <BlogCard post={mainFeaturedPost} featured={true} className="animate-fade-in" />
          
          {/* Secondary featured posts */}
          {secondaryFeaturedPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {secondaryFeaturedPosts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  className={`animate-fade-in [animation-delay:${200 + index * 100}ms]`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
