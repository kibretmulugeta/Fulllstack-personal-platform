import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Search, Clock, ArrowRight, Tag } from 'lucide-react';
import BlogReaderModal from './BlogReaderModal';
import { fetchBlogs } from '../../services/api';

const DEFAULT_BLOGS = [
  {
    _id: "blog-1",
    title: "Understanding U-Net Architecture in Medical AI",
    summary: "An in-depth guide to the Contracting and Expansive paths of U-Net, skip connections, and volumetric 3D MRI segmentation techniques.",
    category: "Medical AI",
    read_time: "7 min read",
    content: `
# Understanding U-Net Architecture in Medical AI

Medical image segmentation demands high structural fidelity, precise boundary delineations, and robust generalization even on small clinical datasets.

## Key Architectural Components

1. **Encoder (Contracting Path)**: Captures spatial features using repeated 3x3 convolutions followed by ReLU and Max Pooling.
2. **Decoder (Expansive Path)**: Reconstructs high-resolution spatial masks using Up-convolutions.
3. **Skip Connections**: Concatenate fine-grained spatial feature maps from the encoder directly to the decoder, preventing spatial detail loss.

## Volumetric 3D Medical Imaging with MONAI

When expanding U-Net from 2D slices to 3D volumetric MRI tensors, memory efficiency and specialized loss functions (such as Dice + Focal Loss) become essential for achieving high precision.
`,
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-2",
    title: "Deep Learning Optimization: Synaptic Plasticity & Reward Dynamics",
    summary: "Exploring how biological learning principles can inspire novel optimizer weight updates in neural networks.",
    category: "Deep Learning",
    read_time: "9 min read",
    content: `
# Deep Learning Optimization: Synaptic Plasticity & Reward Dynamics

Standard SGD and Adam rely purely on backpropagated gradient vectors. However, biological brains refine synaptic weights using local reward signals and spike-timing-dependent plasticity (STDP).

## Mathematical Formulation

By combining global reward feedback $R(t)$ with local pre- and post-synaptic activity metrics:

$$\\Delta W_{ij} = \\eta \\cdot R(t) \\cdot (a_i^{\\text{pre}} \\cdot a_j^{\\text{post}} - \\lambda W_{ij})$$

This formulation accelerates convergence on non-convex loss surfaces, reaching a 99.72% accuracy benchmark on medical image datasets.
`,
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80"
  },
  {
    _id: "blog-3",
    title: "Building High-Performance Async AI Applications with FastAPI",
    summary: "How to architect low-latency python APIs with FastAPI, Motor async MongoDB driver, and non-blocking model inference.",
    category: "Backend",
    read_time: "6 min read",
    content: `
# Building High-Performance Async AI Microservices with FastAPI

FastAPI provides native async concurrency powered by Starlette and Pydantic v2.

## Key Engineering Best Practices

- **Async DB I/O**: Use Motor (\`motor.motor_asyncio\`) to ensure database queries never block the event loop.
- **Worker Thread Pools**: Offload heavy CPU-bound matrix transformations or PyTorch model invocations to background worker thread pools using \`run_in_threadpool\`.
- **JWT & Pydantic Validation**: Strict schema validation ensures zero runtime type crashes.
`,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
  }
];

const BlogGrid = () => {
  const [blogs, setBlogs] = useState(DEFAULT_BLOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingBlog, setReadingBlog] = useState(null);

  useEffect(() => {
    const loadBlogs = async () => {
      const data = await fetchBlogs();
      if (data && data.length > 0) {
        setBlogs(data);
      }
    };
    loadBlogs();
  }, []);

  const categories = ['All', 'Medical AI', 'Deep Learning', 'Backend'];

  const filteredBlogs = blogs.filter(b => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="blogs" className="relative py-20 bg-cyber-bg/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyber-purple/30 text-xs font-mono text-cyber-purple">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Technical Writings & Articles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
            AI & Engineering <span className="gradient-text">Publications</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-sans">
            In-depth technical articles exploring neural architectures, optimization mathematics, and backend engineering.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="max-w-3xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyber-blue" />
            <input
              type="text"
              placeholder="Search technical articles by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl glass-panel border border-cyber-blue/20 focus:border-cyber-blue text-sm text-white placeholder-gray-500 font-sans focus:outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all border ${
                  selectedCategory === cat
                    ? 'bg-cyber-purple/20 text-cyber-purple border-cyber-purple/50 shadow-md'
                    : 'bg-cyber-card/60 text-gray-400 border-cyber-blue/10 hover:border-cyber-blue/30 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredBlogs.map((blog, index) => (
            <motion.div
              key={blog._id || blog.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group glass-panel rounded-2xl border border-cyber-blue/15 hover:border-cyber-blue/40 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-44 overflow-hidden bg-cyber-card">
                <img
                  src={blog.image || 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80'}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg via-transparent to-transparent" />
                
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-cyber-bg/80 backdrop-blur-md border border-cyber-purple/40 text-[11px] font-mono text-cyber-purple">
                  {blog.category}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
                    <Clock className="w-3.5 h-3.5 text-cyber-blue" />
                    <span>{blog.read_time || '5 min read'}</span>
                  </div>

                  <h3
                    onClick={() => setReadingBlog(blog)}
                    className="text-lg font-bold font-mono text-white group-hover:text-cyber-blue transition-colors cursor-pointer leading-snug line-clamp-2"
                  >
                    {blog.title}
                  </h3>

                  <p className="text-gray-300 text-xs leading-relaxed line-clamp-3 font-sans">
                    {blog.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-cyber-blue/10 flex items-center justify-between">
                  <button
                    onClick={() => setReadingBlog(blog)}
                    className="text-xs font-mono font-semibold text-cyber-blue hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      {readingBlog && (
        <BlogReaderModal
          blog={readingBlog}
          onClose={() => setReadingBlog(null)}
        />
      )}
    </section>
  );
};

export default BlogGrid;
