
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import BlogGrid from '@/components/Blog/BlogGrid';
import { blogPosts } from '@/data/mockData';
import { Users, User, TwitterIcon, LinkedinIcon, GithubIcon, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Get unique authors from blog posts
const authors = [...new Map(blogPosts.map(post => [post.author.id, post.author])).values()];

const AuthorCard = ({ author, postCount }: { author: any, postCount: number }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm transition-transform hover:shadow-md hover:-translate-y-1">
      <div className="relative h-32 bg-gradient-to-r from-blog-purple to-blog-blue">
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <img 
            src={author.avatar} 
            alt={author.name} 
            className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800"
          />
        </div>
      </div>
      
      <div className="pt-16 p-6 text-center">
        <h3 className="font-playfair font-bold text-xl text-gray-900 dark:text-white mb-1">
          {author.name}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-3">{author.role}</p>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {author.bio}
        </p>
        
        <div className="flex justify-center space-x-3 mb-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <TwitterIcon size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <LinkedinIcon size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <GithubIcon size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Globe size={18} />
          </Button>
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {postCount} article{postCount !== 1 ? 's' : ''}
        </div>
        
        <Button asChild variant="outline" className="w-full">
          <Link to={`/author/${author.id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  );
};

const Authors = () => {
  const { id } = useParams<{ id: string }>();
  const [currentAuthor, setCurrentAuthor] = useState<any | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (id) {
      const author = authors.find(author => author.id === id);
      if (author) {
        setCurrentAuthor(author);
      }
    } else {
      setCurrentAuthor(null);
    }
  }, [id]);
  
  // Get posts by author
  const authorPosts = currentAuthor 
    ? blogPosts.filter(post => post.author.id === currentAuthor.id)
    : [];
  
  const handleFollow = () => {
    toast({
      title: `Following ${currentAuthor?.name}`,
      description: "You'll be notified when they publish new articles.",
    });
  };
  
  // This is for the authors list page
  if (!currentAuthor) {
    return (
      <Layout>
        <section className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center mb-12">
              <Users className="w-8 h-8 text-blog-purple mr-3" />
              <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 dark:text-white">
                Our Authors
              </h1>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {authors.map(author => {
                const postCount = blogPosts.filter(post => post.author.id === author.id).length;
                return (
                  <AuthorCard key={author.id} author={author} postCount={postCount} />
                );
              })}
            </div>
          </div>
        </section>
      </Layout>
    );
  }
  
  // This is for the individual author page
  return (
    <Layout>
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md mb-12">
              <div className="h-48 bg-gradient-to-r from-blog-purple to-blog-blue relative">
                <div className="absolute -bottom-16 left-8 sm:left-12">
                  <img 
                    src={currentAuthor.avatar} 
                    alt={currentAuthor.name} 
                    className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800"
                  />
                </div>
              </div>
              
              <div className="pt-20 p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-2">
                      {currentAuthor.name}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">{currentAuthor.role}</p>
                  </div>
                  
                  <div className="mt-4 sm:mt-0">
                    <Button onClick={handleFollow}>Follow Author</Button>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {currentAuthor.bio}
                </p>
                
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm" className="rounded-full">
                    <TwitterIcon size={16} className="mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <LinkedinIcon size={16} className="mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Globe size={16} className="mr-2" />
                    Website
                  </Button>
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl font-playfair font-bold text-gray-900 dark:text-white mb-6">
              Articles by {currentAuthor.name}
            </h2>
            
            {authorPosts.length > 0 ? (
              <BlogGrid posts={authorPosts} />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  This author hasn't published any articles yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Authors;
