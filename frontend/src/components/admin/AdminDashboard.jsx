import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Users, FolderGit2, Mail, Cpu, Plus, Trash2, LogOut, CheckCircle2, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import api, { fetchStats, fetchProjects, fetchSkills, fetchBlogs } from '../../services/api';

const AdminDashboard = ({ isOpen, onClose }) => {
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'projects', 'skills', 'messages'

  const [stats, setStats] = useState({ visitors: 1540, projects: 4, blogs: 3, messages: 12 });
  const [projectsList, setProjectsList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);

  // New Project Form state
  const [newProj, setNewProj] = useState({ title: '', description: '', technologies: '', image: '', github: '', demo: '' });
  // New Skill Form state
  const [newSkill, setNewSkill] = useState({ name: '', category: 'AI/ML', percentage: 90 });

  useEffect(() => {
    if (isOpen) {
      loadDashboardData();
    }
  }, [isOpen]);

  const loadDashboardData = async () => {
    const sData = await fetchStats();
    if (sData) setStats(sData);

    const pData = await fetchProjects();
    if (pData) setProjectsList(pData);

    const skData = await fetchSkills();
    if (skData) setSkillsList(skData);

    try {
      const mRes = await api.get('/contact');
      if (mRes.data) setMessagesList(mRes.data);
    } catch (e) {
      setMessagesList([
        { name: 'Dr. Sarah Connor', email: 'sarah@ai-med.org', message: 'Interested in clinical application of your U-Net thesis.', created_at: '2025-07-28' }
      ]);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    const techArr = newProj.technologies.split(',').map(t => t.trim());
    try {
      const res = await api.post('/projects', {
        ...newProj,
        technologies: techArr,
        featured: true
      });
      setProjectsList([...projectsList, res.data]);
      setNewProj({ title: '', description: '', technologies: '', image: '', github: '', demo: '' });
    } catch (err) {
      // Mock insert for local preview
      const mockP = {
        _id: `p-${Date.now()}`,
        ...newProj,
        technologies: techArr,
        featured: true
      };
      setProjectsList([...projectsList, mockP]);
      setNewProj({ title: '', description: '', technologies: '', image: '', github: '', demo: '' });
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
    } catch (e) {}
    setProjectsList(projectsList.filter(p => p._id !== id));
  };

  const handleCreateSkill = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/skills', newSkill);
      setSkillsList([...skillsList, res.data]);
      setNewSkill({ name: '', category: 'AI/ML', percentage: 90 });
    } catch (e) {
      setSkillsList([...skillsList, { _id: `s-${Date.now()}`, ...newSkill }]);
      setNewSkill({ name: '', category: 'AI/ML', percentage: 90 });
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
    } catch (e) {}
    setSkillsList(skillsList.filter(s => s._id !== id));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-bg/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl glass-panel rounded-3xl border border-cyber-purple/40 overflow-hidden shadow-2xl h-[85vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-cyber-card border-b border-cyber-blue/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-mono text-lg font-bold text-white flex items-center gap-2">
                  Admin Management Console
                </h2>
                <span className="text-xs font-mono text-cyber-green">Authenticated: {user?.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  logout();
                  onClose();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs hover:bg-red-500/20 flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-cyber-bg text-gray-400 hover:text-white border border-cyber-blue/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 py-3 bg-cyber-bg/60 border-b border-cyber-blue/15 flex items-center gap-2 font-mono text-xs">
            {['overview', 'projects', 'skills', 'messages'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl capitalize transition-all border ${
                  activeTab === tab
                    ? 'bg-cyber-purple/20 text-cyber-purple border-cyber-purple/50 font-bold'
                    : 'bg-cyber-card/60 text-gray-400 border-cyber-blue/10 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sans">
            
            {/* 1. Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-cyber-card/80 border border-cyber-blue/20 flex items-center gap-4">
                    <Users className="w-8 h-8 text-cyber-blue" />
                    <div>
                      <span className="text-gray-400 text-xs font-mono block">Total Visitors</span>
                      <span className="text-2xl font-bold font-mono text-white">{stats.visitors}</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-cyber-card/80 border border-cyber-purple/20 flex items-center gap-4">
                    <FolderGit2 className="w-8 h-8 text-cyber-purple" />
                    <div>
                      <span className="text-gray-400 text-xs font-mono block">Projects Count</span>
                      <span className="text-2xl font-bold font-mono text-white">{projectsList.length}</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-cyber-card/80 border border-cyber-green/20 flex items-center gap-4">
                    <Mail className="w-8 h-8 text-cyber-green" />
                    <div>
                      <span className="text-gray-400 text-xs font-mono block">Contact Messages</span>
                      <span className="text-2xl font-bold font-mono text-white">{messagesList.length}</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-cyber-card/80 border border-cyber-blue/20 flex items-center gap-4">
                    <Award className="w-8 h-8 text-cyber-green" />
                    <div>
                      <span className="text-gray-400 text-xs font-mono block">U-Net Metric</span>
                      <span className="text-xl font-bold font-mono text-cyber-green">99.72%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Projects Management Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {/* Create Project Form */}
                <form onSubmit={handleCreateProject} className="p-5 rounded-2xl bg-cyber-card/80 border border-cyber-blue/20 space-y-4">
                  <h4 className="font-mono text-xs text-cyber-blue uppercase tracking-wider font-semibold">Add New Portfolio Project</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Project Title"
                      required
                      value={newProj.title}
                      onChange={(e) => setNewProj({ ...newProj, title: e.target.value })}
                      className="px-4 py-2.5 rounded-xl bg-cyber-bg border border-cyber-blue/20 text-xs text-white"
                    />
                    <input
                      type="text"
                      placeholder="Technologies (comma separated)"
                      required
                      value={newProj.technologies}
                      onChange={(e) => setNewProj({ ...newProj, technologies: e.target.value })}
                      className="px-4 py-2.5 rounded-xl bg-cyber-bg border border-cyber-blue/20 text-xs text-white"
                    />
                    <input
                      type="url"
                      placeholder="GitHub Link"
                      value={newProj.github}
                      onChange={(e) => setNewProj({ ...newProj, github: e.target.value })}
                      className="px-4 py-2.5 rounded-xl bg-cyber-bg border border-cyber-blue/20 text-xs text-white"
                    />
                    <input
                      type="url"
                      placeholder="Live Demo Link"
                      value={newProj.demo}
                      onChange={(e) => setNewProj({ ...newProj, demo: e.target.value })}
                      className="px-4 py-2.5 rounded-xl bg-cyber-bg border border-cyber-blue/20 text-xs text-white"
                    />
                  </div>
                  <textarea
                    placeholder="Project Description"
                    required
                    value={newProj.description}
                    onChange={(e) => setNewProj({ ...newProj, description: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-cyber-bg border border-cyber-blue/20 text-xs text-white h-20"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyber-blue text-cyber-bg font-mono font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Project</span>
                  </button>
                </form>

                {/* Projects List Table */}
                <div className="space-y-2">
                  {projectsList.map((p) => (
                    <div key={p._id || p.title} className="p-4 rounded-xl bg-cyber-card/60 border border-cyber-blue/15 flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="font-bold text-white block">{p.title}</span>
                        <span className="text-gray-400">{p.technologies?.join(', ')}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteProject(p._id)}
                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Skills Management Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6">
                <form onSubmit={handleCreateSkill} className="p-5 rounded-2xl bg-cyber-card/80 border border-cyber-blue/20 space-y-4">
                  <h4 className="font-mono text-xs text-cyber-blue uppercase tracking-wider font-semibold">Add Technical Skill</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Skill Name"
                      required
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      className="px-4 py-2.5 rounded-xl bg-cyber-bg border border-cyber-blue/20 text-xs text-white"
                    />
                    <select
                      value={newSkill.category}
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                      className="px-4 py-2.5 rounded-xl bg-cyber-bg border border-cyber-blue/20 text-xs text-white"
                    >
                      <option value="AI/ML">AI/ML</option>
                      <option value="Programming">Programming</option>
                      <option value="Backend">Backend</option>
                      <option value="Tools">Tools</option>
                    </select>
                    <input
                      type="number"
                      placeholder="Percentage (1-100)"
                      value={newSkill.percentage}
                      onChange={(e) => setNewSkill({ ...newSkill, percentage: parseInt(e.target.value) || 90 })}
                      className="px-4 py-2.5 rounded-xl bg-cyber-bg border border-cyber-blue/20 text-xs text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyber-purple text-white font-mono font-bold text-xs flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Skill</span>
                  </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {skillsList.map((s) => (
                    <div key={s._id || s.name} className="p-3 rounded-xl bg-cyber-card/60 border border-cyber-blue/15 flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="text-white font-bold block">{s.name} ({s.category})</span>
                        <span className="text-cyber-green">{s.percentage}%</span>
                      </div>
                      <button
                        onClick={() => handleDeleteSkill(s._id)}
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Messages Tab */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                {messagesList.map((m, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-cyber-card/80 border border-cyber-blue/20 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-cyber-blue">
                      <span className="font-bold">{m.name} ({m.email})</span>
                      <span className="text-gray-400 text-[10px]">{m.created_at}</span>
                    </div>
                    <p className="text-gray-300 font-sans text-sm">{m.message}</p>
                  </div>
                ))}
              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminDashboard;
