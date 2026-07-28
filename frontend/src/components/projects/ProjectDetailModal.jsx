import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle2, Award, Cpu, Server, Activity } from 'lucide-react';

const ProjectDetailModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-bg/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl glass-panel rounded-3xl border border-cyber-blue/30 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="relative h-48 sm:h-64 overflow-hidden bg-cyber-card">
            <img
              src={project.image || '/images/unet-segmentation.png'}
              alt={project.title}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-cyber-bg/40 to-transparent" />
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-cyber-bg/80 border border-cyber-blue/30 text-gray-300 hover:text-white hover:border-cyber-blue"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="absolute bottom-6 left-6 right-6 space-y-1">
              <span className="px-3 py-1 rounded-full bg-cyber-blue/20 border border-cyber-blue/40 text-xs font-mono text-cyber-blue">
                Architecture Breakdown
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 text-sans">
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-cyber-blue uppercase tracking-wider font-semibold">Overview</h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Metrics Grid */}
            {project.metrics && (
              <div className="p-4 rounded-xl bg-cyber-card/80 border border-cyber-green/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono text-cyber-green">
                  <Award className="w-4 h-4" />
                  <span className="font-bold">Benchmarking & Measured Metrics</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono pt-1">
                  {Object.entries(project.metrics).map(([k, v]) => (
                    <div key={k} className="p-2.5 rounded-lg bg-cyber-bg/80 border border-cyber-blue/15">
                      <span className="text-gray-400 capitalize block text-[10px]">{k.replace('_', ' ')}</span>
                      <span className="text-cyber-blue font-bold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Architectural Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-cyber-purple uppercase tracking-wider font-semibold">Key Highlights & Innovations</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-cyber-blue uppercase tracking-wider font-semibold">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-cyber-blue/10 border border-cyber-blue/20 text-xs font-mono text-cyber-blue"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Links */}
          <div className="p-6 bg-cyber-card/90 border-t border-cyber-blue/15 flex items-center justify-between">
            <span className="text-xs font-mono text-gray-400">KibretAI Open-Source Artifact</span>
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyber-card border border-cyber-blue/30 text-gray-200 hover:text-cyber-blue font-mono text-xs font-semibold flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-purple text-cyber-bg font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyber-blue/20 hover:scale-105 transition-all"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectDetailModal;
