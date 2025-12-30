"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import TokenGate from '@/components/TokenGate';
import { useState } from 'react';

export default function Pricing() {
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleProCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else if (data.error) {
        alert('Error: ' + data.error);
        setLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to start checkout. Please try again.');
      setLoading(false);
    }
  };
  const plans = [
    {
      name: "Free Plan",
      price: "0",
      period: "forever",
      description: "Perfect for trying out TradingXbert AI",
      features: [
        "10 free chart analyses per month",
        "Day trade timeframe only (4H, 1D charts)",
        "Basic AI insights and patterns",
        "Support & resistance levels",
        "Risk/reward calculations",
        "Community support"
      ],
      limitations: [
        "No 5min or 1min timeframe analysis",
        "Limited to 10 analyses/month",
        "Standard processing speed"
      ],
      cta: "Start Free",
      href: "/",
      gradient: "from-neutral-600 to-neutral-700",
      borderColor: "border-neutral-600/30"
    },
    {
      name: "Pro Plan",
      price: "6.99",
      originalPrice: "9.99",
      period: "month",
      popular: true,
      description: "Everything you need to master trading with AI",
      features: [
        "✨ UNLIMITED chart analyses",
        "🔥 All timeframes: 1min, 5min, 15min, 1H, 4H, 1D",
        "🎓 FULL University Access (All 10 Courses - $2,024 value)",
        "🤖 AI-Generated Trade Signals (Live)",
        "🔔 Real-Time Notifications for Trade Opportunities",
        "📊 Smart Money Flow Detection",
        "💎 Institutional Order Block Analysis",
        "📈 Multi-Timeframe Correlation",
        "⚡ Priority Processing (3x faster)",
        "🛡️ Advanced Risk Management Calculator",
        "📝 Trade Journal Integration",
        "💬 Direct Messaging with Traders",
        "👥 Full Community Access",
        "📧 Email & SMS Alert Notifications",
        "🎯 Premium Support (Priority Response)",
        "🚀 Early Access to New AI Features"
      ],
      limitations: [],
      cta: "Get Pro Now - $6.99/mo",
      href: "/api/stripe-checkout",
      stripeProductId: "prod_Tg6H96qgfV1qRP",
      stripePriceId: "price_1Sik4pRia8z8dQ23h2lNrvog",
      gradient: "from-[#6366F1] via-[#8B5CF6] to-[#EC4899]",
      borderColor: "border-[#6366F1]/50"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F]">
      {/* Setup Notice */}
      {showSetupModal && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black py-4 px-6 text-center font-bold relative"
        >
          <button 
            onClick={() => setShowSetupModal(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl hover:scale-110 transition-transform"
          >
            ×
          </button>
          🚧 Admin: Create your Stripe Payment Link first! Product ID: prod_Tg6H96qgfV1qRP
        </motion.div>
      )}
      
      {/* Hero */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-24 px-4 text-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/10 to-[#3B82F6]/10"></div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6366F1]/20 rounded-full blur-3xl"
        ></motion.div>
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-bold mb-6"
          >
            💎 SIMPLE, TRANSPARENT PRICING
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-[#6366F1] to-[#3B82F6] bg-clip-text text-transparent"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl text-neutral-300 max-w-3xl mx-auto mb-8"
          >
            Start free, upgrade when you're ready. Cancel anytime, no questions asked.
          </motion.p>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 w-auto">
                  <div className={`px-4 md:px-6 py-1.5 md:py-2 bg-gradient-to-r ${plan.gradient} rounded-full text-white text-xs md:text-sm font-bold shadow-lg whitespace-nowrap`}>
                    ⭐ MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className={`h-full bg-white/5 backdrop-blur-sm rounded-3xl border ${plan.borderColor} p-8 hover:border-opacity-100 transition-all duration-300 ${plan.popular ? 'shadow-2xl shadow-[#6366F1]/20 scale-105' : ''}`}>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-neutral-400 text-sm">{plan.description}</p>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-2 mb-2">
                    {plan.originalPrice && (
                      <span className="text-2xl font-bold text-neutral-500 line-through mr-2">${plan.originalPrice}</span>
                    )}
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-neutral-400">/ {plan.period}</span>
                  </div>
                  {plan.price === "0" && (
                    <p className="text-emerald-400 text-sm font-semibold">No credit card required</p>
                  )}
                  {plan.popular && (
                    <p className="text-emerald-400 text-sm font-semibold">🔥 ON SALE - Limited Time Offer!</p>
                  )}
                </div>

                {plan.price !== "0" ? (
                  <button
                    onClick={handleProCheckout}
                    disabled={loading}
                    className={`block w-full py-4 px-6 rounded-xl font-bold text-center mb-8 transition-all duration-300 ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-xl hover:shadow-[#6366F1]/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {loading ? '⏳ Loading...' : plan.cta}
                  </button>
                ) : (
                  <Link
                    href={plan.href}
                    className={`block w-full py-4 px-6 rounded-xl font-bold text-center mb-8 transition-all duration-300 ${
                      'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                )}

                <div className="space-y-4 mb-6">
                  <p className="text-sm font-bold text-neutral-300 uppercase tracking-wide">What's Included:</p>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-emerald-400 text-xl mt-0.5">✓</span>
                      <span className="text-neutral-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-sm font-bold text-neutral-400 uppercase tracking-wide mb-4">Limitations:</p>
                    {plan.limitations.map((limitation, i) => (
                      <div key={i} className="flex items-start gap-3 mb-2">
                        <span className="text-neutral-500 text-xl mt-0.5">✕</span>
                        <span className="text-neutral-500 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ / Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: "What timeframes are included in each plan?",
                a: "Free plan includes day trading timeframes (4H, 1D charts). Pro plan unlocks ALL timeframes including 1min, 5min, 15min, 1H, 4H, and 1D - perfect for scalpers and day traders."
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes! Cancel anytime from your account dashboard. No questions asked, no fees, no hassle."
              },
              {
                q: "Do my free analyses reset each month?",
                a: "Yes, on the free plan you get 10 fresh analyses on the 1st of each month."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards, debit cards, and digital wallets through our secure Stripe payment processor."
              },
              {
                q: "Is there a money-back guarantee?",
                a: "Yes! If you're not satisfied within the first 7 days, contact support for a full refund."
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 p-6 rounded-xl border border-white/10"
              >
                <h3 className="text-white font-bold text-lg mb-2">{faq.q}</h3>
                <p className="text-neutral-300">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Token-Gated Access - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 max-w-6xl mx-auto"
        >
          <div className="bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 rounded-3xl border-2 border-[#6366F1]/50 p-8 mb-8">
            <div className="text-center mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🪙
              </motion.div>
              <h2 className="text-4xl font-black text-white mb-4">
                Alternative Payment: Hold Our Token
              </h2>
              <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
                Don't want a monthly subscription? Hold <span className="font-black text-[#6366F1]">1,000+ $TX tokens</span> in your Solana wallet for automatic Pro access! No recurring payments, just hold tokens.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: "💰",
                  title: "One-Time Purchase",
                  desc: "Buy tokens once, keep Pro access as long as you hold them"
                },
                {
                  icon: "🔓",
                  title: "Instant Unlock",
                  desc: "Connect wallet, verify balance, get Pro features immediately"
                },
                {
                  icon: "📈",
                  title: "Token Value Growth",
                  desc: "Your tokens may appreciate in value while you use Pro features"
                }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-[#6366F1]/30 text-center"
                >
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-neutral-400 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-[#6366F1]/10 border border-[#6366F1]/30 rounded-xl p-6 mb-6">
              <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <span>ℹ️</span> How Token Gating Works
              </h3>
              <div className="space-y-2 text-neutral-300">
                <p>• <span className="font-bold text-white">Minimum Requirement:</span> Hold 1,000+ $TX tokens in your Solana wallet</p>
                <p>• <span className="font-bold text-white">Verification:</span> Connect your wallet below to verify your balance</p>
                <p>• <span className="font-bold text-white">Pro Access:</span> If you meet the threshold, Pro features unlock automatically</p>
                <p>• <span className="font-bold text-white">Flexibility:</span> You can sell tokens anytime, but Pro access requires holding the minimum</p>
              </div>
            </div>
          </div>

          <TokenGate />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 p-12 rounded-3xl border border-[#6366F1]/30"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Trade Smarter?</h2>
          <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Join thousands of traders using AI to make better trading decisions
          </p>
          <a
            href="https://buy.stripe.com/test_00g4ivbY84ks6yseUU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#EC4899] text-white font-bold rounded-xl hover:shadow-xl hover:shadow-[#6366F1]/30 hover:scale-105 transition-all duration-300"
          >
            Get Pro Now - $6.99/mo →
          </a>
        </motion.div>
      </div>
    </main>
  );
}
