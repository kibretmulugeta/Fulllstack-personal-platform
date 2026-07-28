import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Server, Box, Sparkles } from 'lucide-react';
import InteractiveSkillBar from './InteractiveSkillBar';
import { fetchSkills } from '../../services/api';

const DEFAULT_SKILLS = [
  { name: 'Python', category: 'Programming', percentage: 98 },
  { name: 'JavaScript / ES6+', category: 'Programming', percentage: 92 },
  { name: 'SQL & Database Architecture', category: 'Programming', percentage: 90 },
  
  { name: 'TensorFlow & Keras', category: 'AI/ML', percentage: 96 },
  { name: 'PyTorch', category: 'AI/ML', percentage: 95 },
  { name: 'Scikit-learn', category: 'AI/ML', percentage: 94 },
  { name: 'MONAI (Medical AI Framework)', category: 'AI/ML', percentage: 92 },
  { name: 'Computer Vision & OpenCV', category: 'AI/ML', percentage: 93 },
  { name: 'Deep Learning & Neural Plasticity', category: 'AI/ML', percentage: 96 },
  
  { name: 'FastAPI (Python)', category: 'Backend', percentage: 96 },
  { name: 'Flask', category: 'Backend', percentage: 88 },
  { name: 'Node.js & Express', category: 'Backend', percentage: 90 },
  { name: 'MongoDB & Motor Async Driver', category: 'Backend', percentage: 92 },
  
  { name: 'Docker & Containerization', category: 'Tools', percentage: 91 },
  { name: 'Git & GitHub CI/CD', category: 'Tools', percentage: 95 },
  { name: 'Linux Environment', category: 'Tools', percentage: 90 },
  { name: 'Vercel & Render Cloud Deployment', category: 'Tools', percentage: 93 },
];

const categories = ['All', 'AI/ML', 'Programming', 'Backend', 'Tools'];

const SkillsGrid = () => {
  const [skills, setSkills] = useState(DEFAULT_SKILLS);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const loadSkills = async () => {
      const data = await fetchSkills();
      if (data && data.length > 0) {
        setSkills(data);
      }
    };
    loadSkills();
  }, []);

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'AI/ML': return <Cpu className="w-4 h-4 text-cyber-green" />;
      case 'Programming': return <Terminal className="w-4 h-4 text-cyber-blue" />;
      case 'Backend': return <Server className="w-4 h-4 text-cyber-purple" />;
      case 'Tools': return <Box className="w-4 h-4 text-cyber-blue" />;
      default: return <Sparkles className="w-4 h-4 text-cyber-blue" />;
    }
  };

  return (
    <section id="skills" className="relative py-20 bg-cyber-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyber-blue/30 text-xs font-mono text-cyber-blue">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
            Skills & <span className="gradient-text">Proficiencies</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-sans">
            Specialized toolsets spanning Deep Learning frameworks, medical AI segmentation libraries, asynchronous backends, and cloud DevOps.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 flex items-center gap-2 border ${
                activeCategory === cat
                  ? 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue/50 shadow-lg shadow-cyber-blue/10'
                  : 'bg-cyber-card/60 text-gray-400 border-cyber-blue/10 hover:border-cyber-blue/30 hover:text-gray-200'
              }`}
            >
              {getCategoryIcon(cat)}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        {/* Skill Bars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="glass-panel p-5 rounded-2xl border border-cyber-blue/15 hover:border-cyber-blue/35 transition-all"
            >
              <InteractiveSkillBar
                name={skill.name}
                percentage={skill.percentage}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsGrid;
