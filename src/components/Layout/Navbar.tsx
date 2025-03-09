
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <nav className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="text-2xl font-playfair font-bold text-blog-purple animate-fade-in"
          >
            Insight<span className="text-blog-blue">Blog</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="group relative">
              <span className="nav-link cursor-pointer">Categories</span>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {categories.slice(0, 6).map((category) => (
                    <Link
                      key={category}
                      to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex items-center space-x-4">
            <button
              className="text-gray-600 dark:text-gray-300 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-blog-purple dark:hover:text-blog-light-purple transition-colors"
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Button className="button-primary">Subscribe</Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 mr-4"
            aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-600 dark:text-gray-300"
            aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-slide-in-right">
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block py-2 text-gray-800 dark:text-gray-200 hover:text-blog-purple dark:hover:text-blog-light-purple"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <span className="block py-2 text-gray-800 dark:text-gray-200 font-medium">
                  Categories
                </span>
                <ul className="pl-4 space-y-2 mt-2">
                  {categories.slice(0, 6).map((category) => (
                    <li key={category}>
                      <Link
                        to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blog-purple dark:hover:text-blog-light-purple"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <Link
                  to="/about"
                  className="block py-2 text-gray-800 dark:text-gray-200 hover:text-blog-purple dark:hover:text-blog-light-purple"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 text-gray-800 dark:text-gray-200 hover:text-blog-purple dark:hover:text-blog-light-purple"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <div className="flex space-x-4 items-center mt-4">
                  <Search size={20} className="text-gray-600 dark:text-gray-300" />
                  <span className="text-gray-600 dark:text-gray-300">Search</span>
                </div>
              </li>
              <li>
                <Button className="w-full mt-4 button-primary">Subscribe</Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
