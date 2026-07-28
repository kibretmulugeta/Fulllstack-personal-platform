import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('admin@kibret.ai');
  const [password, setPassword] = useState('AdminKibret2025!');
  const [error, setError] = useState(null);
  const { login, loading } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await login(email, password);
    if (res.success) {
      onSuccess();
      onClose();
    } else {
      setError(res.message);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-bg/85 backdrop-blur-xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md glass-panel rounded-3xl border border-cyber-purple/35 p-6 sm:p-8 space-y-6 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-cyber-bg/80 border border-cyber-blue/20 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-cyber-purple/10 border border-cyber-purple/30 mx-auto flex items-center justify-center text-cyber-purple">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-mono text-white">
              Admin Portal Access
            </h3>
            <p className="text-xs text-gray-400 font-mono">
              Protected JWT Authentication Gateway
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyber-blue" />
                <span>Admin Email</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-cyber-bg border border-cyber-blue/20 focus:border-cyber-blue text-sm text-white font-sans focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-gray-300 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-cyber-purple" />
                <span>Password</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-cyber-bg border border-cyber-blue/20 focus:border-cyber-blue text-sm text-white font-sans focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyber-purple to-cyber-blue text-white font-mono font-bold text-sm shadow-lg shadow-cyber-purple/20 hover:scale-[1.01] transition-all disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Log In to Admin Panel'}
            </button>
          </form>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminLoginModal;
