'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, ShoppingBag, User, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check user's preferred color scheme
  useEffect(() => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  return (
    <motion.header 
      className={`fixed top-0 w-[90%] z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div 
              className="font-bold text-2xl text-gradient"
              whileHover={{ scale: 1.05 }}
            >
              Collectibles
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/marketplace">Marketplace</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/sell">Sell</NavLink>
            <NavLink href="/about">About</NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button 
              className="p-2 rounded-full text-gray-600 hover:text-[var(--primary)] dark:text-gray-400 dark:hover:text-[var(--primary)]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            
            <motion.button 
              className="p-2 rounded-full text-gray-600 hover:text-[var(--primary)] dark:text-gray-400 dark:hover:text-[var(--primary)]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Search size={20} />
            </motion.button>
            
            <motion.button 
              className="p-2 rounded-full text-gray-600 hover:text-[var(--primary)] dark:text-gray-400 dark:hover:text-[var(--primary)]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ShoppingBag size={20} />
            </motion.button>
            
            <motion.button 
              className="flex items-center gap-2 py-2 px-4 bg-[var(--primary)] text-white rounded-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User size={16} />
              <span>Sign In</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden p-2 text-gray-600 hover:text-[var(--primary)] dark:text-gray-400 dark:hover:text-[var(--primary)]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        className={`fixed inset-0 bg-white dark:bg-neutral-900 z-40 pt-20 px-4 ${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}
        initial={{ opacity: 0, x: '100%' }}
        animate={{ 
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : '100%'
        }}
        transition={{ duration: 0.3 }}
      >
        <nav className="flex flex-col gap-4">
          <MobileNavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</MobileNavLink>
          <MobileNavLink href="/marketplace" onClick={() => setIsMobileMenuOpen(false)}>Marketplace</MobileNavLink>
          <MobileNavLink href="/categories" onClick={() => setIsMobileMenuOpen(false)}>Categories</MobileNavLink>
          <MobileNavLink href="/sell" onClick={() => setIsMobileMenuOpen(false)}>Sell</MobileNavLink>
          <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
          
          <div className="flex items-center justify-between mt-4 border-t border-gray-100 dark:border-gray-800 pt-4">
            <button className="flex items-center gap-2 py-2 px-4 bg-[var(--primary)] text-white rounded-lg">
              <User size={16} />
              <span>Sign In</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full text-gray-600 hover:text-[var(--primary)] dark:text-gray-400 dark:hover:text-[var(--primary)]">
                <Search size={20} />
              </button>
              <button className="p-2 rounded-full text-gray-600 hover:text-[var(--primary)] dark:text-gray-400 dark:hover:text-[var(--primary)]">
                <ShoppingBag size={20} />
              </button>
              <button 
                className="p-2 rounded-full text-gray-600 hover:text-[var(--primary)] dark:text-gray-400 dark:hover:text-[var(--primary)]"
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </nav>
      </motion.div>
    </motion.header>
  );
};

// Desktop Nav Link component
const NavLink = ({ href, children }) => {
  return (
    <Link 
      href={href} 
      className="relative text-gray-700 hover:text-[var(--primary)] dark:text-gray-300 dark:hover:text-[var(--primary)] transition-colors duration-200 font-medium"
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--primary)] transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

// Mobile Nav Link component
const MobileNavLink = ({ href, children, onClick }) => {
  return (
    <Link 
      href={href} 
      className="py-3 text-lg text-gray-700 hover:text-[var(--primary)] dark:text-gray-300 dark:hover:text-[var(--primary)] transition-colors border-b border-gray-100 dark:border-gray-800 flex justify-between items-center"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;