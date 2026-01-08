"use client";

import CoursePage from "@/components/CoursePage";

export default function SpotGoodTradesCourse() {
  const lessons = [
    {
      id: 1,
      title: "High Probability Setup Recognition",
      duration: "28 min",
      points: 120,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop",
      content: `🎯 Spotting A+ Trading Opportunities

Not all setups are equal! Learn to identify the BEST trades!

📊 A+ SETUP CHECKLIST:

✅ Trend Direction
- Higher timeframe uptrend? Check!

✅ Key Level
- At support/resistance? Check!

✅ Confluence
- Multiple reasons align? Check!

✅ Confirmation
- Bullish pattern forms? Check!

✅ Volume
- Increasing on move? Check!

✅ Risk/Reward
- Minimum 1:2 R:R? Check!

ALL 6 = A+ setup! 🏆
4-5 = B setup (tradeable)
<4 = Pass!

🎯 EXAMPLE A+ SETUP:
• Weekly uptrend ✅
• Daily at 61.8% Fib ✅
• Order block zone ✅
• Bullish engulfing ✅
• Volume spike ✅
• 1:3 R:R ✅

PERFECT! Trade it with confidence!`
    },
    {
      id: 2,
      title: "Confluence Trading",
      duration: "25 min",
      points: 110,
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=600&fit=crop",
      content: `🎯 When Everything Aligns = MAGIC!

Confluence = Multiple factors at same level!

📊 TYPES OF CONFLUENCE:

1. FIBONACCI + SUPPORT
   61.8% level at old support = 2x strong!

2. MOVING AVERAGE + TRENDLINE
   50 MA meets trendline = Power zone!

3. ORDER BLOCK + ROUND NUMBER
   OB at $50,000 = Institutional + Psychological!

4. MULTIPLE TIMEFRAME S/R
   Daily AND weekly resistance = Major level!

5. FVG + DEMAND ZONE
   Gap meets demand = High probability!

🏆 TRIPLE CONFLUENCE:
When 3+ factors align = Highest probability!

Example:
• Fibonacci 61.8%
• Previous resistance (now support)
• 200 EMA
• Order block

ALL at $45,000 = 🔥🔥🔥 TRADE IT!`
    },
    {
      id: 3,
      title: "Reading Price Action Like a Pro",
      duration: "30 min",
      points: 125,
      content: `📊 The Language of Markets

Price action tells you EVERYTHING if you know how to read it!

🎯 BULLISH PRICE ACTION:

✅ Strong green candles
✅ Small red candles (weak selling)
✅ Higher lows forming
✅ Breaking resistance easily
✅ Long lower wicks (rejection down)
✅ Closing near highs

= Bulls in control! 📈

🎯 BEARISH PRICE ACTION:

⚠️ Strong red candles
⚠️ Small green candles (weak buying)
⚠️ Lower highs forming
⚠️ Rejecting at resistance
⚠️ Long upper wicks (rejection up)
⚠️ Closing near lows

= Bears in control! 📉

🎯 INDECISION:

• Doji candles
• Small bodies
• Long wicks both sides
• Tight range

= Wait for clarity!

📊 PRO TIP:
Price action > Indicators!
When they conflict, trust price action!`
    },
    {
      id: 4,
      title: "Timing Your Entries Perfectly",
      duration: "22 min",
      points: 95,
      content: `⏰ Entry Timing is EVERYTHING!

Right trade, wrong time = Loss!
Right trade, right time = Profit! 💰

🎯 THE THREE-STEP ENTRY:

STEP 1: IDENTIFY ZONE
Mark your entry area (not exact price!)

STEP 2: WAIT FOR PRICE
Don't chase! Let it come to you!

STEP 3: CONFIRMATION
Wait for signal:
• Bullish candle pattern
• Volume increase
• Indicator confirmation

THEN enter!

⚠️ DON'T:
❌ Enter early (FOMO)
❌ Enter late (chasing)
❌ Enter without confirmation

✅ DO:
✅ Wait patiently
✅ Enter at planned level
✅ With confirmation

Patience = Profits!`
    },
    {
      id: 5,
      title: "Avoiding False Signals",
      duration: "20 min",
      points: 85,
      content: `🚫 Dodging Fake-Outs and Traps

Not every signal is real! Learn to spot fakes!

⚠️ FALSE SIGNAL RED FLAGS:

1. LOW VOLUME
   Real moves have volume!
   Low volume = Suspicious!

2. AGAINST TREND
   Counter-trend signals fail more
   Trade WITH trend!

3. NO CONFLUENCE
   Single reason = Weak signal
   Multiple reasons = Strong!

4. CHOPPY MARKET
   Sideways grinding
   Wait for clarity!

5. NEWS PENDING
   Major announcement coming
   Wait for reaction!

🎯 CONFIRMATION CHECKLIST:

Before entering, ask:
• Is volume supporting this?
• Does higher TF agree?
• Any confluence?
• Is market clear or choppy?
• Any news risk?

3+ YES = Go ahead!
<3 = Wait!

Better to miss trade than lose money!`
    }
  ];

  return (
    <CoursePage
      courseId="spot-good-trades"
      title="How to Spot Good Trades"
      icon="🎯"
      description="Develop a sharp eye for high-probability setups. Learn to identify A+ trades using confluence, price action, and perfect entry timing."
      level="Intermediate"
      totalDuration="2 hours 5 min"
      color="from-yellow-500 to-orange-500"
      lessons={lessons}
    />
  );
}
