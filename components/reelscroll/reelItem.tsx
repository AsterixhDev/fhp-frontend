import React from "react";

interface ReelProps {
  title: string;
  episode: string;
  autoplay?: boolean;
}

const Reel: React.FC<ReelProps> = ({ title, episode, autoplay = true }) => {
  return (
    <div className="relative w-full h-screen bg-black flex flex-col justify-end overflow-hidden">
      
      {/* Video Placeholder */}
      <div className="absolute inset-0 bg-black"></div>

      {/* Bottom overlay text */}
      <div className="absolute left-4 bottom-16 text-white font-semibold text-lg">
        {title} • {episode}
      </div>

      {/* Right vertical actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-5">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30">
          ❤
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30">
          💬
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30">
          ↗
        </div>
      </div>

      {/* Bottom controls */}
      <div className="flex justify-between items-center px-4 py-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          View Series
        </button>
        <div className="text-white/70 text-sm">
          Autoplay {autoplay ? "on" : "off"}
        </div>
      </div>
    </div>
  );
};

export default Reel;
