"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Invest() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F] overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(#FFD700 1px, transparent 1px),
            linear-gradient(90deg, #FFD700 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-scroll 20s linear infinite'
        }}></div>
      </div>

      {/* Mouse Follow Glow */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-32 px-4 text-center overflow-hidden"
      >
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#FFD700] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 via-[#FFA500]/10 to-[#FF8C00]/10"></div>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FFD700]/20 rounded-full blur-3xl"
        ></motion.div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-6 py-3 bg-[#FFD700]/20 border-2 border-[#FFD700] rounded-full text-[#FFD700] text-sm font-bold mb-8 shadow-lg shadow-[#FFD700]/50"
          >
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🚀 LAUNCHING SOON ON PUMP.FUN
            </motion.span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <motion.h1 
              className="text-7xl md:text-9xl font-bold mb-4 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] bg-clip-text text-transparent drop-shadow-2xl"
              animate={{
                textShadow: [
                  '0 0 20px rgba(255,215,0,0.5)',
                  '0 0 40px rgba(255,215,0,0.8)',
                  '0 0 20px rgba(255,215,0,0.5)',
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              $TXB
            </motion.h1>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
            </motion.div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            TradingXbert Token
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto mb-4 leading-relaxed"
          >
            Utility token supporting AI-powered trading analysis
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-lg text-neutral-400 max-w-2xl mx-auto mb-12"
          >
            This is not a meme coin. This is a token tied to an active trading platform and real usage.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] text-black text-lg font-black rounded-2xl shadow-2xl shadow-[#FFD700]/50 relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,215,0,0.8)' }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <span className="relative z-10">🔥 Buy $TXB on Pump.fun</span>
            </motion.a>
            <Link
              href="#utility"
              className="px-10 py-5 bg-white/5 backdrop-blur-sm text-white text-lg font-bold rounded-2xl border-2 border-[#FFD700]/30 hover:bg-[#FFD700]/10 hover:border-[#FFD700] transition-all duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* What TXB Is Section */}
      <div id="utility" className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🔍 What $TXB Is Designed For
          </motion.h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: "⚡",
              title: "Real Platform Utility",
              description: "$TXB powers the TradingXbert ecosystem:",
              features: [
                "Platform feature access",
                "Subscription discounts",
                "Priority tools & analytics",
                "Future ecosystem incentives"
              ],
              gradient: "from-[#FFD700]/20 to-[#FFA500]/20"
            },
            {
              icon: "📈",
              title: "Platform-Driven Demand",
              description: "As adoption grows, demand grows:",
              features: [
                "User engagement rewards",
                "Platform participation benefits",
                "Long-term ecosystem incentives",
                "No artificial hype mechanics"
              ],
              gradient: "from-[#FFA500]/20 to-[#FF8C00]/20"
            },
            {
              icon: "🎯",
              title: "Fair Launch Philosophy",
              description: "Transparent & equitable:",
              features: [
                "❌ No presale",
                "❌ No private allocation",
                "❌ No VC unlocks",
                "✅ 100% fair launch"
              ],
              gradient: "from-[#FF8C00]/20 to-[#FFD700]/20"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 60px rgba(255,215,0,0.3)'
              }}
              className={`bg-gradient-to-br ${card.gradient} backdrop-blur-sm rounded-3xl border-2 border-[#FFD700]/30 p-8 relative overflow-hidden group`}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/0 to-[#FFD700]/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div 
                  className="text-6xl mb-4"
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {card.icon}
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-[#FFD700] font-semibold mb-4">{card.description}</p>
                <ul className="space-y-2">
                  {card.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="text-neutral-300 text-sm flex items-start gap-2"
                    >
                      <span className="text-[#FFD700] mt-0.5">▸</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blockchain Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block bg-gradient-to-r from-[#14F195]/20 to-[#9945FF]/20 backdrop-blur-sm border-2 border-[#14F195]/50 rounded-2xl px-8 py-6">
            <p className="text-[#14F195] font-bold text-lg mb-2">⚡ Built on Solana</p>
            <p className="text-neutral-300 text-sm">Fast transactions • Low fees • Scalable ecosystem</p>
          </div>
        </motion.div>
      </div>

      {/* Tokenomics */}
      <div id="tokenomics" className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#FFD700]/10 via-[#FFA500]/10 to-[#FF8C00]/10 backdrop-blur-xl rounded-3xl border-2 border-[#FFD700]/30 p-12 relative overflow-hidden"
        >
          {/* Animated Corner Accents */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />
          
          <div className="relative z-10">
            <motion.h2 
              className="text-5xl md:text-6xl font-bold text-white text-center mb-4"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              🔢 Token Details
            </motion.h2>
            <p className="text-center text-neutral-400 mb-12 text-lg">Clean & Simple</p>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-[#FFD700] mb-6 flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ⚙️
                  </motion.span>
                  Token Information
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Token Name:", value: "TradingXbert" },
                    { label: "Ticker:", value: "$TXB" },
                    { label: "Network:", value: "Solana" },
                    { label: "Total Supply:", value: "1,000,000,000" },
                    { label: "Launch Platform:", value: "Pump.fun" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex justify-between items-center py-4 border-b border-[#FFD700]/20 hover:border-[#FFD700]/50 transition-colors group"
                    >
                      <span className="text-neutral-300 group-hover:text-white transition-colors">{item.label}</span>
                      <span className="text-white font-bold text-lg">{item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#FFA500] mb-6 flex items-center gap-2">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    💎
                  </motion.span>
                  Distribution
                </h3>
                <div className="space-y-6">
                  <motion.div 
                    className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 backdrop-blur-sm rounded-2xl p-6 border border-[#FFD700]/30"
                    whileHover={{ scale: 1.02, borderColor: 'rgba(255,215,0,0.8)' }}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-bold text-xl">Fair Launch</span>
                      <span className="text-[#FFD700] font-black text-2xl">100%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-4 mb-3 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] h-4 rounded-full relative"
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0"
                          animate={{
                            x: ['-100%', '100%']
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                      </motion.div>
                    </div>
                    <p className="text-neutral-300 text-sm">All tokens available at launch - no team allocation</p>
                  </motion.div>
                  
                  {/* Utility Cards */}
                  <motion.div 
                    className="bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10 border border-[#FFD700]/40 rounded-2xl p-5"
                    whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(255,215,0,0.3)' }}
                  >
                    <p className="text-[#FFD700] font-bold mb-2 flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        🎯
                      </motion.span>
                      Planned Platform Integrations
                    </p>
                    <ul className="text-neutral-300 text-sm space-y-1">
                      <li>• Discounts on TradingXbert Pro</li>
                      <li>• Priority access to analytical tools</li>
                      <li>• Optional token-based feature unlocks</li>
                      <li>• Ecosystem incentives for active users</li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Utility & Incentives */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            🧠 Utility & Incentives
          </h2>
          <p className="text-neutral-400 text-lg">(Planned Integration)</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: "💰",
              title: "Pro Discounts",
              description: "Get exclusive discounts on TradingXbert Pro subscriptions"
            },
            {
              icon: "🚀",
              title: "Priority Access",
              description: "Early access to new analytical tools and features"
            },
            {
              icon: "🔓",
              title: "Feature Unlocks",
              description: "Optional token-based access to premium features"
            },
            {
              icon: "🎁",
              title: "Ecosystem Rewards",
              description: "Incentives for active platform participation"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 40px rgba(255,215,0,0.2)'
              }}
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl border-2 border-[#FFD700]/20 p-6 text-center relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/0 to-[#FFD700]/30"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <motion.div
                  className="text-5xl mb-4"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                >
                  {item.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-400 text-sm italic">
            All integrations are designed to support platform users first, not speculation.
          </p>
        </motion.div>
      </div>

      {/* Roadmap */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-bold text-white text-center mb-6"
        >
          🛣️ Roadmap
        </motion.h2>
        <p className="text-center text-neutral-400 mb-16 text-lg">Intent-Based, Not Promises</p>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FFD700] via-[#FFA500] to-[#FF8C00]"></div>

          <div className="space-y-16">
            {[
              {
                phase: "Phase 1",
                title: "Token Launch",
                status: "🚀 Coming Soon",
                items: [
                  "Launch $TXB on Pump.fun",
                  "Establish official communication channels",
                  "Publish platform + token documentation"
                ],
                position: "left"
              },
              {
                phase: "Phase 2",
                title: "Platform Integration",
                status: "🔜 Q1 2026",
                items: [
                  "Enable $TXB-based discounts",
                  "Introduce token utility inside TradingXbert",
                  "Initial platform incentive mechanisms"
                ],
                position: "right"
              },
              {
                phase: "Phase 3",
                title: "Ecosystem Expansion",
                status: "📅 Q2 2026",
                items: [
                  "Advanced utility features",
                  "Optional staking or participation models",
                  "Community governance exploration"
                ],
                position: "left"
              }
            ].map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: phase.position === 'left' ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex ${phase.position === 'right' ? 'flex-row-reverse' : ''} items-center gap-8`}
              >
                <div className={`w-5/12 ${phase.position === 'right' ? 'text-left' : 'text-right'}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 backdrop-blur-sm rounded-2xl border-2 border-[#FFD700]/30 p-6 relative overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/0 to-[#FFD700]/20"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white">{phase.phase}</h3>
                        <span className="text-[#FFD700] font-bold text-sm">{phase.status}</span>
                      </div>
                      <h4 className="text-xl text-[#FFD700] font-bold mb-4">{phase.title}</h4>
                      <ul className="space-y-2">
                        {phase.items.map((item, i) => (
                          <li key={i} className="text-neutral-300 text-sm flex items-start gap-2">
                            <span className="text-[#FFD700] mt-0.5">✓</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </div>
                
                {/* Center Node */}
                <motion.div
                  className="w-2/12 flex justify-center"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full border-4 border-[#0A0A0F] shadow-lg shadow-[#FFD700]/50 z-10"></div>
                </motion.div>
                
                <div className="w-5/12"></div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-neutral-500 mt-12 italic text-sm"
        >
          Roadmap items are targets, not guarantees.
        </motion.p>
      </div>

      {/* How to Buy */}
      <div className="max-w-5xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#FFD700]/10 via-[#FFA500]/10 to-[#FF8C00]/10 backdrop-blur-xl rounded-3xl border-2 border-[#FFD700]/30 p-12 text-center relative overflow-hidden"
        >
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-[#FFD700]/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          />

          <div className="relative z-10">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">How to Get $TXB</h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                { step: "1", title: "Get a Wallet", desc: "Download Phantom or Solflare", icon: "👛" },
                { step: "2", title: "Add SOL", desc: "Buy SOL and transfer to wallet", icon: "⚡" },
                { step: "3", title: "Visit Pump.fun", desc: "Search for $TXB token", icon: "🔍" },
                { step: "4", title: "Swap & Hold", desc: "Swap SOL for $TXB", icon: "💎" }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[#FFD700]/20 hover:border-[#FFD700]/60 transition-all"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    className="text-5xl mb-3"
                  >
                    {step.icon}
                  </motion.div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center text-black font-black text-xl mx-auto mb-4 shadow-lg shadow-[#FFD700]/50">
                    {step.step}
                  </div>
                  <h3 className="text-white font-bold mb-2 text-lg">{step.title}</h3>
                  <p className="text-neutral-400 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="https://pump.fun"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-6 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF8C00] text-black text-xl font-black rounded-2xl shadow-2xl shadow-[#FFD700]/50 relative overflow-hidden group"
              whileHover={{ scale: 1.05, boxShadow: '0 0 60px rgba(255,215,0,0.8)' }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <span className="relative z-10">🚀 Buy $TXB Now</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Important Notes / Disclaimer */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-yellow-900/20 to-red-900/20 backdrop-blur-sm border-2 border-yellow-500/30 rounded-3xl p-8"
        >
          <h3 className="text-3xl font-bold text-yellow-400 mb-6 flex items-center gap-3">
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ⚠️
            </motion.span>
            Important Notes (This Protects You)
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-neutral-300">
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">•</span>
              <p>$TXB is not marketed as an investment</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">•</span>
              <p>No profit guarantees or price predictions</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">•</span>
              <p>Token utility evolves with platform adoption</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-400 text-xl">•</span>
              <p>Always do your own research (DYOR)</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Why This Is Better Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-12">
            🧭 Why This Approach Works
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: "✅", text: "Sounds Legitimate" },
              { icon: "✅", text: "Professional Tone" },
              { icon: "✅", text: "Won't Scare Traders" },
              { icon: "✅", text: "Reduces Platform Risk" },
              { icon: "✅", text: "Attracts Real Users" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/40 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-2">{item.icon}</div>
                <p className="text-white font-bold text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-[#FFD700] text-2xl font-bold mt-12"
          >
            This is how real platforms introduce tokens.
          </motion.p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes grid-scroll {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }
      `}</style>
    </main>
  );
}
