"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

interface Message {
  id: string;
  sender: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  unread: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    sender: {
      name: "Alex Trading Pro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
    },
    content: "Hey! Just saw your BTC analysis. Great entry point! Did you take the trade?",
    timestamp: "2 hours ago",
    unread: true
  },
  {
    id: "2",
    sender: {
      name: "Sarah Crypto",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
    },
    content: "Thanks for sharing that EUR/USD setup. I followed it and made 2.5%! 🚀",
    timestamp: "5 hours ago",
    unread: true
  },
  {
    id: "3",
    sender: {
      name: "Mike Trader",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike"
    },
    content: "Can you analyze this Gold chart I'm looking at? I'll send it over.",
    timestamp: "1 day ago",
    unread: false
  },
  {
    id: "4",
    sender: {
      name: "Emily Forex",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily"
    },
    content: "Just enrolled in your Getting Started course! Loving it so far 📚",
    timestamp: "2 days ago",
    unread: false
  }
];

export default function MessagesPage() {
  const { data: session } = useSession();
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");

  const playSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 600;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      playSound();
      alert(`Message sent to ${selectedMessage?.sender.name}!`);
      setReplyText("");
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            💬
          </motion.div>
          <h1 className="text-4xl font-black mb-4">Sign In Required</h1>
          <p className="text-xl text-neutral-300 mb-8">
            You need to sign in to view your messages!
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-black text-lg rounded-full"
            >
              Sign In Now
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-6xl mb-4"
          >
            💬
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
            Messages
          </h1>
          <p className="text-xl text-neutral-300">
            Connect with traders in the community! 🚀
          </p>
        </motion.div>

        {/* Messages Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 overflow-hidden"
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-black">Inbox</h2>
                <p className="text-sm text-neutral-400">
                  {mockMessages.filter(m => m.unread).length} unread
                </p>
              </div>
              
              <div className="divide-y divide-white/10">
                {mockMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      playSound();
                      setSelectedMessage(message);
                    }}
                    className={`p-4 cursor-pointer hover:bg-white/5 transition-all ${
                      selectedMessage?.id === message.id ? 'bg-white/10' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={message.sender.avatar}
                        alt={message.sender.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-sm truncate">
                            {message.sender.name}
                          </h3>
                          {message.unread && (
                            <div className="w-2 h-2 bg-[#FFD700] rounded-full" />
                          )}
                        </div>
                        <p className="text-xs text-neutral-400 truncate">
                          {message.content}
                        </p>
                        <p className="text-xs text-neutral-500 mt-1">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl border border-white/20 h-[600px] flex flex-col"
            >
              {selectedMessage ? (
                <>
                  {/* Header */}
                  <div className="p-6 border-b border-white/10 flex items-center gap-4">
                    <img
                      src={selectedMessage.sender.avatar}
                      alt={selectedMessage.sender.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div>
                      <h2 className="text-2xl font-black">
                        {selectedMessage.sender.name}
                      </h2>
                      <p className="text-sm text-neutral-400">
                        {selectedMessage.timestamp}
                      </p>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 p-6 overflow-y-auto">
                    <div className="bg-white/5 rounded-2xl p-4 mb-4">
                      <p className="text-neutral-200">{selectedMessage.content}</p>
                    </div>

                    {/* Mock Previous Messages */}
                    <div className="space-y-4 mt-6">
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-2xl p-4 max-w-[80%]">
                          <p>Hey! Thanks for reaching out 👋</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reply Input */}
                  <div className="p-6 border-t border-white/10">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                        placeholder="Type your message..."
                        className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendReply}
                        className="px-6 py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-black rounded-xl"
                      >
                        Send
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-center p-6">
                  <div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-6xl mb-4"
                    >
                      💬
                    </motion.div>
                    <h3 className="text-2xl font-black mb-2">No Message Selected</h3>
                    <p className="text-neutral-400">
                      Choose a conversation from the left to get started!
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black mb-3">Want to message someone?</h2>
            <p className="text-neutral-300 mb-6">
              Go to the community feed and click on any trader's profile to start a conversation!
            </p>
            <Link href="/community">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-black rounded-full"
              >
                Go to Community
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
