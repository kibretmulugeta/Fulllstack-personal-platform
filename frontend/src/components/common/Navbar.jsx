import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Menu, X, Shield, Bot, Code, Terminal, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Research', href: '#research' },
  { name: 'Timeline', href: '#timeline' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = ({ onOpenAdmin, onOpenAIChat }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-cyber-bg/80 backdrop-blur-xl border-b border-cyber-blue/15 shadow-xl shadow-cyber-bg/50'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyber-blue via-cyber-purple to-cyber-green p-[1px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-cyber-bg rounded-[11px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyber-blue group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-lg font-bold tracking-tight text-white flex items-center gap-1">
              Kibret<span className="text-cyber-blue">.AI</span>
            </span>
            <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">
              AI Engineer & Research Platform
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-cyber-glass/50 px-4 py-1.5 rounded-full border border-cyber-blue/10 backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/10 transition-all duration-200"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {/* AI Assistant Quick Toggle */}
          <button
            onClick={onOpenAIChat}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-cyber-green bg-cyber-green/10 border border-cyber-green/30 hover:bg-cyber-green/20 transition-all duration-200 shadow-sm shadow-cyber-green/10"
          >
            <Bot className="w-4 h-4 animate-pulse" />
            <span>AI Assistant</span>
          </button>

          {/* Protected Admin Access */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium text-gray-300 bg-cyber-card/80 border border-cyber-blue/20 hover:border-cyber-blue/50 hover:text-cyber-blue transition-all duration-200"
          >
            <Shield className="w-3.5 h-3.5 text-cyber-purple" />
            <span>{isAuthenticated ? 'Admin Dashboard' : 'Admin'}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenAIChat}
            className="p-2 rounded-lg bg-cyber-green/10 border border-cyber-green/30 text-cyber-green"
          >
            <Bot className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-cyber-card border border-cyber-blue/20 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-cyber-bg/95 backdrop-blur-2xl border-b border-cyber-blue/20 px-4 py-4 space-y-2 mt-2"
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/10 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <div className="pt-3 border-t border-cyber-blue/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple text-xs font-mono font-medium"
              >
                <Shield className="w-4 h-4" />
                {isAuthenticated ? 'Admin Dashboard' : 'Admin Login'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
