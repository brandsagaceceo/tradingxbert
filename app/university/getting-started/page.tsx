"use client";

import CoursePage from "@/components/CoursePage";

export default function GettingStartedCourse() {
  const lessons = [
    {
      id: 1,
      title: "Welcome to Trading - Your First Steps",
      duration: "15 min",
      points: 50,
      content: `🎯 Welcome to Your Trading Journey!

You're about to embark on an exciting journey into the world of trading. Whether you want to trade stocks, crypto, forex, or commodities, this course will give you the foundation you need.

📚 What You'll Learn:
• What trading actually is and how markets work
• Different types of markets and instruments
• How to think like a professional trader
• Common mistakes beginners make (and how to avoid them)

💡 Trading Mindset:
Trading is NOT gambling. It's a skill that combines:
- Technical analysis (reading charts)
- Risk management (protecting your money)
- Psychology (controlling emotions)
- Strategy (having a plan)

🎓 Key Takeaway:
Successful traders are made, not born. With the right education, practice, and mindset, anyone can learn to trade profitably.

✨ Fun Fact:
Did you know? The first stock market was created in Amsterdam in 1602. Trading has been around for over 400 years!

Ready to learn more? Let's dive in!`
    },
    {
      id: 2,
      title: "Understanding Market Basics",
      duration: "20 min",
      points: 75,
      content: `📊 How Markets Work

Markets are simply places where buyers and sellers meet to exchange assets. When more people want to buy (demand), prices go up. When more want to sell (supply), prices go down.

🌐 Types of Markets:

1. STOCK MARKET 📈
   - Buying shares of companies
   - Examples: Apple, Tesla, Microsoft
   - Trading hours: 9:30 AM - 4:00 PM EST
   - Best for: Long-term investing

2. FOREX (Currency Market) 💱
   - Trading currency pairs (EUR/USD, GBP/USD)
   - 24 hours, 5 days a week
   - Highest liquidity in the world
   - Best for: Short-term trading

3. CRYPTOCURRENCY 🪙
   - Digital currencies (Bitcoin, Ethereum)
   - 24/7 trading
   - High volatility
   - Best for: Tech-savvy traders

4. COMMODITIES 🛢️
   - Physical goods (Gold, Oil, Silver)
   - Futures and spot markets
   - Hedge against inflation
   - Best for: Diversification

💰 Market Participants:
• Retail Traders (us!)
• Institutional Traders (banks, hedge funds)
• Market Makers (provide liquidity)
• Central Banks (set interest rates)

🎯 Action Step:
Choose ONE market to focus on initially. Don't try to master everything at once!`
    },
    {
      id: 3,
      title: "Setting Up Your First Trading Account",
      duration: "25 min",
      points: 100,
      content: `🏦 Choosing the Right Broker

A broker is your gateway to the markets. Here's how to choose:

✅ What to Look For:
• Regulation (Is it licensed? Check SEC, FCA, ASIC)
• Low fees (spreads, commissions)
• Good platform (easy to use)
• Fast execution
• Reliable customer support
• Demo account available

📱 Popular Brokers by Market:

STOCKS:
• Interactive Brokers (professional)
• TD Ameritrade (beginner-friendly)
• Robinhood (commission-free)

FOREX:
• OANDA (regulated, great for beginners)
• IG Group (professional tools)
• Forex.com (good spreads)

CRYPTO:
• Coinbase (easiest for beginners)
• Binance (lowest fees)
• Kraken (advanced features)

🛡️ Account Types:

1. DEMO ACCOUNT (Start Here!)
   - Virtual money ($10,000-$100,000)
   - Real market conditions
   - No risk
   - Practice strategies

2. CASH ACCOUNT
   - Your own money
   - No leverage
   - Safest option
   - Good for beginners

3. MARGIN ACCOUNT
   - Borrow money from broker
   - Higher risk AND reward
   - Only for experienced traders

⚠️ IMPORTANT Safety Tips:
• Start with a demo account
• Never deposit more than you can afford to lose
• Use 2-factor authentication
• Keep your passwords secure
• Be wary of scams promising "guaranteed returns"

💡 Pro Tip:
Open accounts with 2-3 brokers. Compare them with demo accounts before depositing real money.`
    },
    {
      id: 4,
      title: "Essential Trading Terminology",
      duration: "20 min",
      points: 75,
      content: `📖 Trading Language Made Simple

Let's learn the essential terms you'll hear EVERY day in trading:

📊 PRICE TERMS:
• BID - Price buyers are willing to pay
• ASK - Price sellers are willing to accept
• SPREAD - Difference between bid and ask
• PIP - Smallest price movement (forex)
• TICK - Smallest price movement (stocks/futures)

💹 POSITION TYPES:
• LONG - Buying (betting price goes UP) 📈
• SHORT - Selling (betting price goes DOWN) 📉
• FLAT - No position (sitting on sidelines)

⏱️ TIMEFRAMES:
• SCALPING - Seconds to minutes (5m, 15m charts)
• DAY TRADING - Hours (1H, 4H charts)
• SWING TRADING - Days to weeks (Daily charts)
• POSITION TRADING - Months to years (Weekly/Monthly)

💰 MONEY TERMS:
• EQUITY - Total account value
• MARGIN - Money needed to open position
• LEVERAGE - Borrowed money (e.g., 1:100)
• P&L - Profit and Loss
• DRAWDOWN - Loss from peak

📐 ORDER TYPES:
• MARKET ORDER - Buy/sell NOW at current price
• LIMIT ORDER - Buy/sell at specific price
• STOP LOSS - Auto-close to limit losses
• TAKE PROFIT - Auto-close to lock in gains

🎯 TRADE SETUP TERMS:
• ENTRY - Where you enter trade
• EXIT - Where you close trade
• RISK/REWARD - How much you risk vs. potential profit
• WIN RATE - Percentage of winning trades

💡 Example Trade:
"I'm going LONG on BTC/USD at $45,000 with a STOP LOSS at $44,000 and TAKE PROFIT at $48,000. My RISK/REWARD is 1:3."

Translation: Buying Bitcoin at $45k, willing to lose $1k to potentially make $3k.

🎓 Pro Tip:
Don't be intimidated! You'll learn these naturally as you practice. Keep this lesson as a reference!`
    },
    {
      id: 5,
      title: "How to Read Price Charts",
      duration: "30 min",
      points: 100,
      content: `📈 Mastering Charts - Your Trading Map

Charts show price movement over time. They're your #1 tool for making decisions!

📊 CHART TYPES:

1. LINE CHART (Simplest)
   - Shows closing prices connected
   - Good for: Quick overview
   - Not recommended for trading

2. BAR CHART (More Info)
   - Shows Open, High, Low, Close (OHLC)
   - Vertical line = High to Low
   - Left dash = Open
   - Right dash = Close

3. CANDLESTICK CHART (BEST!) 🕯️
   - Same info as bars but visual
   - Body = Open to Close
   - Wicks = Highs and Lows
   - Green = Price went up
   - Red = Price went down

🕯️ CANDLESTICK ANATOMY:

GREEN CANDLE (Bullish):
━━━━━  ← Upper Wick (High)
┃      ┃
┃GREEN┃  ← Body (Open to Close)
┃      ┃
━━━━━  ← Lower Wick (Low)

• Bottom of body = Opening price
• Top of body = Closing price
• Buyers were in control!

RED CANDLE (Bearish):
━━━━━  ← Upper Wick (High)
┃      ┃
┃ RED  ┃  ← Body (Open to Close)
┃      ┃
━━━━━  ← Lower Wick (Low)

• Top of body = Opening price
• Bottom of body = Closing price
• Sellers were in control!

📅 TIMEFRAMES:
• 1m, 5m, 15m - For scalpers
• 1H, 4H - For day traders
• 1D - For swing traders
• 1W, 1M - For position traders

🎯 WHAT TO LOOK FOR:
• Trend direction (up, down, or sideways)
• Support levels (where price bounces UP)
• Resistance levels (where price bounces DOWN)
• Patterns forming
• Volume (how many trades)

💡 Practice Exercise:
Open TradingView.com (free), pick any chart, and try to identify:
1. Is the trend up or down?
2. Where are the recent highs and lows?
3. Are candles mostly green or red?

You're building your chart reading skills!`
    },
    {
      id: 6,
      title: "Understanding Candlestick Patterns",
      duration: "35 min",
      points: 125,
      content: `🕯️ Candlestick Patterns - Reading Market Psychology

Patterns tell you what buyers and sellers are thinking. Master these and you'll have a huge edge!

🟢 BULLISH PATTERNS (Price Going UP):

1. HAMMER 🔨
   - Small body at top
   - Long lower wick (2-3x body)
   - Shows rejection of lower prices
   - Buyers stepped in!

2. ENGULFING PATTERN
   - Small red candle
   - Followed by BIG green candle
   - Green completely covers red
   - Strong bullish reversal!

3. MORNING STAR ⭐
   - Red candle
   - Small doji/candle
   - Big green candle
   - Three-candle reversal pattern

🔴 BEARISH PATTERNS (Price Going DOWN):

1. SHOOTING STAR 💫
   - Small body at bottom
   - Long upper wick
   - Shows rejection of higher prices
   - Sellers took control!

2. BEARISH ENGULFING
   - Small green candle
   - Followed by BIG red candle
   - Red completely covers green
   - Strong bearish reversal!

3. EVENING STAR 🌙
   - Green candle
   - Small doji/candle
   - Big red candle
   - Three-candle reversal pattern

⚖️ INDECISION PATTERNS:

1. DOJI
   - Open = Close (tiny body)
   - Shows battle between buyers/sellers
   - Often precedes big moves
   - Wait for confirmation!

2. SPINNING TOP
   - Small body in middle
   - Long wicks both sides
   - Indecision in market
   - Trend may be weakening

🎯 HOW TO USE PATTERNS:

Step 1: Identify the trend
Step 2: Look for pattern at support/resistance
Step 3: Wait for pattern to complete
Step 4: Enter on next candle
Step 5: Set stop loss beyond pattern

⚠️ IMPORTANT RULES:
• Patterns work BETTER with trend
• Always use with support/resistance
• One pattern ≠ guaranteed trade
• Combine with other indicators
• Practice pattern recognition daily

💡 Pro Tip:
Screenshot patterns you see, note what happened next. Build your own pattern library!

🎓 Homework:
Find 5 examples of each pattern on real charts. This is how pros learn!`
    }
  ];

  return (
    <CoursePage
      courseId="getting-started"
      title="Getting Started with Trading"
      icon="🚀"
      description="Your complete beginner's guide to understanding trading fundamentals and taking your first steps in the markets."
      level="Beginner"
      totalDuration="2 hours 25 min"
      color="from-blue-500 to-cyan-500"
      lessons={lessons}
    />
  );
}
