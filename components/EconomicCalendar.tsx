"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function EconomicCalendar() {
  const events = [
    {
      time: "10:00 AM EST",
      event: "Fed Interest Rate Decision",
      impact: "high",
      country: "🇺🇸",
      forecast: "5.25%",
      previous: "5.50%"
    },
    {
      time: "2:30 PM EST",
      event: "GDP Growth Rate",
      impact: "high",
      country: "🇺🇸",
      forecast: "2.8%",
      previous: "2.6%"
    },
    {
      time: "Tomorrow 8:30 AM",
      event: "Non-Farm Payrolls",
      impact: "high",
      country: "🇺🇸",
      forecast: "175K",
      previous: "150K"
    },
    {
      time: "Tomorrow 10:00 AM",
      event: "Unemployment Rate",
      impact: "medium",
      country: "🇺🇸",
      forecast: "3.7%",
      previous: "3.8%"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-2xl border-2 border-[#6366F1]/30 p-6 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-white flex items-center gap-2">
          <span className="text-2xl">📅</span>
          Economic Calendar
        </h3>
      </div>

      <div className="space-y-3">
        {events.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02, x: 4 }}
            className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-[#6366F1]/50 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{event.country}</span>
                <span className={`w-2 h-2 rounded-full ${
                  event.impact === 'high' ? 'bg-red-500' :
                  event.impact === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                } animate-pulse`} />
              </div>
              <span className="text-xs text-neutral-500">{event.time}</span>
            </div>
            <h4 className="text-sm font-bold text-white mb-2">{event.event}</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-black/30 rounded p-2">
                <div className="text-neutral-400 mb-1">Forecast</div>
                <div className="font-bold text-emerald-400">{event.forecast}</div>
              </div>
              <div className="bg-black/30 rounded p-2">
                <div className="text-neutral-400 mb-1">Previous</div>
                <div className="font-bold text-neutral-300">{event.previous}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mt-4 bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 rounded-xl p-4 border border-[#6366F1]/30"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white mb-1">Set Alerts</div>
            <div className="text-xs text-neutral-400">Get notified of key events</div>
          </div>
          <button className="bg-[#6366F1] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#5558E3] transition-all">
            Enable
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
