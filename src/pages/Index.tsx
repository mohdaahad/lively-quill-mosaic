
import React, { useState } from 'react';
import Layout from '@/components/Layout/Layout';
import HeroSection from '@/components/Home/HeroSection';
import FeaturedPosts from '@/components/Blog/FeaturedPosts';
import TrendingPosts from '@/components/Blog/TrendingPosts';
import BlogGrid from '@/components/Blog/BlogGrid';
import CategoryFilter from '@/components/Blog/CategoryFilter';
import Newsletter from '@/components/Blog/Newsletter';
import { blogPosts, categories } from '@/data/mockData';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const featuredPost = blogPosts.find(post => post.featured) || blogPosts[0];
  
  // Filter posts based on selected category
  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;
  
  return (
    <Layout>
      <HeroSection featuredPost={featuredPost} />
      <FeaturedPosts posts={blogPosts} />
      <TrendingPosts posts={blogPosts} />
      
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-6">
            Explore Articles
          </h2>
          
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
          
          <div className="mt-8">
            <BlogGrid posts={filteredPosts} />
          </div>
        </div>
      </section>
      
      <Newsletter />
    </Layout>
  );
};

export default Index;
