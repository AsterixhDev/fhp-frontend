import React, { useRef, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation"
import ReelCard from "./ReelCard";

export interface ReelData {
  id: string;
  title: string;
  episode: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: number;
  shares: number;
}

interface ReelContainerProps {
  reels: ReelData[];
  initialActiveIndex?: number;
  onReelChange?: (activeIndex: number) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  className?: string;
}

const ReelContainer: React.FC<ReelContainerProps> = ({
  reels,
  initialActiveIndex = 0,
  onReelChange,
  onLoadMore,
  hasMore = true,
  isLoading = false,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [isScrolling, setIsScrolling] = useState(false);

  // reference unused prop to avoid lint error
  void onLoadMore

  // router for navigation to drama pages
  const router = useRouter()

  // Update parent component when active reel changes
  useEffect(() => {
    onReelChange?.(activeIndex);
  }, [activeIndex, onReelChange]);

  const handleReelPlay = useCallback((reelId: string) => {
    console.log("Playing reel:", reelId);
    // Add your play logic here
  }, []);

  const handleReelPause = useCallback((reelId: string) => {
    console.log("Pausing reel:", reelId);
    // Add your pause logic here
  }, []);

  const handleReelLike = useCallback((reelId: string) => {
    console.log("Liked reel:", reelId);
    // Add your like logic here
  }, []);

  const handleReelShare = useCallback((reelId: string) => {
    console.log("Sharing reel:", reelId);
    // Add your share logic here
  }, []);

  // Handle manual scroll events
  const handleScroll = useCallback(() => {
    if (!containerRef.current || isScrolling) return;

    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const containerHeight = window.innerHeight;
    const newActiveIndex = Math.round(scrollTop / containerHeight);

    if (
      newActiveIndex !== activeIndex &&
      newActiveIndex >= 0 &&
      newActiveIndex < reels.length
    ) {
      setActiveIndex(newActiveIndex);
    }
  }, [activeIndex, reels.length, isScrolling]);

  return (
    <div className={`relative h-full overflow-hidden ${className}`}>
      {/* Reel Container with Smooth Scrolling and Snap */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onScroll={handleScroll}
        onScrollCapture={() => setIsScrolling(true)}
        onScrollEndCapture={() => setIsScrolling(false)}
      >
        {reels.map((reel, index) => (
          <div key={index} className="snap-start">
            <ReelCard
              id={reel.id}
              title={reel.title}
              episode={reel.episode}
              thumbnail={reel.thumbnail}
              duration={reel.duration}
              views={reel.views}
              likes={reel.likes}
              shares={reel.shares}
              isActive={index === activeIndex}
              onPlay={() => handleReelPlay(reel.id)}
              onPause={() => handleReelPause(reel.id)}
              onLike={() => handleReelLike(reel.id)}
              onListEpisodes={() => {
                const dramaId = reel.id.includes("-ep-") ? reel.id.split("-ep-")[0] : reel.id
                router.push(`/drama/${dramaId}?open=episodes`)
              }}
              onShare={() => handleReelShare(reel.id)}
              scrolling={isScrolling}
              onWatch={() => {
                const dramaId = reel.id.includes("-ep-") ? reel.id.split("-ep-")[0] : reel.id
                // include hash to indicate a specific episode, if available
                router.push(`/drama/${dramaId}#${reel.id}`)
              }}
            />
          </div>
        ))}

        {/* Loader for dynamic loading */}
        {isLoading && hasMore && (
          <div className="snap-start h-full flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              <span className="text-white text-sm">Loading more reels...</span>
            </div>
          </div>
        )}

        {/* End of content section */}
        {!hasMore && !isLoading && (
          <div className="snap-start h-[60vh] flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🎬</span>
              </div>
              <h3 className="text-white text-lg font-semibold">
                You&apos;ve reached the end!
              </h3>
              <p className="text-white/70 text-sm max-w-xs">
                You&apos;ve watched all available reels. Check back later for
                more content!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelContainer;
