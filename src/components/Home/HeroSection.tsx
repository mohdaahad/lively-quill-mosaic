
import React from 'react';
import { BlogPost } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock } from 'lucide-react';

interface HeroSectionProps {
  featuredPost: BlogPost;
}

const HeroSection: React.FC<HeroSectionProps> = ({ featuredPost }) => {
  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-blog-purple/5 to-transparent dark:from-blog-purple/10 -z-10" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-blog-purple/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-blog-blue/10 rounded-full blur-3xl -z-10 animate-pulse-slow" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
            Discover Insightful Articles on Technology and Design
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in [animation-delay:200ms]">
            Explore the latest trends, ideas, and innovations in web development, design, and technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in [animation-delay:400ms]">
            <Button className="button-primary">
              Start Exploring
            </Button>
            <Button variant="outline" className="button-secondary">
              Subscribe
            </Button>
          </div>
        </div>
        
        {/* Featured post preview */}
        <div className="mt-16 relative overflow-hidden rounded-xl shadow-2xl animate-scale-in [animation-delay:500ms]">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent z-10" />
          
          <img 
            src={featuredPost.coverImage} 
            alt={featuredPost.title} 
            className="w-full object-cover h-[500px]"
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
            <div className="flex items-center text-white/80 text-sm mb-3">
              <span className="bg-blog-purple px-3 py-1 rounded-full mr-4">
                {featuredPost.category}
              </span>
              <span className="flex items-center">
                <Clock size={16} className="mr-1" />
                {featuredPost.readingTime} min read
              </span>
            </div>
            
            <Link to={`/blog/${featuredPost.id}`}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-white mb-4 hover:text-blog-light-purple transition-colors">
                {featuredPost.title}
              </h2>
            </Link>
            
            <p className="text-white/80 mb-6 max-w-3xl">
              {featuredPost.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={featuredPost.author.avatar} 
                  alt={featuredPost.author.name} 
                  className="w-10 h-10 rounded-full mr-3 border-2 border-white"
                />
                <div>
                  <p className="text-white font-medium">
                    {featuredPost.author.name}
                  </p>
                  <p className="text-white/70 text-sm">
                    {new Date(featuredPost.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <Link to={`/blog/${featuredPost.id}`}>
                <Button className="text-white bg-blog-purple hover:bg-blog-light-purple">
                  Read Article
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
