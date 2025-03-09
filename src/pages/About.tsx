
import React from 'react';
import Layout from '@/components/Layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-playfair font-bold text-gray-900 dark:text-white mb-6">
              About ProsePulse
            </h1>
            
            <div className="w-full h-[400px] rounded-xl overflow-hidden mb-8">
              <img 
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="ProsePulse Team" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                Welcome to ProsePulse, a next-generation blog platform designed to provide an immersive reading experience with stunning visuals and seamless interactions.
              </p>
              
              <h2>Our Mission</h2>
              <p>
                At ProsePulse, we believe that quality content deserves a premium presentation. Our mission is to create a platform where writers can showcase their thoughts in an elegant, distraction-free environment, and readers can enjoy a seamless, engaging experience.
              </p>
              
              <h2>Our Story</h2>
              <p>
                Founded in 2023, ProsePulse began as a project to reimagine how digital content could be presented. Frustrated with cluttered blog platforms that prioritized advertisements over readability, our team set out to create a space where content truly shines.
              </p>
              
              <h2>Our Team</h2>
              <p>
                Our diverse team of designers, developers, and content creators work together to continuously improve the ProsePulse experience. We're passionate about creating a platform that serves both writers and readers with equal dedication.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/subscribe">Join Our Newsletter</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
