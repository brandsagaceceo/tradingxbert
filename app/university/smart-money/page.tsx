"use client";

import CoursePage from "@/components/CoursePage";

export default function SmartMoneyCourse() {
  const lessons = [
    {
      id: 1,
      title: "Understanding Smart Money Concepts",
      duration: "30 min",
      points: 125,
      image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=1200&h=600&fit=crop",
      content: `🏦 Trading Like The Institutions

Smart Money = Banks, hedge funds, market makers - the BIG players!

🎯 WHY FOLLOW SMART MONEY?

They move markets! While retail traders trade hundreds, institutions trade MILLIONS!

📊 SMART MONEY vs RETAIL:

RETAIL TRADER:
• Buys breakouts (late!)
• Uses tight stops (gets hunted)
• Chases price
• Emotional decisions
• Small positions

SMART MONEY:
• Accumulates before breakout
• Patient entries
• Moves price deliberately
• Calculated moves
• Massive positions

🎯 YOUR GOAL:
Trade WITH smart money, not against them!`
    },
    {
      id: 2,
      title: "Order Blocks & Institutional Levels",
      duration: "28 min",
      points: 120,
      image: "https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=1200&h=600&fit=crop",
      content: `📦 Where Big Money Sits

Order blocks = Where institutions placed huge orders!

🎯 IDENTIFYING ORDER BLOCKS:

Look for:
• Last bullish candle before big move up
• Last bearish candle before big drop
• High volume at these levels
• Price returns to test them

When price revisits = HIGH probability reversal zone!

📊 EXAMPLE:
Bitcoin at $44,000 (order block)
Rallies to $50,000
Returns to $44,500
= BUY ZONE! Institutions defend it!

🏦 HOW BANKS TRADE:
1. Accumulate quietly
2. Let price run
3. Distribute at top
4. Short it down
5. Repeat!

Follow their footprints! 👣`
    },
    {
      id: 3,
      title: "Liquidity Grabs & Stop Hunts",
      duration: "25 min",
      points: 110,
      content: `🎯 The Stop Hunt Game

Smart money HUNTS your stops for liquidity!

💰 HOW IT WORKS:

1. Retail places stops below support ($45,000)
2. Smart money sees these stops
3. They push price to $44,950 (triggers stops!)
4. Absorb all that liquidity
5. Reverse HARD to $47,000! 🚀

Retail: "Why do I always get stopped out?!"
Smart money: *Laughs in millions* 💰

🎯 HOW TO TRADE IT:

✅ EXPECT liquidity grabs!
✅ Place stops with BUFFER
✅ Or wait for grab, THEN enter
✅ Don't place stops at obvious levels

Turn their game against them!`
    },
    {
      id: 4,
      title: "Fair Value Gaps & Imbalances",
      duration: "22 min",
      points: 100,
      content: `🕳️ Price Inefficiencies = Opportunity

Fair Value Gaps (FVG) = Where price moved too fast!

📊 WHAT ARE FVGs?

When price gaps up/down quickly:
• Leaves empty space on chart
• No trading occurred there
• "Unfilled orders" waiting
• Price often returns to fill!

🎯 HOW TO TRADE FVGs:

1. Mark all gaps on chart
2. Price moves away from gap
3. Wait for return to gap
4. Enter when gap gets filled
5. Stop beyond gap
6. Target next structure

Smart money uses these as magnets! 🧲`
    },
    {
      id: 5,
      title: "Market Structure & Break of Structure",
      duration: "26 min",
      points: 115,
      content: `🏗️ Reading Institutional Footprints

Market structure shows WHERE smart money is positioned!

📊 STRUCTURE BASICS:

UPTREND:
Higher Highs (HH)
Higher Lows (HL)
Smart money is LONG!

DOWNTREND:
Lower Highs (LH)
Lower Lows (LL)
Smart money is SHORT!

🎯 BREAK OF STRUCTURE (BOS):

When structure breaks = Smart money changing position!

Example:
Downtrend (LL, LH, LL...)
Price breaks above LH = BOS!
= Institutions flipping LONG!
= Follow them!

📊 CHANGE OF CHARACTER (CHoCH):

Early warning signal!
• Momentum slowing
• Pattern changing
• Prepare for reversal

Catch moves EARLY by watching structure!`
    }
  ];

  return (
    <CoursePage
      courseId="smart-money"
      title="Smart Money Concepts"
      icon="🏦"
      description="Learn how institutions trade! Master order blocks, liquidity grabs, fair value gaps, and market structure to trade alongside the big players."
      level="Advanced"
      totalDuration="2 hours 11 min"
      color="from-emerald-500 to-teal-500"
      lessons={lessons}
    />
  );
}
