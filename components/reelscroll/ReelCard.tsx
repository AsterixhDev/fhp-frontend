import {
  Heart,
  List,
  Pause,
  Play,
  Share,
  Volume2,
  VolumeX,
} from "lucide-react";
import React, { useState } from "react";

interface ReelCardProps {
  id: string;
  title: string;
  episode: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: number;
  shares: number;
  isActive?: boolean;
  scrolling: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  onListEpisodes?: () => void;
  onWatch?: () => void;
}

const ReelCard: React.FC<ReelCardProps> = ({
  id,
  title,
  episode,
  thumbnail,
  duration,
  views,
  likes,
  shares,
  isActive = false,
  scrolling,
  onPlay,
  onPause,
  onLike,
  onShare,
  onListEpisodes,
  onWatch,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(isActive);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike?.();
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      onPause?.();
    } else {
      setIsPlaying(true);
      onPlay?.();
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleDescription = () => {
    setDescriptionExpanded(!descriptionExpanded);
  };

  return (
    <div data-reel-id={id} className="relative w-full h-[calc(100dvh-(4px*12))] md:h-[calc(100dvh-(var(--spacing)*6))] bg-black flex flex-col justify-end overflow-hidden">
      {/* Video Background/Thumbnail */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${thumbnail})` }}
      >
        {/* Dim overlay when description expanded */}
        {descriptionExpanded && (
          <div className="absolute inset-0 bg-black/60"></div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Play/Pause Overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handlePlayPause}
        >
          {!isPlaying && (
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Play className="w-6 h-6 text-white ml-1" fill="white" />
            </div>
          )}
        </div>
      </div>

      {/* UI elements */}
      {!scrolling && (
        <>
          {/* Top Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-3 pointer-events-auto">
            <button
              onClick={handlePlayPause}
              className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/50 transition"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" fill="white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
              )}
            </button>

            <button
              onClick={handleMute}
              className="w-10 h-10 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-black/50 transition"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white" />
              ) : (
                <Volume2 className="w-5 h-5 text-white" />
              )}
            </button>
          </div>

          {/* Left Content */}
          <div className="absolute left-4 bottom-24 text-white max-w-xs pointer-events-auto">
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-sm text-white/80 mb-1">{episode}</p>

            {/* Description */}
            <div
              className={`text-xs text-white/60 cursor-pointer overflow-hidden transition-all duration-300 ${
                descriptionExpanded
                  ? "max-h-[70dvh] overflow-y-auto"
                  : "line-clamp-1"
              }`}
              onClick={toggleDescription}
            >
              Watch this amazing scene from {title}! This is an extended
              description that might be very long, and it should be truncated
              initially. Click to expand and scroll inside the text area. Enjoy
              the preview!
            </div>

            <p className="text-xs text-white/60 mt-1">
              {views} views • {duration}
            </p>
          </div>

          {/* Right Actions */}
          <div className="absolute right-4 bottom-32 flex flex-col items-center gap-6 pointer-events-auto">
            <button
              onClick={handleLike}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition">
                <Heart
                  className={`w-6 h-6 ${
                    isLiked ? "text-red-500 fill-red-500" : "text-white"
                  }`}
                />
              </div>
              <span className="text-white text-xs font-medium">
                {isLiked ? likes + 1 : likes}
              </span>
            </button>

            <button
              onClick={onListEpisodes}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition">
                <List className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-xs font-medium">Episodes</span>
            </button>

            <button
              onClick={onShare}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition">
                <Share className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-xs font-medium">{shares}</span>
            </button>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-4 left-4 right-16 pointer-events-auto">
            <div className="flex items-center justify-between">
              <button onClick={onWatch} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition text-sm font-medium">
                Watch Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReelCard;
