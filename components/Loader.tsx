// /components/Loader.tsx
"use client";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="relative flex flex-col items-center justify-center py-16 overflow-hidden">
      {/* Animated Galaxy Background */}
      <div className="absolute inset-0 bg-gradient-radial from-[#FFD700]/5 via-transparent to-transparent opacity-50" />
      
      {/* Flying Stars */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{ x: -100, y: Math.random() * 400, opacity: 0 }}
          animate={{ 
            x: 1000, 
            y: Math.random() * 400,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "linear"
          }}
        />
      ))}
      
      {/* 3D Rocket with Flame */}
      <div className="relative w-64 h-64 mb-8">
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            rotate: [-5, 5, -5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          {/* Rocket SVG */}
          <svg width="120" height="180" viewBox="0 0 120 180" className="relative z-10 mx-auto filter drop-shadow-2xl">
            <defs>
              <linearGradient id="rocketBody" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="50%" stopColor="#9ca3af" />
                <stop offset="100%" stopColor="#6b7280" />
              </linearGradient>
              <radialGradient id="rocketWindow">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#1e40af" />
              </radialGradient>
              <linearGradient id="rocketFin" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>
            </defs>
            
            {/* Rocket Nose */}
            <path d="M 60 10 L 75 40 L 45 40 Z" fill="url(#rocketFin)" />
            
            {/* Rocket Body */}
            <rect x="45" y="40" width="30" height="80" rx="5" fill="url(#rocketBody)" />
            
            {/* Window */}
            <circle cx="60" cy="60" r="12" fill="url(#rocketWindow)" opacity="0.9" />
            <circle cx="60" cy="60" r="8" fill="#93c5fd" opacity="0.6" />
            
            {/* Gold Stripe */}
            <rect x="45" y="90" width="30" height="6" fill="#FFD700" opacity="0.9" />
            
            {/* Fins */}
            <path d="M 45 120 L 30 150 L 45 140 Z" fill="url(#rocketFin)" />
            <path d="M 75 120 L 90 150 L 75 140 Z" fill="url(#rocketFin)" />
          </svg>
          
          {/* Rocket Flame */}
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: "175px" }}
            animate={{
              scaleY: [1, 1.4, 1],
              scaleX: [1, 1.15, 1]
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="70" height="120" viewBox="0 0 70 120">
              <defs>
                <radialGradient id="flameGrad" cx="50%" cy="10%">
                  <stop offset="0%" stopColor="#fff" />
                  <stop offset="30%" stopColor="#fef3c7" />
                  <stop offset="60%" stopColor="#fbbf24" />
                  <stop offset="85%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path 
                d="M 35 5 Q 25 40, 15 70 Q 10 85, 15 95 Q 25 105, 35 107 Q 45 105, 55 95 Q 60 85, 55 70 Q 45 40, 35 5 Z"
                fill="url(#flameGrad)"
              />
              <ellipse cx="35" cy="15" rx="8" ry="25" fill="#fff" opacity="0.9" />
            </svg>
          </motion.div>
        </motion.div>
        
        {/* Orbit Rings */}
        <motion.div
          className="absolute inset-0 border-4 border-[#FFD700]/20 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-4 border-4 border-[#FFA500]/20 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
        />
      </div>
      
      {/* Analysis Status */}
      <div className="flex flex-col items-center gap-4 z-10">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700]"
        >
          🤖 AI ANALYZING CHART
        </motion.div>
        
        {/* Progress Dots */}
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFA500]"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
        
        {/* Status Messages */}
        <motion.div
          className="text-neutral-300 text-lg text-center space-y-1"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p>📊 Detecting patterns & structures...</p>
          <p className="text-sm text-neutral-400">🎯 Calculating risk/reward ratios...</p>
          <p className="text-sm text-neutral-400">💡 Generating trading insights...</p>
        </motion.div>
      </div>
    </div>
  );
}
