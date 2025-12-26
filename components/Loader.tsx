// /components/Loader.tsx
export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-32 h-32 mb-6">
        {/* Animated Rocket */}
        <div className="absolute inset-0 flex items-center justify-center animate-bounce">
          <div className="text-7xl filter drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]">
            🚀
          </div>
        </div>
        
        {/* Orbit circles */}
        <div className="absolute inset-0 border-4 border-[#FFD700]/20 rounded-full animate-ping" />
        <div className="absolute inset-2 border-4 border-[#FFA500]/20 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
        <div className="absolute inset-4 border-4 border-[#FFD700]/20 rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <span className="w-2 h-2 bg-[#FFA500] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="w-2 h-2 bg-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
        
        <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFA500] animate-pulse">
          Analyzing Chart...
        </p>
        
        <p className="text-sm text-neutral-400">
          AI is processing your chart 🤖
        </p>
      </div>
    </div>
  );
}
