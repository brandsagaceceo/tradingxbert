"use client";

import CoursePage from "@/components/CoursePage";

export default function RiskManagementCourse() {
  const lessons = [
    {
      id: 1,
      title: "The 2% Rule & Position Sizing",
      duration: "28 min",
      points: 120,
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=600&fit=crop",
      content: `🛡️ Rule #1: Protect Your Capital!

Risk management is THE most important skill. Master this or lose everything!

🎯 THE 2% RULE:

Never risk more than 2% of your account on ONE trade!

Example:
• $10,000 account
• 2% = $200 max risk per trade
• Stop loss hit? Lose only $200
• Lose 10 trades in a row? Down only 18%!

Compare to 10% risk:
• $10,000 account
• 10% = $1,000 per trade
• Lose 5 trades = -41% account!
• Nearly impossible to recover!

💰 POSITION SIZING FORMULA:

Position Size = Risk $ / Stop Distance

Example:
• Account: $10,000 (2% = $200)
• Entry: $50,000
• Stop: $49,000
• Distance: $1,000

Position = $200 / $1,000 = 0.2 BTC

Perfect! If stopped out, lose exactly $200! ✅`
    },
    {
      id: 2,
      title: "Setting Proper Stop Losses",
      duration: "25 min",
      points: 110,
      image: "https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?w=1200&h=600&fit=crop",
      content: `🚨 Stop Losses Save Lives!

Your stop loss is your insurance policy - ALWAYS use it!

📊 WHERE TO PLACE STOPS:

✅ GOOD STOP PLACEMENT:
• Below structure (support/order block)
• Beyond recent swing low/high
• Outside normal volatility
• With buffer for liquidity grabs

❌ BAD STOP PLACEMENT:
• At round numbers (hunted!)
• Too tight (noise stops you)
• Random levels (no logic)
• Based on "what you can afford to lose"

🎯 STOP LOSS TYPES:

1. FIXED STOP
   - Set price level
   - Never touch it!
   - Simple, effective

2. TRAILING STOP
   - Follows price up
   - Locks in profits
   - Good for trends

3. ATR-BASED STOP
   - Based on volatility
   - 1.5-2x ATR away
   - Adapts to market

Rule: Set stop based on CHART, not your feelings!`
    },
    {
      id: 3,
      title: "Risk-Reward Ratios",
      duration: "22 min",
      points: 100,
      content: `⚖️ The Math of Profitability

You don't need to win most trades to profit - you need good Risk:Reward!

🎯 RISK:REWARD EXPLAINED:

1:2 R:R means:
• Risk $100
• Target $200
• Win 40% of trades = Profitable!

Math:
10 trades, 40% win rate
• Wins: 4 × $200 = $800
• Losses: 6 × $100 = $600
• Profit: +$200! 💰

📊 MINIMUM R:R BY WIN RATE:

30% win rate → Need 1:3 R:R
40% win rate → Need 1:2 R:R
50% win rate → Need 1:1 R:R
60% win rate → Can use 1:1 R:R
70% win rate → Can use 1:0.5 R:R

Find YOUR win rate and adjust targets!

🎯 PRO TIP:
Never take trades worse than 1:2 R:R!
If you can't get 1:2, DON'T TRADE IT!`
    },
    {
      id: 4,
      title: "Portfolio Diversification",
      duration: "20 min",
      points: 90,
      content: `🎲 Don't Put All Eggs in One Basket

Diversification reduces risk significantly!

📊 DIVERSIFICATION RULES:

1. ACROSS ASSETS
   - Don't trade only Bitcoin
   - Mix stocks, crypto, forex
   - Different correlations

2. ACROSS STRATEGIES
   - Trend following
   - Mean reversion
   - Breakouts
   - One fails, others work!

3. ACROSS TIMEFRAMES
   - Some swing trades
   - Some day trades
   - Smooth out returns

4. POSITION LIMITS
   - Max 3-5 positions at once
   - Total risk never > 6%
   - No single position > 2%

⚠️ CORRELATION WARNING:
If trading BTC, ETH, and altcoins all at once - that's NOT diversified! They all crash together! 📉`
    },
    {
      id: 5,
      title: "Drawdown Management & Recovery",
      duration: "25 min",
      points: 105,
      content: `📉 Surviving Losing Streaks

Every trader has drawdowns - how you handle them determines survival!

🎯 DRAWDOWN MATH:

-10% requires +11% to recover
-20% requires +25% to recover
-30% requires +43% to recover
-50% requires +100% to recover! 😱

The deeper the hole, the harder to climb out!

📊 DRAWDOWN RULES:

1. REDUCE SIZE AT -10%
   - Cut risk to 1% per trade
   - Rebuild confidence
   - Lower pressure

2. PAUSE AT -20%
   - Stop trading!
   - Review system
   - Find issues
   - Paper trade until fixed

3. NEVER REVENGE TRADE
   - Worst thing you can do!
   - Leads to bigger losses
   - Walk away instead

🏆 RECOVERY STRATEGY:
• Don't try to get it all back at once!
• Consistent small wins
• Follow your system
• Patience = Key

Remember: Slow and steady wins the race! 🐢`
    }
  ];

  return (
    <CoursePage
      courseId="risk-management"
      title="Risk Management Mastery"
      icon="🛡️"
      description="Learn professional risk management strategies including the 2% rule, position sizing, stop loss placement, and portfolio protection techniques."
      level="Essential"
      totalDuration="2 hours"
      color="from-green-500 to-emerald-500"
      lessons={lessons}
    />
  );
}
