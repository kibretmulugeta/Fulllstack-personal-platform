import React from 'react';
import { motion } from 'framer-motion';
import { Award, Brain, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { KIBRET_INFO } from '../../utils/constants';

const ProfileCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative group max-w-md mx-auto w-full"
    >
      {/* Outer Glowing Border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green rounded-3xl blur opacity-30 group-hover:opacity-75 transition duration-500" />

      <div className="relative glass-panel rounded-3xl p-6 md:p-8 space-y-6">
        {/* Avatar Image with Holographic Ring */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 mx-auto">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyber-blue to-cyber-green p-[2px] animate-pulse">
            <div className="w-full h-full bg-cyber-bg rounded-[14px]" />
          </div>
          <img
            src={KIBRET_INFO.avatar}
            alt={KIBRET_INFO.name}
            className="relative w-full h-full object-cover rounded-2xl shadow-2xl border border-cyber-blue/30"
          />
          {/* Status Badge */}
          <div className="absolute -bottom-2 -right-2 bg-cyber-bg/90 backdrop-blur-md px-3 py-1 rounded-full border border-cyber-green/50 text-[11px] font-mono text-cyber-green flex items-center gap-1.5 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
            Available for Research & AI Roles
          </div>
        </div>

        {/* Identity & Degree */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold font-mono text-white flex items-center justify-center gap-2">
            {KIBRET_INFO.name}
            <ShieldCheck className="w-5 h-5 text-cyber-blue" />
          </h3>
          <p className="text-xs text-cyber-blue font-mono font-medium">
            {KIBRET_INFO.degree}
          </p>
          <p className="text-xs text-gray-400 font-mono">
            {KIBRET_INFO.university}
          </p>
        </div>

        {/* Key Highlight Badges */}
        <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
          <div className="p-3 rounded-xl bg-cyber-card/80 border border-cyber-blue/20 flex flex-col items-center justify-center gap-1">
            <Award className="w-4 h-4 text-cyber-green" />
            <span className="text-gray-400 text-[10px]">U-Net Accuracy</span>
            <span className="text-cyber-green font-bold">99.72%</span>
          </div>

          <div className="p-3 rounded-xl bg-cyber-card/80 border border-cyber-purple/20 flex flex-col items-center justify-center gap-1">
            <Brain className="w-4 h-4 text-cyber-purple" />
            <span className="text-gray-400 text-[10px]">Focus</span>
            <span className="text-cyber-purple font-bold">Medical AI</span>
          </div>
        </div>

        {/* Quick Tech Tag Badges */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
          {['PyTorch', 'TensorFlow', 'MONAI', 'FastAPI', 'MongoDB', 'React'].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-cyber-blue/10 border border-cyber-blue/20 text-[11px] font-mono text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
