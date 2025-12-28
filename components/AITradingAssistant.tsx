"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function AITradingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hey! I'm TradingXbert AI, your trading assistant! I can help you:\n\n• Analyze your current trades\n• Answer trading questions\n• Suggest when to upload screenshots for analysis\n• Provide market insights\n\nHow can I help you today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const playSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 500;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Smart responses based on keywords
    if (lowerMessage.includes('analyze') || lowerMessage.includes('chart') || lowerMessage.includes('screenshot')) {
      return "📊 Great! To analyze your chart:\n\n1. Take a screenshot of your trading chart (include timeframe, price, and indicators)\n2. Click the upload button on the home page\n3. I'll analyze it and give you:\n   • Entry/Exit signals\n   • Risk/Reward analysis\n   • Key support/resistance levels\n   • Trade recommendations\n\nWant me to help you prepare for a specific trade?";
    }
    
    if (lowerMessage.includes('5 minute') || lowerMessage.includes('5m') || lowerMessage.includes('timeframe')) {
      return "⏱️ For 5-minute timeframe analysis:\n\n1. Open your trading platform\n2. Switch to 5-minute chart\n3. Make sure it shows:\n   • Recent price action (last 2-4 hours)\n   • Volume bars\n   • Current price clearly visible\n4. Take screenshot and upload\n\nI'll analyze momentum, trends, and give you actionable signals! Ready to upload?";
    }
    
    if (lowerMessage.includes('hold') || lowerMessage.includes('holding') || lowerMessage.includes('exit')) {
      return "💎 Holding a trade? Here's what to monitor:\n\n✅ Take Profit Signals:\n• Price approaching resistance\n• Momentum weakening\n• Reversal candle patterns\n\n❌ Stop Loss Signals:\n• Price breaking support\n• Strong opposite momentum\n• News events against your position\n\nUpload a 5-minute chart so I can give you specific advice on YOUR trade!";
    }
    
    if (lowerMessage.includes('long') || lowerMessage.includes('buy')) {
      return "📈 Looking to go LONG? Check these before entering:\n\n1. Is price above key support?\n2. Is trend pointing up on higher timeframe?\n3. Is there volume confirmation?\n4. Where will you place stop loss?\n5. What's your target (risk:reward minimum 1:2)?\n\nUpload your chart and I'll confirm if it's a good LONG setup!";
    }
    
    if (lowerMessage.includes('short') || lowerMessage.includes('sell')) {
      return "📉 Looking to go SHORT? Verify these:\n\n1. Is price below key resistance?\n2. Is trend pointing down on higher timeframe?\n3. Is there bearish momentum?\n4. Where will you place stop loss?\n5. What's your target?\n\nShow me your chart - I'll tell you if it's a solid SHORT opportunity!";
    }
    
    if (lowerMessage.includes('risk') || lowerMessage.includes('stop loss') || lowerMessage.includes('sl')) {
      return "🛡️ Risk Management is KEY! Here's my advice:\n\n• Risk only 1-2% per trade\n• Always use stop losses\n• Aim for minimum 1:2 risk:reward\n• Never move stop loss against your position\n• Cut losses quickly, let winners run\n\nUpload your chart with entry and stop loss marked, I'll calculate your position size!";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      return "🤖 I'm here to help! I can:\n\n1. 📊 Analyze your charts (upload screenshots)\n2. 💡 Answer trading questions\n3. 🎯 Help you find entry/exit points\n4. 📈 Explain market conditions\n5. 🛡️ Advise on risk management\n\nJust ask me anything or upload a chart to get started!";
    }
    
    if (lowerMessage.includes('winning') || lowerMessage.includes('profit')) {
      return "💰 Want more winning trades?\n\n🎯 Pro Tips:\n1. Wait for confirmation (don't jump in early)\n2. Trade with the trend\n3. Use multiple timeframe analysis\n4. Let your winners run\n5. Cut losses fast\n\nUpload your recent trade charts - I'll help you identify what worked and what didn't!";
    }
    
    // Default responses
    const defaultResponses = [
      "🤔 Interesting question! For the best advice, upload a chart screenshot of what you're looking at. I can give you specific analysis based on YOUR setup!",
      "💡 I can help with that! To give you the most accurate advice, show me your chart. Upload it on the home page and I'll analyze it immediately!",
      "📊 Great question! The best way I can help is by analyzing your actual chart. Upload a screenshot and I'll give you detailed insights!",
      "🎯 I'm here to help! For specific advice on your trade, upload a 5-minute or 1-hour chart screenshot. I'll tell you exactly what to do next!"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    playSound();

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      playSound();
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(input),
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          playSound();
          setIsOpen(!isOpen);
        }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full shadow-2xl shadow-[#6366F1]/50 flex items-center justify-center z-50 cursor-pointer"
      >
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-3xl"
        >
          {isOpen ? '✕' : '🤖'}
        </motion.span>
        
        {/* Notification Dot */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
          />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-28 right-8 w-96 h-[600px] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-3xl border border-[#6366F1]/30 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] p-4 flex items-center gap-3">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                🤖
              </motion.span>
              <div>
                <h3 className="font-black text-white">TradingXbert AI</h3>
                <p className="text-xs text-white/80">Always here to help!</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/10 p-3 rounded-2xl">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="flex gap-1"
                    >
                      <span className="w-2 h-2 bg-white rounded-full" />
                      <span className="w-2 h-2 bg-white rounded-full" />
                      <span className="w-2 h-2 bg-white rounded-full" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6366F1]"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  className="px-4 py-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold rounded-xl"
                >
                  Send
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
