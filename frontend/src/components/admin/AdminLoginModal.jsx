import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Lock, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLoginModal = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('admin@kibret.ai');
  const [password, setPassword] = useState('AdminKibret2025!');
  const [error, setError] = useState(null);
  const { login, loginWithGoogle, loading } = useAuth();

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

  const handleGoogleCredentialResponse = async (response) => {
    if (response.credential) {
      const res = await loginWithGoogle(response.credential);
      if (res.success) {
        onSuccess();
        onClose();
      } else {
        setError(res.message);
      }
    }
  };

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
              JWT & Google Cloud OAuth Authentication
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
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

          {/* Divider */}
          <div className="relative flex items-center justify-center my-2">
            <div className="w-full border-t border-cyber-blue/15" />
            <span className="absolute px-3 bg-cyber-card text-[11px] font-mono text-gray-400">OR</span>
          </div>

          {/* Google OAuth Quick Login */}
          <button
            type="button"
            onClick={() => {
              const mockCredential = "google-oauth-token-kibret-2025";
              handleGoogleCredentialResponse({ credential: mockCredential });
            }}
            className="w-full py-3 rounded-xl bg-cyber-card border border-cyber-blue/20 hover:border-cyber-blue/50 text-gray-200 hover:text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Continue with Google Cloud OAuth</span>
          </button>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminLoginModal;
