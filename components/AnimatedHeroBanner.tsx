"use client";

import { motion } from "framer-motion";

export default function AnimatedHeroBanner() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-b from-[#0A0A0F] to-[#1a1a2e] border-b border-[#FFD700]/20">
      {/* Starfield Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Flying Rockets */}
      <motion.div
        animate={{
          x: ["-10%", "110%"],
          y: [100, 50]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-20 text-6xl"
        style={{ filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))" }}
      >
        🚀
      </motion.div>

      <motion.div
        animate={{
          x: ["110%", "-10%"],
          y: [200, 150]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
        className="absolute top-40 text-5xl"
        style={{ filter: "drop-shadow(0 0 15px rgba(99, 102, 241, 0.8))" }}
      >
        🚀
      </motion.div>

      <motion.div
        animate={{
          x: ["-10%", "110%"],
          y: [300, 250]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "linear",
          delay: 4
        }}
        className="absolute bottom-20 text-4xl"
        style={{ filter: "drop-shadow(0 0 10px rgba(255, 165, 0, 0.8))" }}
      >
        🚀
      </motion.div>

      {/* Main Hero: Bull Riding Rocket */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative"
        >
          {/* Rocket Flames */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity
            }}
            className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-6xl"
          >
            🔥
          </motion.div>

          {/* Main Composition */}
          <div className="relative text-center">
            <motion.div
              className="text-9xl md:text-[180px] relative z-10"
              style={{
                filter: "drop-shadow(0 0 40px rgba(255, 215, 0, 0.9))"
              }}
            >
              🐂
            </motion.div>
            
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity }
              }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-8xl md:text-[140px] -z-10"
              style={{
                filter: "drop-shadow(0 0 30px rgba(255, 165, 0, 0.9))"
              }}
            >
              🚀
            </motion.div>
          </div>

          {/* Sparkles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [0, 1, 0],
                x: [0, (Math.cos((i * Math.PI) / 4) * 100)],
                y: [0, (Math.sin((i * Math.PI) / 4) * 100)],
                opacity: [1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2
              }}
              className="absolute top-1/2 left-1/2 text-3xl"
            >
              ⭐
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Text Overlay */}
      <div className="absolute bottom-8 left-0 right-0 text-center z-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-4xl md:text-6xl font-black mb-2 bg-gradient-to-r from-[#FFD700] via-white to-[#FFA500] bg-clip-text text-transparent"
        >
          Trade Like a Bull! 🐂
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-xl md:text-2xl text-white font-bold"
        >
          AI-Powered Trading Analysis 🚀
        </motion.p>
      </div>

      {/* Dollar Signs Floating */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: ["100%", "-10%"],
            x: [0, Math.sin(i) * 50],
            rotate: [0, 360],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
          className="absolute bottom-0 text-4xl"
          style={{
            left: `${15 + i * 15}%`,
            filter: "drop-shadow(0 0 10px rgba(34, 197, 94, 0.8))"
          }}
        >
          💰
        </motion.div>
      ))}

      {/* Chart Lines */}
      <motion.div
        animate={{
          pathLength: [0, 1],
          opacity: [0, 0.3, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity
        }}
        className="absolute inset-0 pointer-events-none"
      >
        <svg className="w-full h-full">
          <motion.path
            d="M0,250 Q250,150 500,200 T1000,250"
            stroke="#22c55e"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.path
            d="M0,200 Q250,100 500,150 T1000,200"
            stroke="#ef4444"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
