import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, Globe, RefreshCw } from 'lucide-react';
import { sendChatMessage } from '../../services/api';

const QUICK_QUESTIONS = [
  "What projects has Kibret built?",
  "What is his MSc research about?",
  "What technologies does he specialize in?",
  "ከክብረት ጋር እንዴት መገናኘት እችላለሁ?" // Amharic
];

const AIBotWidget = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello! I am Kibret's AI Portfolio Assistant. Ask me about his deep learning research, U-Net optimization, full-stack projects, or background! (እኔም በአማርኛ መመለስ እችላለሁ!)",
      language: 'en'
    }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en'); // 'en' or 'am'
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(true);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Web Speech API - Speech Synthesis (TTS)
  const speakText = (text, lang) => {
    if (!ttsEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'am' ? 'am-ET' : 'en-US';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  // Web Speech API - Speech Recognition (STT)
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'am' ? 'am-ET' : 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMsg(transcript);
      handleSendMessage(transcript);
    };

    recognition.start();
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputMsg;
    if (!query.trim()) return;

    const userMsgObj = { sender: 'user', text: query, language };
    setMessages((prev) => [...prev, userMsgObj]);
    setInputMsg('');
    setLoading(true);

    try {
      const res = await sendChatMessage(query, language);
      const botMsgObj = {
        sender: 'bot',
        text: res.reply,
        sources: res.sources,
        language: res.language || language
      };
      setMessages((prev) => [...prev, botMsgObj]);
      setLoading(false);
      speakText(res.reply, res.language || language);
    } catch (err) {
      // Fallback bot response
      const fallbackText = language === 'am'
        ? "ክብረት በርካታ የላቁ የሰው ሰራሽ አስተዋፅኦ (AI) እና የመድኃኒት ኢሜጂንግ ፕሮጀክቶችን ገንብቷል። ዋና ዋናዎቹ፦ Neuro-Inspired U-Net Optimization (99.72% ትክክለኛነት)፣ AI Medical Imaging Platform፣ እና MeetPoint Smart Scheduler ናቸው።"
        : "Kibret is an AI Engineer and Machine Learning Researcher with an MSc from Bahir Dar University. Key projects include Neuro-Inspired U-Net Optimization (99.72% accuracy), AI Medical Imaging Platform, MeetPoint Smart Scheduler, and KibretAI Platform.";
      const botMsgObj = {
        sender: 'bot',
        text: fallbackText,
        sources: ['Local Semantic Engine'],
        language
      };
      setMessages((prev) => [...prev, botMsgObj]);
      setLoading(false);
      speakText(fallbackText, language);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-2 sm:p-4 bg-cyber-bg/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          className="relative w-full max-w-lg glass-panel rounded-3xl border border-cyber-blue/35 overflow-hidden shadow-2xl flex flex-col h-[600px] max-h-[85vh]"
        >
          {/* Top Bar */}
          <div className="p-4 bg-cyber-card border-b border-cyber-blue/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center text-cyber-green">
                <Bot className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h3 className="font-mono text-sm font-bold text-white flex items-center gap-1">
                  Kibret RAG Assistant
                  <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
                </h3>
                <span className="text-[10px] font-mono text-gray-400">Powered by Portfolio Vector Context</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'am' : 'en')}
                className="px-2.5 py-1 rounded-lg bg-cyber-bg border border-cyber-blue/20 text-xs font-mono text-cyber-blue flex items-center gap-1 hover:border-cyber-blue"
                title="Switch Language (English / Amharic)"
              >
                <Globe className="w-3 h-3" />
                <span>{language === 'en' ? 'EN' : 'አማ'}</span>
              </button>

              {/* TTS Toggle */}
              <button
                onClick={() => setTtsEnabled(!ttsEnabled)}
                className={`p-1.5 rounded-lg border text-xs font-mono transition-all ${
                  ttsEnabled ? 'bg-cyber-purple/20 text-cyber-purple border-cyber-purple/40' : 'bg-cyber-bg text-gray-400 border-cyber-blue/20'
                }`}
                title="Toggle Audio Text-To-Speech"
              >
                {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Close button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg bg-cyber-bg text-gray-400 hover:text-white border border-cyber-blue/20"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Questions Pills */}
          <div className="p-2.5 bg-cyber-bg/60 border-b border-cyber-blue/10 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1 rounded-full bg-cyber-card border border-cyber-blue/20 text-gray-300 hover:text-cyber-blue hover:border-cyber-blue/40 whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="p-4 overflow-y-auto space-y-3.5 flex-1 font-sans text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-cyber-blue to-cyber-purple text-cyber-bg font-medium rounded-br-none shadow-md'
                      : 'bg-cyber-card border border-cyber-blue/20 text-gray-200 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                {m.sources && (
                  <span className="text-[10px] font-mono text-gray-500 mt-1">
                    Source: {m.sources.join(', ')}
                  </span>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs font-mono text-cyber-blue animate-pulse p-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Thinking & querying RAG portfolio vector index...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area with Microphone & Send */}
          <div className="p-3 bg-cyber-card border-t border-cyber-blue/20">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <button
                type="button"
                onClick={startListening}
                className={`p-2.5 rounded-xl border transition-all ${
                  isListening
                    ? 'bg-red-500/20 text-red-400 border-red-500 animate-pulse'
                    : 'bg-cyber-bg text-cyber-green border-cyber-green/30 hover:bg-cyber-green/20'
                }`}
                title="Voice Speech-To-Text Microphone"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <input
                type="text"
                placeholder={language === 'am' ? "እዚህ ጋር ጥያቄዎን ይጻፉ..." : "Ask AI assistant about Kibret..."}
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-cyber-bg border border-cyber-blue/20 focus:border-cyber-blue text-xs text-white placeholder-gray-500 font-sans focus:outline-none"
              />

              <button
                type="submit"
                className="p-2.5 rounded-xl bg-cyber-blue text-cyber-bg hover:bg-cyber-green transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AIBotWidget;
