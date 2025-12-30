"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface ServiceBanner {
  title: string;
  description: string;
  icon: string;
  color: string;
  link: string;
  image: string;
}

export default function ServiceBanners() {
  const services: ServiceBanner[] = [
    {
      title: "AI Chart Analysis",
      description: "Upload any chart and get instant AI-powered analysis with entry/exit points",
      icon: "🤖",
      color: "from-[#6366F1] to-[#8B5CF6]",
      link: "/",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"
    },
    {
      title: "PRO Membership",
      description: "Unlimited analyses, saved journal, real-time alerts. Just $6.99/month",
      icon: "⭐",
      color: "from-[#8B5CF6] to-[#EC4899]",
      link: "/pricing",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop"
    },
    {
      title: "Trading University",
      description: "Learn from beginner to expert with our comprehensive trading courses",
      icon: "🎓",
      color: "from-[#EC4899] to-[#F59E0B]",
      link: "/university",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop"
    },
    {
      title: "Live Market News",
      description: "Stay ahead with real-time market updates and breaking crypto news",
      icon: "📰",
      color: "from-[#F59E0B] to-[#10B981]",
      link: "/news",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"
    },
  ];

  return (
    <div className="space-y-4">
      {services.map((service, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className="group"
        >
          <Link href={service.link}>
            <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 hover:border-[#6366F1]/50 transition-all shadow-xl hover:shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90`} />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6">
                <div className="flex items-start gap-3 mb-3">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-4xl"
                  >
                    {service.icon}
                  </motion.span>
                  <div>
                    <h3 className="text-xl font-black text-white mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/80">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* CTA Arrow */}
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center gap-2 text-white font-bold"
                >
                  <span className="text-sm">Learn More</span>
                  <span className="text-xl">→</span>
                </motion.div>
              </div>

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: [-200, 400] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              />
            </div>
          </Link>
        </motion.div>
      ))}

      {/* Referral Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e] rounded-2xl border-2 border-[#6366F1]/30 p-6 relative overflow-hidden"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#6366F1] rounded-full blur-3xl"
        />

        <div className="relative z-10">
          <div className="text-3xl mb-3 text-center">🎁</div>
          <h3 className="text-lg font-black text-white mb-2 text-center">
            Refer & Earn
          </h3>
          <p className="text-sm text-neutral-300 text-center mb-4">
            Get 1 month FREE for every friend who joins PRO
          </p>
          <button className="w-full bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold py-3 rounded-lg hover:shadow-lg transition-all">
            Get Referral Link
          </button>
        </div>
      </motion.div>
    </div>
  );
}
