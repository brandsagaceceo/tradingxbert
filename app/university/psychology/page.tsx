"use client";

import CoursePage from "@/components/CoursePage";

export default function PsychologyCourse() {
  const lessons = [
    {
      id: 1,
      title: "The Psychology of Winning Traders",
      duration: "30 min",
      points: 125,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=600&fit=crop",
      content: `🧠 Master Your Mind, Master the Markets

95% of trading success is mental! Technical skills mean NOTHING without the right mindset.

🎯 THE TRADER'S MINDSET:

LOSING TRADER:
❌ "I need to win every trade"
❌ "That loss was the market's fault"
❌ "I'll revenge trade to get it back"
❌ Emotional decisions
❌ No discipline

WINNING TRADER:
✅ "I execute my edge probabilistically"
✅ "Losses are part of the game"
✅ "I follow my plan religiously"
✅ Logical decisions
✅ Iron discipline

The difference? PSYCHOLOGY! 🧠`
    },
    {
      id: 2,
      title: "Controlling Fear & Greed",
      duration: "25 min",
      points: 100,
      image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=1200&h=600&fit=crop",
      content: `😱 The Two Emotions That Destroy Traders

Fear and Greed will RUIN you if uncontrolled!

💰 GREED PROBLEMS:
• Taking too much risk
• Over-leveraging
• Not taking profits
• FOMOing into trades
• Moving stop losses

😰 FEAR PROBLEMS:
• Taking profits too early
• Not entering good setups
• Closing trades prematurely
• Revenge trading after loss
• Analysis paralysis

🎯 THE SOLUTION:
Follow your SYSTEM! Every time!`
    },
    {
      id: 3,
      title: "Building Discipline & Consistency",
      duration: "28 min",
      points: 120,
      content: `🎯 Discipline = Freedom

Discipline isn't restriction - it's what allows you to succeed!

📊 THE DISCIPLINE FRAMEWORK:

1. WRITTEN RULES
   - Document everything
   - No ambiguity
   - Clear criteria
   
2. PRE-TRADE CHECKLIST
   - Does it meet ALL criteria?
   - Yes = Trade
   - No = Pass

3. POST-TRADE REVIEW
   - Did I follow rules?
   - Grade yourself
   - Improve continuously

🏆 CONSISTENCY BEATS PERFECTION!

Better to execute B-setups consistently than wait for perfect A+ setups you never take!`
    },
    {
      id: 4,
      title: "Overcoming Trading Mistakes",
      duration: "22 min",
      points: 90,
      content: `🚫 Common Psychological Traps

Learn the mistakes BEFORE you make them!

❌ TRAP #1: Revenge Trading
Lost money → Angry → Bad trade → More loss
SOLUTION: Walk away after 2 losses!

❌ TRAP #2: FOMO
Price running → Jump in → Buy the top
SOLUTION: "There's always another trade"

❌ TRAP #3: Hope
Losing trade → "It'll come back" → Bigger loss
SOLUTION: Stop = Stop! Honor it!

❌ TRAP #4: Overconfidence
Win streak → Take more risk → Blow up
SOLUTION: Keep risk consistent!

Learn these patterns and catch yourself!`
    },
    {
      id: 5,
      title: "Building a Trader's Routine",
      duration: "25 min",
      points: 100,
      content: `📋 Your Daily Success System

Professional traders have routines - so should you!

🌅 MORNING ROUTINE:
• Review news & calendar
• Check overall market
• Scan for setups
• Set alerts
• Visualize success

📊 TRADING SESSION:
• Follow checklist
• Execute setups only
• Take breaks every hour
• Stay hydrated
• Don't overtrade

🌙 EVENING ROUTINE:
• Journal trades
• Review mistakes
• Study one concept
• Plan tomorrow
• Disconnect

Routine eliminates decisions → Less stress → Better results!`
    }
  ];

  return (
    <CoursePage
      courseId="psychology"
      title="Trading Psychology & Mindset"
      icon="🧠"
      description="Master your emotions, build unshakeable discipline, and develop the winning mindset that separates profitable traders from the rest."
      level="All Levels"
      totalDuration="2 hours 10 min"
      color="from-indigo-500 to-purple-500"
      lessons={lessons}
    />
  );
}
