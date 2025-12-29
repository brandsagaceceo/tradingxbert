"use client";

import { motion } from "framer-motion";

export default function AnimatedHeroBanner() {
  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-gradient-to-br from-[#0A0A0A] via-[#1a1a2e] to-[#0A0A0A]">
      {/* Galaxy Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      {/* Animated Stars - MORE */}
      {[...Array(200)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.2, 0.5]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() > 0.7 ? '2px' : '1px',
            height: Math.random() > 0.7 ? '2px' : '1px',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: Math.random() > 0.8 ? '0 0 4px rgba(255,255,255,0.8)' : 'none'
          }}
        />
      ))}

      {/* Shooting Stars - MORE */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`shoot-${i}`}
          animate={{
            x: ["-10%", "110%"],
            y: ["0%", "50%"],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeOut"
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${10 + i * 8}%`,
            boxShadow: "0 0 20px 2px rgba(255, 215, 0, 0.8), -100px 0 20px 10px rgba(255, 215, 0, 0.3)"
          }}
        />
      ))}
      
      {/* Planets - Better Positioned */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`planet-${i}`}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.15, 1],
            y: [0, -10, 0]
          }}
          transition={{
            rotate: { duration: 25 + i * 5, repeat: Infinity, ease: "linear" },
            scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute rounded-full"
          style={{
            width: `${50 + i * 25}px`,
            height: `${50 + i * 25}px`,
            left: i === 0 ? '8%' : i === 1 ? '85%' : '75%',
            top: i === 0 ? '15%' : i === 1 ? '70%' : '25%',
            background: i === 0 ? 'radial-gradient(circle at 35% 35%, #ff6b6b, #c92a2a, #7f1d1d)' : 
                       i === 1 ? 'radial-gradient(circle at 35% 35%, #60a5fa, #3b82f6, #1e40af)' :
                                'radial-gradient(circle at 35% 35%, #fbbf24, #f59e0b, #d97706)',
            boxShadow: `0 0 30px ${i === 0 ? '#ff6b6b' : i === 1 ? '#60a5fa' : '#fbbf24'}, inset -5px -5px 10px rgba(0,0,0,0.3)`,
            opacity: 0.7
          }}
        />
      ))}
      
      {/* UFO - Single */}
      <motion.div
        animate={{
          x: ["-10%", "110%"],
          y: [0, -30, -15, -30, 0],
          rotate: [-8, 0, 8, 0, -8]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute text-5xl"
        style={{
          top: '25%',
          filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 1)) drop-shadow(0 0 40px rgba(139, 92, 246, 0.5))'
        }}
      >
        🛸
      </motion.div>

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

      {/* Realistic 3D Rocket with proper flame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          <motion.div
            animate={{
              y: [-10, -20, -10],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
            style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
          >
            {/* 3D Rocket SVG */}
            <svg width="250" height="400" viewBox="0 0 250 400" className="drop-shadow-2xl" style={{ filter: "drop-shadow(0 0 30px rgba(239, 68, 68, 0.6))" }}>
              <defs>
                <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7f1d1d" />
                  <stop offset="30%" stopColor="#dc2626" />
                  <stop offset="70%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#7f1d1d" />
                </linearGradient>
                <linearGradient id="rocketShadow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#000" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#000" stopOpacity="0" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
                </linearGradient>
                <radialGradient id="windowGlow">
                  <stop offset="0%" stopColor="#93c5fd" />
                  <stop offset="40%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1e3a8a" />
                </radialGradient>
                <filter id="3dEffect">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                  <feOffset dx="4" dy="4" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.5"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Nose Cone with 3D depth */}
              <path d="M 125 30 L 90 110 L 160 110 Z" fill="url(#rocketBody)" filter="url(#3dEffect)"/>
              <path d="M 125 30 L 90 110 L 125 100 Z" fill="rgba(252, 165, 165, 0.3)"/>
              
              {/* Main Body */}
              <rect x="90" y="110" width="70" height="180" fill="url(#rocketBody)" rx="8" filter="url(#3dEffect)"/>
              
              {/* 3D Highlight on body */}
              <rect x="90" y="110" width="25" height="180" fill="rgba(252, 165, 165, 0.4)" rx="8" opacity="0.6"/>
              <rect x="135" y="110" width="25" height="180" fill="url(#rocketShadow)" rx="8"/>
              
              {/* Glowing Window */}
              <motion.circle
                cx="125"
                cy="150"
                r="22"
                fill="url(#windowGlow)"
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  scale: [0.95, 1.05, 0.95]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ transformOrigin: "125px 150px" }}
              />
              <circle cx="125" cy="150" r="22" fill="none" stroke="#60a5fa" strokeWidth="3" opacity="0.8"/>
              <circle cx="125" cy="150" r="18" fill="rgba(147, 197, 253, 0.2)"/>
              
              {/* Racing Stripes */}
              <rect x="90" y="220" width="70" height="12" fill="#fbbf24" opacity="0.95"/>
              <rect x="90" y="235" width="70" height="6" fill="#fff" opacity="0.7"/>
              <rect x="90" y="245" width="70" height="12" fill="#fbbf24" opacity="0.95"/>
              
              {/* 3D Fins */}
              <path d="M 90 260 L 90 290 L 55 320 L 90 295 Z" fill="#991b1b" filter="url(#3dEffect)"/>
              <path d="M 90 260 L 55 320 L 70 310 L 90 275 Z" fill="rgba(127, 29, 29, 0.8)"/>
              
              <path d="M 160 260 L 160 290 L 195 320 L 160 295 Z" fill="#7f1d1d" filter="url(#3dEffect)"/>
              <path d="M 160 260 L 195 320 L 180 310 L 160 275 Z" fill="rgba(0, 0, 0, 0.4)"/>
            </svg>

            {/* Professional Realistic Exhaust connected to rocket */}
            <div className="absolute left-1/2 -translate-x-1/2" style={{ top: "320px" }}>
              <motion.div
                animate={{
                  scaleY: [1, 1.35, 1],
                  scaleX: [1, 1.12, 1]
                }}
                transition={{
                  duration: 0.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg width="90" height="200" viewBox="0 0 90 200" style={{ filter: "drop-shadow(0 0 20px rgba(251, 146, 60, 0.7))" }}>
                  <defs>
                    {/* Multi-layer realistic flame gradients */}
                    <radialGradient id="exhaustCore" cx="50%" cy="5%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="20%" stopColor="#fef3c7" />
                      <stop offset="45%" stopColor="#fbbf24" />
                      <stop offset="70%" stopColor="#fb923c" />
                      <stop offset="90%" stopColor="#f87171" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="exhaustInner" cx="50%" cy="8%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="35%" stopColor="#fef3c7" stopOpacity="0.9" />
                      <stop offset="70%" stopColor="#fbbf24" stopOpacity="0.75" />
                      <stop offset="100%" stopColor="#fb923c" stopOpacity="0.3" />
                    </radialGradient>
                    <radialGradient id="exhaustHot" cx="50%" cy="3%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="60%" stopColor="#ffffff" stopOpacity="0.98" />
                      <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.85" />
                    </radialGradient>
                  </defs>
                  
                  {/* Flame Base - connects to rocket nozzle */}
                  <defs>
                    <filter id="flameGlow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {/* Connection band to rocket bottom - seamless */}
                  <rect x="20" y="0" width="50" height="10" fill="url(#exhaustCore)" opacity="1"/>
                  <rect x="25" y="0" width="40" height="5" fill="#ffffff" opacity="0.9"/>
                  
                  {/* Outer flame envelope - realistic turbulent shape */}
                  <motion.path
                    d="M 25 5 Q 20 30, 15 60 Q 10 90, 12 120 Q 14 145, 18 165 Q 28 180, 45 186 Q 62 180, 72 165 Q 76 145, 78 120 Q 80 90, 75 60 Q 70 30, 65 5 Z"
                    fill="url(#exhaustCore)"
                    animate={{ 
                      opacity: [0.9, 1, 0.9],
                      d: [
                        "M 25 5 Q 20 30, 15 60 Q 10 90, 12 120 Q 14 145, 18 165 Q 28 180, 45 186 Q 62 180, 72 165 Q 76 145, 78 120 Q 80 90, 75 60 Q 70 30, 65 5 Z",
                        "M 25 5 Q 18 35, 13 65 Q 8 95, 10 125 Q 12 150, 16 170 Q 26 185, 45 188 Q 64 185, 74 170 Q 78 150, 80 125 Q 82 95, 77 65 Q 72 35, 65 5 Z",
                        "M 25 5 Q 20 30, 15 60 Q 10 90, 12 120 Q 14 145, 18 165 Q 28 180, 45 186 Q 62 180, 72 165 Q 76 145, 78 120 Q 80 90, 75 60 Q 70 30, 65 5 Z"
                      ]
                    }}
                    transition={{ duration: 0.15, repeat: Infinity }}
                    filter="url(#flameGlow)"
                  />
                  
                  {/* Inner flame - dancing effect */}
                  <motion.ellipse
                    cx="45"
                    cy="30"
                    rx="20"
                    ry="75"
                    fill="url(#exhaustInner)"
                    animate={{ 
                      opacity: [0.9, 1, 0.9],
                      ry: [75, 80, 75],
                      rx: [20, 22, 20]
                    }}
                    transition={{ duration: 0.12, repeat: Infinity, delay: 0.03 }}
                    filter="url(#flameGlow)"
                  />
                  
                  {/* White hot core */}
                  <motion.ellipse
                    cx="45"
                    cy="20"
                    rx="12"
                    ry="40"
                    fill="url(#exhaustHot)"
                    animate={{ 
                      opacity: [0.95, 1, 0.95],
                      ry: [40, 45, 40]
                    }}
                    transition={{ duration: 0.1, repeat: Infinity, delay: 0.05 }}
                  />
                  
                  {/* Ultra bright center - pulsing */}
                  <motion.ellipse 
                    cx="45" 
                    cy="15" 
                    rx="6" 
                    ry="20" 
                    fill="#ffffff" 
                    animate={{
                      opacity: [0.98, 1, 0.98],
                      ry: [20, 23, 20]
                    }}
                    transition={{ duration: 0.08, repeat: Infinity }}
                  />
                </svg>
              </motion.div>
            </div>

            {/* Enhanced Smoke Trail */}
            <motion.div
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scaleY: [1, 1.4, 1],
                scaleX: [0.9, 1.3, 0.9]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: "520px" }}
            >
              <div className="w-36 h-56 bg-gradient-to-b from-gray-200/35 via-gray-300/20 to-transparent rounded-full blur-3xl" />
            </motion.div>

            {/* Particle effects */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                animate={{
                  y: [0, 80 + i * 10],
                  x: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 50],
                  opacity: [0.8, 0],
                  scale: [1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.12,
                  ease: "easeOut"
                }}
                className="absolute w-1.5 h-1.5 rounded-full"
                style={{
                  left: "50%",
                  top: "400px",
                  backgroundColor: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#f97316' : '#ef4444',
                  boxShadow: '0 0 8px currentColor'
                }}
              />
            ))}
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
    </div>
  );
}
