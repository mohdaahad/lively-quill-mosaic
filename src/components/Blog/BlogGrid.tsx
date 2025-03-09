
import React from 'react';
import { BlogPost } from '@/data/mockData';
import BlogCard from './BlogCard';

interface BlogGridProps {
  posts: BlogPost[];
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl text-gray-600 dark:text-gray-400">
          No posts found. Try a different category.
        </h3>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <BlogCard 
          key={post.id} 
          post={post} 
          className={`animate-fade-in [animation-delay:${index * 100}ms]`}
        />
      ))}
    </div>
  );
};

export default BlogGrid;
