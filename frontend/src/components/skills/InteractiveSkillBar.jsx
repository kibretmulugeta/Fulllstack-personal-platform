import React from 'react';
import { motion } from 'framer-motion';

const InteractiveSkillBar = ({ name, percentage, icon }) => {
  return (
    <div className="space-y-1.5 group">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-gray-200 font-medium group-hover:text-cyber-blue transition-colors">
          {name}
        </span>
        <span className="text-cyber-green font-semibold">
          {percentage}%
        </span>
      </div>

      <div className="w-full h-2.5 rounded-full bg-cyber-bg/80 border border-cyber-blue/15 p-[1px] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green relative group-hover:shadow-[0_0_12px_rgba(0,240,255,0.6)] transition-all"
        >
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/60 rounded-full animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveSkillBar;
