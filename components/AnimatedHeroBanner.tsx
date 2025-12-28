"use client";

import { motion } from "framer-motion";

export default function AnimatedHeroBanner() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Animated Grid Background - Similar to University Page */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        
        {/* Glowing Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
      </div>

      {/* Subtle Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`
          }}
        />
      ))}

      {/* Modern 3D Rocket - Clean and Professional */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          {/* 3D Rocket Container */}
          <motion.div
            animate={{
              y: [-8, -15, -8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            {/* Rocket SVG - Professional Design */}
            <svg width="200" height="300" viewBox="0 0 200 300" className="drop-shadow-2xl">
              <defs>
                <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#b91c1c" />
                </linearGradient>
                <linearGradient id="rocketHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fca5a5" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="window">
                  <stop offset="0%" stopColor="#60a5fa" />
                  <stop offset="100%" stopColor="#1e40af" />
                </radialGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Nose Cone */}
              <path d="M 100 20 L 70 80 L 130 80 Z" fill="url(#rocketBody)" filter="url(#glow)"/>
              
              {/* Main Body */}
              <rect x="70" y="80" width="60" height="120" fill="url(#rocketBody)" rx="5"/>
              
              {/* Body Highlight */}
              <rect x="70" y="80" width="20" height="120" fill="url(#rocketHighlight)" opacity="0.5" rx="5"/>
              
              {/* Window */}
              <motion.circle
                cx="100"
                cy="110"
                r="18"
                fill="url(#window)"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <circle cx="100" cy="110" r="18" fill="none" stroke="#1e40af" strokeWidth="2" opacity="0.5"/>
              
              {/* Stripe */}
              <rect x="70" y="160" width="60" height="8" fill="#fbbf24" opacity="0.9"/>
              <rect x="70" y="175" width="60" height="4" fill="#fff" opacity="0.6"/>
              
              {/* Left Fin */}
              <path d="M 70 180 L 70 200 L 45 220 L 70 200 Z" fill="#b91c1c" filter="url(#glow)"/>
              
              {/* Right Fin */}
              <path d="M 130 180 L 130 200 L 155 220 L 130 200 Z" fill="#991b1b" filter="url(#glow)"/>
            </svg>

            {/* Exhaust Fire - Clean Animation */}
            <motion.div
              animate={{
                scaleY: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-20"
            >
              <svg width="80" height="100" viewBox="0 0 80 100" className="drop-shadow-lg">
                <defs>
                  <linearGradient id="flame" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                <ellipse cx="40" cy="15" rx="25" ry="35" fill="url(#flame)"/>
                <ellipse cx="40" cy="15" rx="15" ry="25" fill="#fef3c7" opacity="0.7"/>
              </svg>
            </motion.div>

            {/* Subtle Smoke Trail */}
            <motion.div
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scaleY: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-16 h-32 bg-gradient-to-b from-gray-400/20 to-transparent rounded-full blur-xl"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Text */}
      <div className="absolute bottom-16 left-0 right-0 text-center z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-4"
          style={{ 
            textShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
            letterSpacing: '-0.02em'
          }}
        >
          AI Trading Analysis
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-xl md:text-2xl text-blue-200 font-light"
        >
          Upload Your Chart • Get Instant Insights
        </motion.p>
      </div>

      {/* Minimal Accent Elements */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity
        }}
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full blur-sm"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1
        }}
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-purple-400 rounded-full blur-sm"
      />
    </div>
  );
}
