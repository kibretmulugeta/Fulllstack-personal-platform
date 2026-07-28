import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import NeuralBackground from './components/common/NeuralBackground';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Hero from './components/home/Hero';
import AboutSection from './components/about/AboutSection';
import SkillsGrid from './components/skills/SkillsGrid';
import ProjectGrid from './components/projects/ProjectGrid';
import ResearchShowcase from './components/research/ResearchShowcase';
import ExperienceTimeline from './components/timeline/ExperienceTimeline';
import BlogGrid from './components/blogs/BlogGrid';
import ContactForm from './components/contact/ContactForm';

import AIBotWidget from './components/ai-assistant/AIBotWidget';
import AdminLoginModal from './components/admin/AdminLoginModal';
import AdminDashboard from './components/admin/AdminDashboard';
import api from './services/api';

const AppContent = () => {
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Track visitor analytics
    try {
      api.post('/analytics/track', { page: window.location.pathname });
    } catch (e) {}
  }, []);

  const handleOpenAdmin = () => {
    if (isAuthenticated) {
      setAdminDashboardOpen(true);
    } else {
      setAdminLoginOpen(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-cyber-bg text-gray-100 selection:bg-cyber-blue/30 font-sans overflow-x-hidden">
      {/* Dynamic Animated Particle Mesh Background */}
      <NeuralBackground />

      {/* Top Glassmorphic Navigation */}
      <Navbar
        onOpenAdmin={handleOpenAdmin}
        onOpenAIChat={() => setAiChatOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero />
        <AboutSection />
        <SkillsGrid />
        <ProjectGrid />
        <ResearchShowcase />
        <ExperienceTimeline />
        <BlogGrid />
        <ContactForm />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* RAG AI Portfolio Assistant Chat Widget */}
      <AIBotWidget
        isOpen={aiChatOpen}
        onClose={() => setAiChatOpen(false)}
      />

      {/* Protected Admin Access Modals */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onSuccess={() => setAdminDashboardOpen(true)}
      />

      <AdminDashboard
        isOpen={adminDashboardOpen}
        onClose={() => setAdminDashboardOpen(false)}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
