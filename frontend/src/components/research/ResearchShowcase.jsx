import React from 'react';
import { motion } from 'framer-motion';
import { Award, Brain, Activity, BookOpen, Layers, CheckCircle2, Zap, ArrowUpRight } from 'lucide-react';
import { KIBRET_INFO } from '../../utils/constants';

const ResearchShowcase = () => {
  return (
    <section id="research" className="relative py-20 bg-cyber-bg">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-96 bg-cyber-purple/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-cyber-purple/40 text-xs font-mono text-cyber-purple">
            <BookOpen className="w-3.5 h-3.5" />
            <span>MSc Thesis & Research Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
            Medical AI <span className="gradient-text font-mono">Research Innovation</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-sans">
            Deep learning optimization inspired by biological synaptic plasticity for volumetric medical image segmentation.
          </p>
        </div>

        {/* Feature Research Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel rounded-3xl p-6 sm:p-10 border border-cyber-purple/30 relative overflow-hidden shadow-2xl"
        >
          {/* Top Badge Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="px-3.5 py-1.5 rounded-xl bg-cyber-purple/15 border border-cyber-purple/30 text-xs font-mono font-semibold text-cyber-purple flex items-center gap-2">
              <Award className="w-4 h-4" />
              MSc Research Thesis — Bahir Dar University
            </span>
            <div className="px-3.5 py-1.5 rounded-xl bg-cyber-green/10 border border-cyber-green/30 text-xs font-mono font-bold text-cyber-green flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
              Benchmark Accuracy: 99.72%
            </div>
          </div>

          {/* Paper Title */}
          <h3 className="text-2xl sm:text-3xl font-bold font-mono text-white leading-snug mb-6">
            "{KIBRET_INFO.thesisTitle}"
          </h3>

          {/* Research Metric Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-cyber-card/80 border border-cyber-blue/20">
              <span className="text-gray-400 text-xs font-mono block mb-1">Research Area</span>
              <span className="text-white font-bold font-mono text-sm">Medical AI & DL</span>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-card/80 border border-cyber-purple/20">
              <span className="text-gray-400 text-xs font-mono block mb-1">Target Dataset</span>
              <span className="text-white font-bold font-mono text-sm">3D Brain MRI Scans</span>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-card/80 border border-cyber-green/20">
              <span className="text-gray-400 text-xs font-mono block mb-1">Core Architecture</span>
              <span className="text-white font-bold font-mono text-sm">U-Net + MONAI</span>
            </div>

            <div className="p-4 rounded-2xl bg-cyber-card/80 border border-cyber-blue/20">
              <span className="text-gray-400 text-xs font-mono block mb-1">Dice Score</span>
              <span className="text-cyber-green font-bold font-mono text-sm">0.984</span>
            </div>
          </div>

          {/* Methodology & Results Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-cyber-purple/15 text-sans">
            <div className="space-y-3">
              <h4 className="text-sm font-mono font-bold text-cyber-blue flex items-center gap-2">
                <Brain className="w-4 h-4 text-cyber-blue" />
                Problem Statement & Method
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Standard gradient descent optimizers (ADAM, SGD) often suffer from local minima traps and slow convergence when segmenting complex, low-contrast 3D brain tumor tissue boundaries. By introducing a reward-driven mathematical learning rate modulation inspired by biological synaptic plasticity, the network dynamically updates weights based on local feature reward signals.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-mono font-bold text-cyber-green flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyber-green" />
                Key Experimental Achievements
              </h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0" />
                  Achieved 99.72% voxel-level accuracy on 3D volumetric Brain MRI datasets.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0" />
                  3.4x faster loss convergence speed compared to baseline Adam optimizer.
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0" />
                  Robust handling of severe class imbalance in tumor core segmentation.
                </li>
              </ul>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ResearchShowcase;
