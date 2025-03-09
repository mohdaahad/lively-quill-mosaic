
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Eye, Heart, MessageCircle } from 'lucide-react';
import { BlogPost } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false, className }) => {
  return (
    <article 
      className={cn(
        'blog-card group bg-white dark:bg-gray-800 hover:transform hover:-translate-y-1 transition-all duration-300',
        featured ? 'lg:flex overflow-hidden' : '',
        className
      )}
    >
      <div className={cn('relative overflow-hidden', featured ? 'lg:w-1/2' : 'h-48 sm:h-64')}>
        <Link to={`/blog/${post.id}`}>
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {post.trending && (
            <div className="absolute top-0 right-0 bg-blog-blue text-white px-3 py-1 text-xs m-2 rounded-full">
              Trending
            </div>
          )}
        </Link>
      </div>
      
      <div className={cn(
        'p-5', 
        featured ? 'lg:w-1/2 lg:p-8 flex flex-col justify-center' : ''
      )}>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mb-3 space-x-4">
          <span className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </span>
          <span className="flex items-center">
            <Clock size={14} className="mr-1" />
            {post.readingTime} min read
          </span>
        </div>
        
        <Link to={`/blog/${post.id}`}>
          <h2 className={cn(
            'font-playfair font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blog-purple dark:group-hover:text-blog-light-purple transition-colors',
            featured ? 'text-2xl sm:text-3xl' : 'text-xl'
          )}>
            {post.title}
          </h2>
        </Link>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex justify-between items-center">
          <Link to={`/author/${post.author.id}`} className="flex items-center">
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-8 h-8 rounded-full mr-2"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {post.author.name}
            </span>
          </Link>
          
          <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400 text-sm">
            <span className="flex items-center">
              <Eye size={16} className="mr-1" />
              {post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}k` : post.views}
            </span>
            <span className="flex items-center">
              <Heart size={16} className="mr-1" />
              {post.likes}
            </span>
            <span className="flex items-center">
              <MessageCircle size={16} className="mr-1" />
              {post.comments.length}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
