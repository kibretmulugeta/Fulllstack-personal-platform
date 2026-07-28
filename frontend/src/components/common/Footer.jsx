import React from 'react';
import { Cpu, Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { KIBRET_INFO } from '../../utils/constants';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-cyber-bg border-t border-cyber-blue/15 pt-16 pb-10 overflow-hidden">
      {/* Radial Glow Overlay */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-cyber-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-cyber-blue/10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyber-blue" />
              </div>
              <span className="font-mono text-xl font-bold text-white">
                Kibret<span className="text-cyber-blue">.AI</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm max-w-md leading-relaxed">
              {KIBRET_INFO.subtitle} Dedicated to pushing the boundaries of deep learning, medical image analysis, and scalable backend architecture.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={KIBRET_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-cyber-card border border-cyber-blue/20 flex items-center justify-center text-gray-300 hover:text-cyber-blue hover:border-cyber-blue/50 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={KIBRET_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-cyber-card border border-cyber-blue/20 flex items-center justify-center text-gray-300 hover:text-cyber-blue hover:border-cyber-blue/50 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${KIBRET_INFO.email}`}
                className="w-9 h-9 rounded-lg bg-cyber-card border border-cyber-blue/20 flex items-center justify-center text-gray-300 hover:text-cyber-blue hover:border-cyber-blue/50 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Quick Links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-cyber-blue font-semibold uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About & Academic</a></li>
              <li><a href="#skills" className="hover:text-white transition-colors">Skills & Tech Stack</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">Featured Projects</a></li>
              <li><a href="#research" className="hover:text-white transition-colors">MSc AI Research</a></li>
              <li><a href="#blogs" className="hover:text-white transition-colors">Technical Writings</a></li>
            </ul>
          </div>

          {/* Research & Academic */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs text-cyber-purple font-semibold uppercase tracking-wider">Research & University</h4>
            <p className="text-sm text-gray-400">
              {KIBRET_INFO.degree}
            </p>
            <p className="text-xs text-gray-500 font-mono">
              {KIBRET_INFO.university}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/30 text-[11px] font-mono text-cyber-green">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping" />
                Accuracy: 99.72%
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} Kibret Mulugeta Alemu. Built with React, Vite, FastAPI & MongoDB.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyber-card border border-cyber-blue/20 text-gray-300 hover:text-cyber-blue hover:border-cyber-blue/50 transition-all"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
