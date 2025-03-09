
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import AuthorBio from '@/components/Blog/AuthorBio';
import CommentSection from '@/components/Blog/CommentSection';
import Newsletter from '@/components/Blog/Newsletter';
import { blogPosts } from '@/data/mockData';
import { BlogPost as BlogPostType } from '@/data/mockData';
import { Calendar, Clock, Eye, Heart, MessageCircle, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Load post data
  useEffect(() => {
    const foundPost = blogPosts.find(p => p.id === id);
    if (foundPost) {
      setPost(foundPost);
      setLikes(foundPost.likes);
      
      // Simulate fetching time
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    } else {
      // Post not found, redirect to 404
      navigate('/not-found');
    }
  }, [id, navigate]);
  
  // Calculate reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setReadingProgress(scrollPercent * 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLike = () => {
    if (!isLiked) {
      setLikes(prev => prev + 1);
      setIsLiked(true);
      toast({
        description: "You liked this article!",
        duration: 1500,
      });
    } else {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || 'Blog post',
        text: post?.excerpt || '',
        url: window.location.href,
      }).then(() => {
        toast({
          description: "Article shared successfully!",
          duration: 1500,
        });
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast({
        description: "Link copied to clipboard!",
        duration: 1500,
      });
    }
  };
  
  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  const currentIndex = blogPosts.findIndex(p => p.id === id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  
  return (
    <Layout>
      {/* Reading progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-blog-purple z-50 transition-all duration-100"
        style={{ width: `${readingProgress}%` }}
      />
      
      <article className="pt-24 pb-12 animate-fade-in">
        <div className="container mx-auto px-4">
          {/* Header */}
          <header className="max-w-4xl mx-auto mb-12 text-center">
            <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
              <Link 
                to={`/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-blog-purple/10 hover:text-blog-purple transition-colors"
              >
                {post.category}
              </Link>
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
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold text-gray-900 dark:text-white mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-center mb-8">
              <Link to={`/author/${post.author.id}`} className="flex items-center">
                <img 
                  src={post.author.avatar} 
                  alt={post.author.name} 
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div className="text-left">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {post.author.name}
                  </p>
                </div>
              </Link>
            </div>
            
            <div className="w-full h-[400px] sm:h-[500px] overflow-hidden rounded-xl mb-8">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
              />
            </div>
          </header>
          
          {/* Content */}
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg dark:prose-invert prose-headings:font-playfair prose-headings:font-bold prose-a:text-blog-purple dark:prose-a:text-blog-light-purple prose-img:rounded-xl mx-auto">
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
            </div>
            
            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-blog-purple/10 hover:text-blog-purple transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
            
            {/* Engagement */}
            <div className="mt-12 flex items-center justify-between border-t border-b border-gray-200 dark:border-gray-700 py-4">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={handleLike}
                  className={`flex items-center ${isLiked ? 'text-blog-purple dark:text-blog-light-purple' : 'text-gray-500 dark:text-gray-400'} hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors`}
                >
                  <Heart size={20} className={`mr-2 ${isLiked ? 'fill-blog-purple dark:fill-blog-light-purple' : ''}`} />
                  {likes}
                </button>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <MessageCircle size={20} className="mr-2" />
                  {post.comments.length}
                </div>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Eye size={20} className="mr-2" />
                  {post.views.toLocaleString()}
                </div>
              </div>
              
              <button 
                onClick={handleShare}
                className="text-gray-500 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors"
              >
                <Share2 size={20} />
              </button>
            </div>
            
            {/* Author Bio */}
            <AuthorBio author={post.author} />
            
            {/* Post Navigation */}
            <div className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prevPost && (
                <Link 
                  to={`/blog/${prevPost.id}`}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blog-purple dark:hover:border-blog-light-purple transition-colors group"
                >
                  <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-blog-purple dark:group-hover:text-blog-light-purple mb-2">
                    <ChevronLeft size={16} className="mr-1" />
                    Previous Article
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blog-purple dark:group-hover:text-blog-light-purple line-clamp-2">
                    {prevPost.title}
                  </h4>
                </Link>
              )}
              
              {nextPost && (
                <Link 
                  to={`/blog/${nextPost.id}`}
                  className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blog-purple dark:hover:border-blog-light-purple transition-colors group ${!prevPost ? 'sm:col-start-2' : ''}`}
                >
                  <div className="flex items-center justify-end text-gray-500 dark:text-gray-400 group-hover:text-blog-purple dark:group-hover:text-blog-light-purple mb-2">
                    Next Article
                    <ChevronRight size={16} className="ml-1" />
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blog-purple dark:group-hover:text-blog-light-purple text-right line-clamp-2">
                    {nextPost.title}
                  </h4>
                </Link>
              )}
            </div>
            
            {/* Comments */}
            <CommentSection comments={post.comments} />
          </div>
        </div>
      </article>
      
      <Newsletter />
    </Layout>
  );
};

export default BlogPost;
