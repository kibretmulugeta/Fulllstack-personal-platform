import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, Tag, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogReaderModal = ({ blog, onClose }) => {
  if (!blog) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-bg/90 backdrop-blur-2xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl glass-panel rounded-3xl border border-cyber-blue/30 overflow-hidden shadow-2xl my-8 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="relative p-6 sm:p-8 bg-cyber-card border-b border-cyber-blue/15 space-y-4">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-cyber-bg/80 border border-cyber-blue/30 text-gray-300 hover:text-white hover:border-cyber-blue"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                {blog.category}
              </span>
              <span className="text-gray-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-cyber-purple" />
                {blog.read_time || '5 min read'}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-mono text-white leading-snug">
              {blog.title}
            </h2>
          </div>

          {/* Body with Markdown Formatting */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-6 flex-1 text-sans text-gray-200 leading-relaxed prose prose-invert max-w-none">
            <ReactMarkdown>{blog.content}</ReactMarkdown>
          </div>

          {/* Footer */}
          <div className="p-6 bg-cyber-card/90 border-t border-cyber-blue/15 flex items-center justify-between text-xs font-mono text-gray-400">
            <span>Author: Kibret Mulugeta Alemu</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/20 transition-all font-semibold"
            >
              Close Article
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BlogReaderModal;
