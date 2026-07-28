import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderGit2 } from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProjectDetailModal from './ProjectDetailModal';
import { fetchProjects } from '../../services/api';

const DEFAULT_PROJECTS = [
  {
    _id: "proj-1",
    title: "Neuro-Inspired U-Net Optimization",
    description: "Reward-driven neural plasticity inspired optimization framework for medical image segmentation. Outperformed baseline ADAM/SGD on high-resolution 3D Brain MRI volumetric segmentation tasks.",
    technologies: ["Python", "TensorFlow", "U-Net", "MONAI", "Medical Imaging", "PyTorch"],
    image: "/images/unet-segmentation.png",
    github: "https://github.com/kibret-mulugeta/neuro-unet-optimization",
    demo: "https://kibret-unet-demo.vercel.app",
    featured: true,
    metrics: { accuracy: "99.72%", dice_score: "0.984", speedup: "3.4x" },
    highlights: [
      "Biological synaptic plasticity weight update formulation",
      "MONAI 3D Brain MRI pipeline integration",
      "99.72% state-of-the-art segmentation accuracy benchmark"
    ]
  },
  {
    _id: "proj-2",
    title: "AI Medical Imaging Platform",
    description: "Clinical diagnostic assistant web platform enabling real-time Brain MRI DICOM/PNG uploads, interactive U-Net segmentation overlay, voice-activated diagnostic queries, and automated patient report synthesis.",
    technologies: ["FastAPI", "React", "MONAI", "Web Speech API", "MongoDB", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/kibret-mulugeta/ai-medical-imaging-platform",
    demo: "https://medical-ai-kibret.vercel.app",
    featured: true,
    metrics: { latency: "< 450ms", modalities: "Brain MRI / CT" },
    highlights: [
      "Voice query interaction in English and Amharic",
      "Automated natural language report explanation",
      "GPU accelerated microservice inference"
    ]
  },
  {
    _id: "proj-3",
    title: "MeetPoint Smart Scheduler",
    description: "Full-stack intelligent appointment and location-aware scheduling system featuring automated calendar conflict resolution, Google Maps API routing, and SMS/Email notification microservices.",
    technologies: ["Node.js", "React", "MongoDB", "Google Maps API", "Twilio", "Docker"],
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/kibret-mulugeta/meetpoint-smart-scheduler",
    demo: "https://meetpoint-scheduler.vercel.app",
    featured: false,
    metrics: { notification_reliability: "99.9%" },
    highlights: [
      "Location-aware travel time calculation",
      "Multi-channel automated notification pipeline"
    ]
  },
  {
    _id: "proj-4",
    title: "AI Engineer Portfolio Platform",
    description: "World-class full-stack professional portfolio platform featuring dark futuristic glassmorphic UI, 3D WebGL neural brain, RAG AI assistant supporting English & Amharic voice interaction, and JWT admin control.",
    technologies: ["React", "Vite", "Three.js", "FastAPI", "Motor MongoDB", "Framer Motion", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    github: "https://github.com/kibret-mulugeta/kibret-ai-portfolio",
    demo: "https://kibret.ai",
    featured: true,
    metrics: { lighthouse_performance: "100/100" },
    highlights: [
      "RAG AI chatbot trained on Kibret's research & code",
      "3D WebGL particle neural brain canvas",
      "Complete Admin CMS dashboard"
    ]
  }
];

const ProjectGrid = () => {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      if (data && data.length > 0) {
        setProjects(data);
      }
    };
    loadProjects();
  }, []);

  return (
    <section id="projects" className="relative py-20 bg-cyber-bg/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyber-green/30 text-xs font-mono text-cyber-green">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Portfolio Artifacts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
            Engineering & <span className="gradient-text">Research Projects</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto font-sans">
            Real-world systems combining neural network research, medical image segmentation algorithms, and full-stack backend infrastructure.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project._id || project.title}
              project={project}
              onOpenDetail={(p) => setSelectedProject(p)}
            />
          ))}
        </div>

      </div>

      {/* Modal View */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default ProjectGrid;
