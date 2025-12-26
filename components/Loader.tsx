// /components/Loader.tsx
export default function Loader() {
  return (
    <div className="flex items-center justify-center w-full py-6">
      <span className="inline-block w-2 h-2 mx-1 bg-[#39FF14] rounded-full animate-bounce [animation-delay:-0.2s]"></span>
      <span className="inline-block w-2 h-2 mx-1 bg-[#39FF14] rounded-full animate-bounce [animation-delay:0s]"></span>
      <span className="inline-block w-2 h-2 mx-1 bg-[#39FF14] rounded-full animate-bounce [animation-delay:0.2s]"></span>
    </div>
  );
}
