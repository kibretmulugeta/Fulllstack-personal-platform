import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, Sparkles, Terminal, Code, Cpu, Database, Network } from 'lucide-react';
import Canvas3DBrain from '../common/Canvas3DBrain';
import ProfileCard from './ProfileCard';
import { KIBRET_INFO } from '../../utils/constants';

const Hero = () => {
  const handleDownloadResume = () => {
    // Generate styled PDF / resume preview fallback
    const resumeText = `KIBRET MULUGETA ALEMU\nAI Engineer | Machine Learning Researcher\nMSc in Artificial Intelligence and Data Engineering - Bahir Dar University\n\nResearch Thesis: ${KIBRET_INFO.thesisTitle}\nAccuracy Metric: 99.72%\n\nEmail: ${KIBRET_INFO.email}\nGitHub: ${KIBRET_INFO.github}\nLinkedIn: ${KIBRET_INFO.linkedin}`;
    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Kibret_Mulugeta_Alemu_AI_Engineer_CV.txt';
    link.click();
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Background Radial Lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-purple/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Subtitle, Description & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-cyber-blue/30 text-xs font-mono text-cyber-blue">
              <Sparkles className="w-3.5 h-3.5 text-cyber-green animate-pulse" />
              <span>MSc AI & Data Engineering Research</span>
            </div>

            {/* Large Animated Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-mono tracking-tight text-white leading-none">
                {KIBRET_INFO.name}
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold gradient-text font-mono">
                {KIBRET_INFO.role}
              </h2>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed font-sans">
              {KIBRET_INFO.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="group px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green text-cyber-bg font-mono font-bold text-sm flex items-center gap-2 shadow-lg shadow-cyber-blue/20 hover:scale-105 transition-all duration-300"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={handleDownloadResume}
                className="px-6 py-3.5 rounded-xl glass-panel border border-cyber-blue/30 text-cyber-blue hover:text-white hover:border-cyber-blue/60 font-mono font-semibold text-sm flex items-center gap-2 transition-all duration-300"
              >
                <Download className="w-4 h-4" />
                <span>Download CV</span>
              </button>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl bg-cyber-card border border-cyber-purple/30 text-cyber-purple hover:border-cyber-purple/60 hover:text-white font-mono font-semibold text-sm flex items-center gap-2 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Tech Badges Row */}
            <div className="pt-8 border-t border-cyber-blue/10 flex items-center gap-6 text-gray-400 font-mono text-xs">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyber-blue" />
                <span>Deep Learning</span>
              </div>
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-cyber-purple" />
                <span>Medical Image AI</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyber-green" />
                <span>FastAPI & Mongo</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Brain & Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            <Canvas3DBrain />
            <ProfileCard />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
