
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import BlogGrid from '@/components/Blog/BlogGrid';
import CategoryFilter from '@/components/Blog/CategoryFilter';
import { blogPosts, categories } from '@/data/mockData';

const Categories = () => {
  const { category } = useParams<{ category: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    category ? category.replace(/-/g, ' ') : null
  );
  
  useEffect(() => {
    if (category) {
      // Convert URL param format (e.g., "web-development") to display format ("Web Development")
      setSelectedCategory(category.replace(/-/g, ' '));
    }
  }, [category]);
  
  // Filter posts based on selected category
  const filteredPosts = selectedCategory
    ? blogPosts.filter(post => 
        post.category.toLowerCase() === selectedCategory.toLowerCase())
    : blogPosts;
    
  return (
    <Layout>
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-8">
            {selectedCategory ? `${selectedCategory} Articles` : 'Browse Categories'}
          </h1>
          
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
          
          <div className="mt-8">
            {filteredPosts.length > 0 ? (
              <BlogGrid posts={filteredPosts} />
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  No articles found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
