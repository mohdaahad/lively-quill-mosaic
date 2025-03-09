
import React from 'react';
import Layout from '@/components/Layout/Layout';
import BlogGrid from '@/components/Blog/BlogGrid';
import { BlogPost } from '@/data/mockData';
import { blogPosts } from '@/data/mockData';
import { Award } from 'lucide-react';

const Featured = () => {
  // Get featured posts
  const featuredPosts: BlogPost[] = blogPosts
    .filter(post => post.featured)
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  
  return (
    <Layout>
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Award className="w-12 h-12 text-blog-purple mx-auto mb-4" />
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-4">
              Featured Articles
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our handpicked selection of the most insightful, innovative, and impactful stories.
            </p>
          </div>
          
          {featuredPosts.length > 0 ? (
            <BlogGrid posts={featuredPosts} />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No featured articles available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Featured;
