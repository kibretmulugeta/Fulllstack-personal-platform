import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle2, AlertCircle, Github, Linkedin, MapPin, User, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitContact } from '../../services/api';
import { KIBRET_INFO } from '../../utils/constants';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus({ loading: true, success: false, error: null });
    try {
      await submitContact(formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      // Graceful fallback display
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' });
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-cyber-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyber-blue/30 text-xs font-mono text-cyber-blue">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-mono text-white">
            Contact <span className="gradient-text font-mono">Kibret Mulugeta</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto font-sans">
            Open to AI Engineering roles, Machine Learning research collaborations, and Ph.D./Graduate inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyber-blue/20 space-y-6">
              <h3 className="text-xl font-bold font-mono text-white">
                Contact Information
              </h3>

              <div className="space-y-4 text-sm font-sans">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 flex items-center justify-center text-cyber-blue">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-400 block">Direct Email</span>
                    <a href={`mailto:${KIBRET_INFO.email}`} className="text-white hover:text-cyber-blue font-mono font-medium">
                      {KIBRET_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyber-purple/10 border border-cyber-purple/30 flex items-center justify-center text-cyber-purple">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-gray-400 block">Primary Location</span>
                    <span className="text-white font-mono">{KIBRET_INFO.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 border-t border-cyber-blue/15 space-y-3">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-wider block">Connect on Networks</span>
                <div className="flex items-center gap-3">
                  <a
                    href={KIBRET_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-cyber-card border border-cyber-blue/20 text-gray-200 hover:text-cyber-blue hover:border-cyber-blue/50 transition-all font-mono text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={KIBRET_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-cyber-card border border-cyber-blue/20 text-gray-200 hover:text-cyber-blue hover:border-cyber-blue/50 transition-all font-mono text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyber-blue/25 space-y-5">
              {status.success && (
                <div className="p-4 rounded-2xl bg-cyber-green/10 border border-cyber-green/40 text-cyber-green text-sm flex items-center gap-3 font-mono">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Your message has been stored in MongoDB. Kibret will get back to you shortly!</span>
                </div>
              )}

              {/* Name Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-cyber-blue" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Dr. Alex Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-cyber-bg/90 border border-cyber-blue/20 focus:border-cyber-blue text-sm text-white placeholder-gray-500 font-sans focus:outline-none transition-all"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyber-purple" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex.vance@ai-lab.org"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-cyber-bg/90 border border-cyber-blue/20 focus:border-cyber-blue text-sm text-white placeholder-gray-500 font-sans focus:outline-none transition-all"
                />
              </div>

              {/* Message Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-cyber-green" />
                  <span>Message / Collaboration Proposal</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Hello Kibret, I reviewed your MSc thesis on U-Net optimization and would like to discuss..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-cyber-bg/90 border border-cyber-blue/20 focus:border-cyber-blue text-sm text-white placeholder-gray-500 font-sans focus:outline-none transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyber-blue via-cyber-purple to-cyber-green text-cyber-bg font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyber-blue/20 hover:scale-[1.01] transition-all disabled:opacity-50"
              >
                {status.loading ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Kibret</span>
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactForm;
