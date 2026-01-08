"use client";

import CoursePage from "@/components/CoursePage";

export default function CryptoTradingCourse() {
  const lessons = [
    {
      id: 1,
      title: "Crypto Market Fundamentals",
      duration: "25 min",
      points: 100,
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&h=600&fit=crop",
      content: `🪙 Welcome to Cryptocurrency Trading

The crypto market is unlike any other - it's 24/7, highly volatile, and full of opportunities!

🎯 WHY CRYPTO IS DIFFERENT:

• 24/7 Trading (never closes!)
• High volatility (10%+ moves common)
• Lower barriers to entry
• Global accessibility
• Decentralized (no central authority)

💰 TOP CRYPTOCURRENCIES:

1. Bitcoin (BTC) - Digital gold, store of value
2. Ethereum (ETH) - Smart contracts platform
3. Altcoins - Thousands of alternatives

Each has different characteristics and trading strategies!`
    },
    {
      id: 2,
      title: "Bitcoin-Specific Trading Strategies",
      duration: "30 min",
      points: 125,
      image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=1200&h=600&fit=crop",
      content: `₿ Mastering Bitcoin Trading

Bitcoin dominates crypto - master it first!

🎯 BITCOIN CHARACTERISTICS:

• Most liquid cryptocurrency
• Leads the market direction
• Less volatile than altcoins
• Best for beginners
• Institutional involvement

📊 TRADING STRATEGIES:

1. Halving Cycles (Every 4 years)
2. Weekend patterns
3. Asia/US market timing
4. Whale watching
5. Fear & Greed index

Bitcoin moves in cycles - learn to identify them!`
    },
    {
      id: 3,
      title: "Altcoin Trading & Selection",
      duration: "28 min",
      points: 120,
      image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&h=600&fit=crop",
      content: `🚀 Alt Season Trading

Altcoins can 10x... or go to zero! Learn to pick winners.

🎯 WHAT TO LOOK FOR:

• Strong development team
• Real use case
• Active community
• Good tokenomics
• Exchange listings
• Partnership announcements

⚠️ RED FLAGS:
• Anonymous team
• No working product
• Promises of guaranteed returns
• Pump and dump groups

Do your research! DYOR (Do Your Own Research) is crypto law!`
    },
    {
      id: 4,
      title: "DeFi & NFT Trading",
      duration: "25 min",
      points: 100,
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=600&fit=crop",
      content: `🌐 Decentralized Finance & NFTs

The cutting edge of crypto trading!

📊 DeFi BASICS:
• Yield farming
• Liquidity providing
• Staking rewards
• DEX trading
• Smart contract risks

🎨 NFT TRADING:
• Collections vs one-offs
• Rarity tools
• Floor price analysis
• Flipping strategies

High risk, high reward space - start small!`
    },
    {
      id: 5,
      title: "Crypto Risk Management",
      duration: "22 min",
      points: 110,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop",
      content: `🛡️ Protecting Your Crypto

Crypto trading has unique risks - learn to manage them!

⚠️ CRYPTO-SPECIFIC RISKS:

1. EXCHANGE RISK
   - Keep crypto in personal wallet
   - "Not your keys, not your coins"

2. VOLATILITY RISK
   - Use smaller position sizes
   - Crypto moves 3-5x faster than stocks

3. LIQUIDATION RISK
   - Leverage can wipe you out
   - Start with spot trading

4. SCAM RISK
   - Verify contracts
   - Use reputable exchanges
   - Never share private keys

📊 POSITION SIZING FOR CRYPTO:
Risk only 1-2% per trade (not 2-5% like stocks)!

Crypto volatility is INSANE - respect it!`
    }
  ];

  return (
    <CoursePage
      courseId="crypto-trading"
      title="Cryptocurrency Trading Masterclass"
      icon="🪙"
      description="Master Bitcoin, altcoins, DeFi, and NFT trading. Learn crypto-specific strategies, wallet management, and risk controls for this 24/7 volatile market."
      level="Intermediate"
      totalDuration="2 hours 10 min"
      color="from-orange-500 to-yellow-500"
      lessons={lessons}
    />
  );
}
