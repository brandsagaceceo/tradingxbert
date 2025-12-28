"use client";

import { motion } from "framer-motion";

export default function AnimatedHeroBanner() {
  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0A]">
      {/* Stock Market Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #FFD700 1px, transparent 1px),
            linear-gradient(to bottom, #FFD700 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Animated Stock Chart Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <motion.path
          d="M0,400 Q200,300 400,350 T800,280 L800,600 L0,600 Z"
          fill="url(#gradient1)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M0,450 Q300,380 600,400 T1200,350"
          stroke="#00FF00"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating Stock Tickers */}
      {['📈', '💹', '💰', '🎯', '⚡'].map((icon, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5
          }}
          className="absolute text-4xl"
          style={{
            left: `${15 + i * 18}%`,
            top: `${60 + (i % 2) * 20}%`
          }}
        >
          {icon}
        </motion.div>
      ))}

      {/* 3D Realistic Rocket Taking Off */}
      <div className="absolute inset-0 flex items-center justify-center pt-10">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Rocket Body - 3D Effect with Multiple Layers */}
          <motion.div
            animate={{
              y: [-10, -40, -10],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            {/* Rocket Structure */}
            <div className="relative w-32 h-64 md:w-40 md:h-80">
              {/* Nose Cone */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[40px] md:border-l-[50px] border-r-[40px] md:border-r-[50px] border-b-[60px] md:border-b-[80px] border-l-transparent border-r-transparent border-b-[#E63946]"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(230, 57, 70, 0.8))',
                  background: 'linear-gradient(to bottom, #FF6B6B, #E63946)'
                }}
              />
              
              {/* Main Body with 3D shading */}
              <div className="absolute top-[60px] md:top-[80px] left-1/2 -translate-x-1/2 w-20 md:w-24 h-32 md:h-40 rounded-t-lg"
                style={{
                  background: 'linear-gradient(to right, #FF6B6B 0%, #E63946 50%, #CC2936 100%)',
                  boxShadow: `
                    inset -10px 0 20px rgba(0,0,0,0.4),
                    inset 10px 0 20px rgba(255,255,255,0.2),
                    0 0 40px rgba(230, 57, 70, 0.6)
                  `
                }}
              >
                {/* Window */}
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-6 left-1/2 -translate-x-1/2 w-8 md:w-10 h-8 md:h-10 rounded-full bg-gradient-to-br from-[#4ECDC4] to-[#1A535C]"
                  style={{
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5), 0 0 20px rgba(78, 205, 196, 0.8)'
                  }}
                />
                
                {/* Stripes */}
                <div className="absolute top-20 md:top-24 left-0 right-0 h-3 bg-[#FFD700]"
                  style={{ boxShadow: '0 2px 10px rgba(255, 215, 0, 0.6)' }}
                />
                <div className="absolute top-28 md:top-32 left-0 right-0 h-2 bg-white opacity-80" />
              </div>

              {/* Fins - 3D effect */}
              <div className="absolute bottom-8 left-0 w-0 h-0 border-t-[40px] md:border-t-[50px] border-r-[30px] md:border-r-[35px] border-t-[#CC2936] border-r-transparent"
                style={{
                  filter: 'drop-shadow(-5px 5px 10px rgba(0,0,0,0.5))',
                  transform: 'translateX(-25px)'
                }}
              />
              <div className="absolute bottom-8 right-0 w-0 h-0 border-t-[40px] md:border-t-[50px] border-l-[30px] md:border-l-[35px] border-t-[#A01A2A] border-l-transparent"
                style={{
                  filter: 'drop-shadow(5px 5px 10px rgba(0,0,0,0.5))',
                  transform: 'translateX(25px)'
                }}
              />
            </div>

            {/* Exhaust Fire - Multi-layer realistic flames */}
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.9, 1, 0.9]
              }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -bottom-16 left-1/2 -translate-x-1/2"
            >
              {/* Outer flame - orange */}
              <div className="relative w-24 h-32 md:w-28 md:h-40"
                style={{
                  background: 'radial-gradient(ellipse at center top, #FF6B1A 0%, #FF4500 40%, transparent 70%)',
                  filter: 'blur(8px)',
                  opacity: 0.8
                }}
              />
              
              {/* Middle flame - yellow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-28 md:w-20 md:h-36"
                style={{
                  background: 'radial-gradient(ellipse at center top, #FFD700 0%, #FFA500 50%, transparent 70%)',
                  filter: 'blur(4px)'
                }}
              />
              
              {/* Inner flame - white hot */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-20 md:w-12 md:h-24"
                style={{
                  background: 'radial-gradient(ellipse at center top, #FFFFFF 0%, #FFD700 60%, transparent 80%)',
                  filter: 'blur(2px)'
                }}
              />
            </motion.div>

            {/* Smoke Trail */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.5, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut"
              }}
              className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-20 h-40"
              style={{
                background: 'radial-gradient(ellipse at top, rgba(255,255,255,0.4) 0%, transparent 70%)',
                filter: 'blur(15px)'
              }}
            />
          </motion.div>

          {/* Launch Particles */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, 100],
                x: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 60],
                opacity: [1, 0],
                scale: [1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeOut"
              }}
              className="absolute -bottom-10 left-1/2 w-2 h-2 rounded-full"
              style={{
                backgroundColor: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FF6B1A' : '#FF4500',
                boxShadow: '0 0 10px currentColor'
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Hero Text */}
      <div className="absolute bottom-20 left-0 right-0 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-white mb-2"
          style={{ textShadow: '0 0 20px rgba(255, 215, 0, 0.8)' }}
        >
          Trade to the Moon! 🚀
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-lg md:text-xl text-[#4ECDC4]"
          style={{ textShadow: '0 0 10px rgba(78, 205, 196, 0.6)' }}
        >
          AI-Powered Chart Analysis • Real-Time Market Insights
        </motion.p>
      </div>

      {/* Sparkles Around Rocket */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1
          }}
          className="absolute w-1 h-1 bg-[#FFD700] rounded-full"
          style={{
            left: `${40 + (i % 5) * 5}%`,
            top: `${30 + Math.floor(i / 5) * 10}%`,
            boxShadow: '0 0 5px #FFD700'
          }}
        />
      ))}
    </div>
  );
}
