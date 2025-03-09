
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import BlogGrid from '@/components/Blog/BlogGrid';
import SearchBar from '@/components/Home/SearchBar';
import { blogPosts, BlogPost } from '@/data/mockData';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<BlogPost[]>([]);
  
  // Filter posts based on search query
  useEffect(() => {
    if (query) {
      const searchResults = blogPosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        post.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);
  
  return (
    <Layout>
      <section className="pt-24 pb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <SearchIcon className="mr-2" />
            Search Results
          </h1>
          
          <div className="mb-8">
            <SearchBar />
          </div>
          
          {query ? (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </p>
              
              {results.length > 0 ? (
                <BlogGrid posts={results} />
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    No results found for "{query}".
                  </p>
                  <p className="text-gray-500 dark:text-gray-500">
                    Try using different keywords or check your spelling.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Enter a search term to find articles.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Search;
