"use client";

import { motion } from "framer-motion";

export default function AnimatedHeroBanner() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A]">
      {/* Galaxy Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Animated Stars */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute w-0.5 h-0.5 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        />
      ))}

      {/* Shooting Stars */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`shoot-${i}`}
          animate={{
            x: ["-10%", "110%"],
            y: ["0%", "50%"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 2,
            ease: "easeOut"
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${20 + i * 15}%`,
            boxShadow: "0 0 20px 2px rgba(255, 255, 255, 0.8), -100px 0 20px 10px rgba(255, 255, 255, 0.3)"
          }}
        />
      ))}

      {/* Flying Asteroids/Rocks */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`rock-${i}`}
          animate={{
            x: i % 2 === 0 ? ["-10%", "110%"] : ["110%", "-10%"],
            y: [Math.random() * 100, Math.random() * 100],
            rotate: [0, 360]
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "linear"
          }}
          className="absolute text-2xl opacity-60"
          style={{
            top: `${10 + i * 15}%`,
            filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.5))"
          }}
        >
          🪨
        </motion.div>
      ))}

      {/* Glowing Orbs - Gold and Blue */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-1/4 w-96 h-96 bg-[#FFD700]/20 rounded-full blur-3xl"
      />
        <motion.div
          animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
      />

      {/* Modern 3D Rocket */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{
              y: [-8, -15, -8],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative flex flex-col items-center"
          >
            {/* Rocket SVG */}
            <svg width="200" height="300" viewBox="0 0 200 300" className="drop-shadow-2xl relative z-10">
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
              
              <path d="M 100 20 L 70 80 L 130 80 Z" fill="url(#rocketBody)" filter="url(#glow)"/>
              <rect x="70" y="80" width="60" height="120" fill="url(#rocketBody)" rx="5"/>
              <rect x="70" y="80" width="20" height="120" fill="url(#rocketHighlight)" opacity="0.5" rx="5"/>
              
              <motion.circle
                cx="100"
                cy="110"
                r="18"
                fill="url(#window)"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <circle cx="100" cy="110" r="18" fill="none" stroke="#1e40af" strokeWidth="2" opacity="0.5"/>
              
              <rect x="70" y="160" width="60" height="8" fill="#fbbf24" opacity="0.9"/>
              <rect x="70" y="175" width="60" height="4" fill="#fff" opacity="0.6"/>
              
              <path d="M 70 180 L 70 200 L 45 220 L 70 200 Z" fill="#b91c1c" filter="url(#glow)"/>
              <path d="M 130 180 L 130 200 L 155 220 L 130 200 Z" fill="#991b1b" filter="url(#glow)"/>
            </svg>

            {/* Exhaust Fire - UNDER the rocket */}
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
              className="absolute top-[280px] left-1/2 -translate-x-1/2 w-20 z-0"
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
              className="absolute top-[350px] left-1/2 -translate-x-1/2 w-16 h-32 bg-gradient-to-b from-gray-400/20 to-transparent rounded-full blur-xl"
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
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#FFD700] via-white to-[#60a5fa] bg-clip-text text-transparent mb-4"
          style={{ 
            textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
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
}
