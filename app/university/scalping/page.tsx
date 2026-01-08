"use client";

import CoursePage from "@/components/CoursePage";

export default function ScalpingCourse() {
  const lessons = [
    {
      id: 1,
      title: "What is Scalping?",
      duration: "20 min",
      points: 85,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
      content: `⚡ Speed Trading - Quick In, Quick Out!

Scalping = Taking dozens of small profits throughout the day!

🎯 SCALPING CHARACTERISTICS:

• Trades last: 1-15 minutes
• Targets: 0.1% - 0.5% profit
• Volume: 10-50+ trades per day
• Charts: 1m, 5m, 15m
• Requires: Focus, speed, discipline

📊 PROS:
✅ Quick results
✅ No overnight risk
✅ Many opportunities
✅ Compounds quickly

⚠️ CONS:
❌ Very time-intensive
❌ High stress
❌ Commission costs add up
❌ Requires fast execution

Is scalping for you? Need: Fast reactions, full attention, emotional control!`
    },
    {
      id: 2,
      title: "Scalping Strategies & Setups",
      duration: "30 min",
      points: 125,
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=1200&h=600&fit=crop",
      content: `🎯 High-Frequency Trading Setups

Master these 5 scalping strategies!

📊 STRATEGY #1: Range Scalping
Trade support/resistance bounces
• Buy at support
• Sell at resistance
• 5-10 pip targets
• Works in consolidation

📊 STRATEGY #2: Breakout Scalping
Trade immediate breakouts
• Wait for breakout
• Enter on breakout candle
• Target 10-15 pips
• Fast in and out!

📊 STRATEGY #3: News Scalping
Trade volatility spikes
• Enter on news release
• Ride momentum
• Quick 15-20 pip target
• High risk, high reward!

📊 STRATEGY #4: Moving Average Scalping
Follow trend direction
• Price above 20 EMA = Long bias
• Price below 20 EMA = Short bias
• Enter on pullbacks
• 5-10 pip targets

📊 STRATEGY #5: Order Flow Scalping
Read level 2 data
• Watch bid/ask
• See big orders
• Front-run moves
• Advanced technique!`
    },
    {
      id: 3,
      title: "Scalping Risk Management",
      duration: "18 min",
      points: 75,
      content: `🛡️ Protecting Profits in Fast Markets

Scalping requires STRICT risk rules!

⚡ SCALPING RISK RULES:

1. TIGHT STOPS (3-5 pips)
   - No room for hope
   - Wrong = Out immediately!
   
2. SMALL POSITION SIZES
   - Risk 0.5-1% max
   - Multiple trades per day
   
3. QUICK PROFITS
   - Hit target = Close!
   - Don't get greedy
   - Compound small wins

4. DAILY LOSS LIMIT
   - -2% for day = STOP!
   - Come back tomorrow
   - Prevents blowups

5. AVOID CHOPPY MARKETS
   - Need clear direction
   - Sideways = No scalping!

Remember: Death by a thousand cuts is REAL in scalping! Protect yourself!`
    },
    {
      id: 4,
      title: "Tools & Platforms for Scalping",
      duration: "15 min",
      points: 65,
      content: `⚙️ The Scalper's Toolkit

You need fast tools for fast trading!

🔧 ESSENTIAL TOOLS:

1. LOW LATENCY BROKER
   - Fast execution
   - Low spreads
   - No slippage

2. LEVEL 2 DATA
   - See order book
   - Read flow
   - Spot whales

3. FAST INTERNET
   - Wired > WiFi
   - Speed = Money!

4. MULTIPLE MONITORS
   - Watch multiple pairs
   - Quick decisions

5. TRADING PLATFORM
   - One-click trading
   - Hotkeys
   - Fast charts

💰 COMMISSION COSTS:
50 trades × $2 = $100/day in fees!
Choose broker carefully!`
    }
  ];

  return (
    <CoursePage
      courseId="scalping"
      title="Scalping & Day Trading"
      icon="⚡"
      description="Master ultra-short-term trading strategies. Learn to scalp markets for quick profits using 1-15 minute timeframes with precision entries and exits."
      level="Advanced"
      totalDuration="1 hour 23 min"
      color="from-red-500 to-pink-500"
      lessons={lessons}
    />
  );
}
