
import React from 'react';
import { Author } from '@/data/mockData';
import { Twitter, Linkedin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthorBioProps {
  author: Author;
}

const AuthorBio: React.FC<AuthorBioProps> = ({ author }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-gray-50 dark:bg-gray-800/50 my-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <img 
          src={author.avatar} 
          alt={author.name} 
          className="w-20 h-20 rounded-full border-2 border-blog-purple/20"
        />
        
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {author.name}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {author.bio}
          </p>
          
          <div className="flex justify-center sm:justify-start space-x-3">
            {author.socialLinks.twitter && (
              <a 
                href={author.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blog-purple dark:text-gray-400 dark:hover:text-blog-light-purple transition-colors"
              >
                <Twitter size={18} />
              </a>
            )}
            
            {author.socialLinks.linkedin && (
              <a 
                href={author.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blog-purple dark:text-gray-400 dark:hover:text-blog-light-purple transition-colors"
              >
                <Linkedin size={18} />
              </a>
            )}
            
            {author.socialLinks.github && (
              <a 
                href={author.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blog-purple dark:text-gray-400 dark:hover:text-blog-light-purple transition-colors"
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </div>
        
        <Button variant="outline" className="button-secondary mt-4 sm:mt-0">
          Follow
        </Button>
      </div>
    </div>
  );
};

export default AuthorBio;
