"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Lesson {
  id: number;
  title: string;
  duration: string;
  content: string;
  points: number;
  image?: string;
}

interface CoursePageProps {
  courseId: string;
  title: string;
  icon: string;
  description: string;
  level: string;
  totalDuration: string;
  color: string;
  lessons: Lesson[];
}

export default function CoursePage({ courseId, title, icon, description, level, totalDuration, color, lessons }: CoursePageProps) {
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
  const [currentLesson, setCurrentLesson] = useState<number>(1);
  const [showCertificate, setShowCertificate] = useState(false);

  // Load completed lessons from localStorage on mount
  useEffect(() => {
    const savedCompleted = localStorage.getItem(`course_${courseId}_completed`);
    if (savedCompleted) {
      try {
        const completed = JSON.parse(savedCompleted);
        setCompletedLessons(new Set(completed));
        
        // Check if course was already completed
        if (completed.length === lessons.length) {
          setShowCertificate(true);
        }
      } catch (err) {
        console.error('Error loading completed lessons:', err);
      }
    }
    
    // Update last active date for streak tracking
    const today = new Date().toDateString();
    const lastActive = localStorage.getItem('tradingxbert_last_active');
    
    if (lastActive !== today) {
      // Update streak
      const lastDate = lastActive ? new Date(lastActive) : null;
      const currentStreak = parseInt(localStorage.getItem('tradingxbert_streak') || '0');
      
      if (lastDate) {
        const daysDiff = Math.floor((new Date().getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (daysDiff === 1) {
          // Consecutive day
          localStorage.setItem('tradingxbert_streak', (currentStreak + 1).toString());
        } else if (daysDiff > 1) {
          // Streak broken
          localStorage.setItem('tradingxbert_streak', '1');
        }
      } else {
        // First time
        localStorage.setItem('tradingxbert_streak', '1');
      }
      
      localStorage.setItem('tradingxbert_last_active', today);
    }
  }, [courseId, lessons.length]);

  const handleCompleteLesson = (lessonId: number) => {
    if (completedLessons.has(lessonId)) return; // Already completed
    
    const newCompleted = new Set(completedLessons);
    newCompleted.add(lessonId);
    setCompletedLessons(newCompleted);
    
    // Save to localStorage
    localStorage.setItem(`course_${courseId}_completed`, JSON.stringify(Array.from(newCompleted)));
    
    // Calculate points
    const lesson = lessons.find(l => l.id === lessonId);
    if (lesson) {
      const currentPoints = parseInt(localStorage.getItem('tradingxbert_points') || '0');
      const newPoints = currentPoints + lesson.points;
      localStorage.setItem('tradingxbert_points', newPoints.toString());
      
      // Show points earned notification
      console.log(`✅ Earned ${lesson.points} points! Total: ${newPoints}`);
    }
    
    // Check if course is complete
    if (newCompleted.size === lessons.length) {
      setShowCertificate(true);
      const currentPoints = parseInt(localStorage.getItem('tradingxbert_points') || '0');
      const bonusPoints = 500;
      const newPoints = currentPoints + bonusPoints;
      localStorage.setItem('tradingxbert_points', newPoints.toString());
      
      // Track course completion
      const completedCourses = JSON.parse(localStorage.getItem('tradingxbert_completed_courses') || '[]');
      if (!completedCourses.includes(courseId)) {
        completedCourses.push(courseId);
        localStorage.setItem('tradingxbert_completed_courses', JSON.stringify(completedCourses));
      }
      
      console.log(`🎉 Course completed! Bonus ${bonusPoints} points! Total: ${newPoints}`);
    }
  };

  const currentLessonData = lessons.find(l => l.id === currentLesson);
  const progress = (completedLessons.size / lessons.length) * 100;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0A0A0F] via-[#1a1a2e] to-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/university" className="text-[#FFD700] hover:underline">
            ← Back to University
          </Link>
        </motion.div>

        {/* Course Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-8xl mb-4"
          >
            {icon}
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">{title}</h1>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto mb-6">{description}</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <span className={`px-4 py-2 bg-gradient-to-r ${color} text-white rounded-full font-bold`}>
              {level}
            </span>
            <span className="px-4 py-2 bg-white/10 text-white rounded-full">
              ⏱️ {totalDuration}
            </span>
            <span className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30 font-bold">
              🎯 {completedLessons.size}/{lessons.length} Completed
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="flex justify-between text-sm text-neutral-400 mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full bg-gradient-to-r ${color}`}
              />
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lessons Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">📚 Lessons</h3>
              <div className="space-y-2">
                {lessons.map((lesson) => (
                  <motion.button
                    key={lesson.id}
                    whileHover={{ scale: 1.02, x: 5 }}
                    onClick={() => setCurrentLesson(lesson.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all ${
                      currentLesson === lesson.id
                        ? `bg-gradient-to-r ${color} text-white`
                        : 'bg-white/5 text-neutral-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm">Lesson {lesson.id}</span>
                      {completedLessons.has(lesson.id) && (
                        <span className="text-emerald-400">✓</span>
                      )}
                    </div>
                    <p className="text-xs opacity-80">{lesson.title}</p>
                    <p className="text-xs opacity-60 mt-1">{lesson.duration}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2">
            {currentLessonData && (
              <motion.div
                key={currentLesson}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      Lesson {currentLessonData.id}: {currentLessonData.title}
                    </h2>
                    <p className="text-neutral-400">{currentLessonData.duration} • {currentLessonData.points} points</p>
                  </div>
                  {completedLessons.has(currentLesson) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-5xl"
                    >
                      ✅
                    </motion.div>
                  )}
                </div>

                {/* Lesson Image */}
                {currentLessonData.image && (
                  <div className="mb-8 rounded-2xl overflow-hidden">
                    <img 
                      src={currentLessonData.image} 
                      alt={currentLessonData.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}

                <div className="prose prose-invert max-w-none mb-8">
                  <div className="text-neutral-200 leading-relaxed whitespace-pre-line text-lg">
                    {currentLessonData.content}
                  </div>
                </div>

                <div className="flex gap-4">
                  {!completedLessons.has(currentLesson) && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCompleteLesson(currentLesson)}
                      className={`flex-1 py-4 bg-gradient-to-r ${color} text-white font-bold rounded-xl hover:shadow-lg transition-all`}
                    >
                      ✓ Mark Complete & Earn {currentLessonData.points} Points
                    </motion.button>
                  )}
                  
                  {currentLesson < lessons.length && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentLesson(currentLesson + 1)}
                      className="flex-1 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                    >
                      Next Lesson →
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Certificate Modal */}
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowCertificate(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 backdrop-blur-xl rounded-3xl border-4 border-[#FFD700] p-12 max-w-2xl text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2 }}
                className="text-9xl mb-6"
              >
                🏆
              </motion.div>
              <h2 className="text-5xl font-black text-[#FFD700] mb-4">
                Congratulations!
              </h2>
              <p className="text-2xl text-white mb-6">
                You've completed: <strong>{title}</strong>
              </p>
              <p className="text-xl text-emerald-400 font-bold mb-8">
                +500 Bonus Points! 🎉
              </p>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCertificate(false)}
                className="px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-black rounded-xl text-lg"
              >
                Continue Learning →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
