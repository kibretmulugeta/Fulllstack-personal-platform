import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles, Award, Layers } from 'lucide-react';

const ProjectCard = ({ project, onOpenDetail }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-2xl glass-panel border border-cyber-blue/20 hover:border-cyber-blue/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyber-blue/15"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-3 left-3 z-20 px-3 py-1 rounded-full bg-cyber-bg/80 backdrop-blur-md border border-cyber-green/50 text-[11px] font-mono text-cyber-green flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3 h-3 text-cyber-green animate-pulse" />
          Featured Project
        </div>
      )}

      {/* Project Banner Image */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-cyber-card">
        <img
          src={project.image || '/images/unet-segmentation.png'}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent opacity-90" />
        
        {/* Metric Overlay Badge */}
        {project.metrics?.accuracy && (
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-cyber-bg/90 backdrop-blur-md border border-cyber-blue/40 text-xs font-mono text-cyber-blue flex items-center gap-1.5 shadow-md">
            <Award className="w-3.5 h-3.5 text-cyber-green" />
            Accuracy: <span className="font-bold text-cyber-green">{project.metrics.accuracy}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3
            onClick={() => onOpenDetail(project)}
            className="text-xl font-bold font-mono text-white group-hover:text-cyber-blue transition-colors cursor-pointer"
          >
            {project.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 font-sans">
            {project.description}
          </p>
        </div>

        {/* Technology Badges */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies?.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-cyber-blue/10 border border-cyber-blue/20 text-[11px] font-mono text-cyber-blue"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links Row */}
          <div className="pt-3 border-t border-cyber-blue/10 flex items-center justify-between">
            <button
              onClick={() => onOpenDetail(project)}
              className="text-xs font-mono text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5 text-cyber-purple" />
              View Architecture
            </button>

            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-cyber-card border border-cyber-blue/20 text-gray-300 hover:text-cyber-blue hover:border-cyber-blue/50 transition-all"
                  title="View GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/20 transition-all text-xs font-mono font-medium flex items-center gap-1"
                  title="Live Application Demo"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default ProjectCard;
