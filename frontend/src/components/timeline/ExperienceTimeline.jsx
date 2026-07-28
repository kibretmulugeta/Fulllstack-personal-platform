import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Brain, Activity, Briefcase, Calendar } from 'lucide-react';

const timelineEvents = [
  {
    year: '2025 - Present',
    title: 'AI Research & Machine Learning Engineer',
    subtitle: 'Independent Research & Open-Source Development',
    description: 'Engineering high-performance medical AI segmentation tools, full-stack FastAPI microservices, and specialized RAG LLM agents.',
    icon: <Brain className="w-5 h-5 text-cyber-green" />,
    badge: 'Current Focus',
    badgeColor: 'border-cyber-green/50 text-cyber-green bg-cyber-green/10'
  },
  {
    year: '2025',
    title: 'MSc in Artificial Intelligence & Data Engineering',
    subtitle: 'Bahir Dar University',
    description: 'Completed MSc degree with research thesis focused on "Reward-Driven Neural Plasticity Inspired Optimization for Enhancing U-Net Based Medical Image Segmentation".',
    icon: <GraduationCap className="w-5 h-5 text-cyber-purple" />,
    badge: 'MSc Degree',
    badgeColor: 'border-cyber-purple/50 text-cyber-purple bg-cyber-purple/10'
  },
  {
    year: '2023 - 2024',
    title: 'Full-Stack Software Engineering & Machine Learning',
    subtitle: 'Project & Platform Architectures',
    description: 'Designed and deployed full-stack enterprise applications including MeetPoint Smart Scheduler, REST APIs, and responsive React web platforms.',
    icon: <Briefcase className="w-5 h-5 text-cyber-blue" />,
    badge: 'Engineering',
    badgeColor: 'border-cyber-blue/50 text-cyber-blue bg-cyber-blue/10'
  }
];

const ExperienceTimeline = () => {
  return (
    <section id="timeline" className="relative py-20 bg-cyber-bg/60">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyber-blue/30 text-xs font-mono text-cyber-blue">
            <Calendar className="w-3.5 h-3.5" />
            <span>Career Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
            Experience & <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto font-sans">
            Key academic milestones, research achievements, and engineering career highlights.
          </p>
        </div>

        {/* Vertical Animated Timeline Line */}
        <div className="relative border-l-2 border-cyber-blue/20 ml-4 md:ml-32 space-y-12 pl-6 md:pl-10">
          {timelineEvents.map((evt, index) => (
            <motion.div
              key={evt.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Dot Icon Node */}
              <div className="absolute -left-[37px] md:-left-[53px] top-1.5 w-10 h-10 rounded-full bg-cyber-bg border-2 border-cyber-blue/40 flex items-center justify-center shadow-lg shadow-cyber-blue/10 group-hover:border-cyber-blue group-hover:scale-110 transition-all">
                {evt.icon}
              </div>

              {/* Event Content Card */}
              <div className="glass-panel p-6 rounded-2xl border border-cyber-blue/15 hover:border-cyber-blue/40 transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-cyber-blue font-bold tracking-wider">
                    {evt.year}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${evt.badgeColor}`}>
                    {evt.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-mono text-white group-hover:text-cyber-blue transition-colors">
                    {evt.title}
                  </h3>
                  <h4 className="text-xs font-mono text-gray-400">
                    {evt.subtitle}
                  </h4>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed font-sans">
                  {evt.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ExperienceTimeline;
