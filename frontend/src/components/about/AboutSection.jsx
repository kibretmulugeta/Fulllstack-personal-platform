import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Brain, Target, Compass, Award, BookOpen } from 'lucide-react';
import { KIBRET_INFO } from '../../utils/constants';

const AboutSection = () => {
  return (
    <section id="about" className="relative py-20 bg-cyber-bg/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyber-purple/30 text-xs font-mono text-cyber-purple">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic & Professional Background</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
            About <span className="gradient-text font-mono">Kibret Mulugeta</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-sans">
            Machine Learning Researcher and Full-Stack AI Engineer dedicated to clinical deep learning, automated segmentation, and scalable cloud systems.
          </p>
        </div>

        {/* 2x2 Grid of Focus Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 1. Biography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-panel rounded-2xl p-6 md:p-8 space-y-4 border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center text-cyber-blue">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-mono text-white">Biography</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed font-sans">
              I am an AI Engineer and Machine Learning Researcher holding an MSc in Artificial Intelligence & Data Engineering from Bahir Dar University. My work bridges mathematical deep learning optimizations with practical full-stack engineering. I specialize in designing high-accuracy neural network architectures for complex 3D medical image segmentation and building resilient Python FastAPI backends.
            </p>
          </motion.div>

          {/* 2. Education & Thesis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel rounded-2xl p-6 md:p-8 space-y-4 border border-cyber-purple/20 hover:border-cyber-purple/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-mono text-white">Academic Qualifications</h3>
            </div>
            <div className="space-y-2 text-sm font-sans">
              <p className="text-white font-semibold font-mono">{KIBRET_INFO.degree}</p>
              <p className="text-cyber-purple font-mono text-xs">{KIBRET_INFO.university}</p>
              <div className="pt-2 border-t border-cyber-purple/10">
                <span className="text-xs font-mono text-gray-400 block mb-1">MSc Research Thesis:</span>
                <p className="text-gray-300 text-xs italic bg-cyber-card/60 p-3 rounded-lg border border-cyber-purple/20">
                  "{KIBRET_INFO.thesisTitle}"
                </p>
              </div>
            </div>
          </motion.div>

          {/* 3. Research Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel rounded-2xl p-6 md:p-8 space-y-4 border border-cyber-green/20 hover:border-cyber-green/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center text-cyber-green">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-mono text-white">Research Focus</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-300 font-sans">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
                Reward-driven synaptic plasticity weight optimization algorithms
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
                3D Volumetric Brain MRI & CT scan segmentation using U-Net & MONAI
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
                Retrieval-Augmented Generation (RAG) and domain-specific LLMs
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-green" />
                Computer Vision & Real-time Diagnostic Assistance Systems
              </li>
            </ul>
          </motion.div>

          {/* 4. Professional Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-panel rounded-2xl p-6 md:p-8 space-y-4 border border-cyber-blue/20 hover:border-cyber-blue/40 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center text-cyber-blue">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-mono text-white">Professional Goals</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed font-sans">
              Aiming to contribute to world-class AI laboratories, healthcare technology institutions, and cutting-edge open source machine learning ecosystems. Focused on delivering production-grade AI solutions that combine mathematical rigor, low inference latency, and intuitive user experiences.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
