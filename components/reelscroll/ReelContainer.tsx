"use client"
import React, { useRef, useEffect, useState, useCallback, useMemo, useLayoutEffect } from "react";
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
  onListEpisodes?: (reelId: string) => void;
  showWatchButton?: boolean;
  requestedId?: string;
}

const ReelContainer: React.FC<ReelContainerProps> = ({
  reels,
  initialActiveIndex = 0,
  onReelChange,
  onLoadMore,
  hasMore = true,
  isLoading = false,
  className = "",
  onListEpisodes,
  showWatchButton = true,
  requestedId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [vh, setVh] = useState<number>(0);
  const wheelAccumRef = useRef(0);
  const touchStartRef = useRef<number | null>(null);
  const height_reduced = 20

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

  // Disable native page/body scrolling
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev }
  }, [])

  // Keep a single authoritative step height based on innerHeight
  // (avoids 100vh/dvh discrepancies and container measurement drift)
  useLayoutEffect(() => {
    const h = Math.round(window.innerHeight || 720)
    const id = window.requestAnimationFrame(() => setVh(h))
    return () => window.cancelAnimationFrame(id)
  }, [])

  // Defer height updates while transitioning to prevent mid-flight reflow
  const pendingVhRef = useRef<number | null>(null)
  useEffect(() => {
    const onResize = () => {
      const h = Math.round(window.innerHeight || 720)
      if (isTransitioning) {
        pendingVhRef.current = h
      } else {
        setVh(h)
      }
    }
    window.addEventListener("resize", onResize)
    const id = window.requestAnimationFrame(onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      window.cancelAnimationFrame(id)
    }
  }, [isTransitioning])

  useEffect(() => {
    if (!isTransitioning && pendingVhRef.current != null) {
      setVh(pendingVhRef.current)
      pendingVhRef.current = null
    }
  }, [isTransitioning])

  const clampIndex = useCallback((idx: number) => {
    if (idx < 0) return 0
    if (idx >= reels.length) return reels.length - 1
    return idx
  }, [reels.length])

  const startTransition = useCallback((nextIdx: number) => {
    if (isTransitioning) return
    const clamped = clampIndex(nextIdx)
    if (clamped === activeIndex) return
    setIsTransitioning(true)
    setActiveIndex(clamped)
    setIsScrolling(true)
    wheelAccumRef.current = 0
    const t = window.setTimeout(() => {
      setIsTransitioning(false)
      setIsScrolling(false)
      window.clearTimeout(t)
    }, 300)
  }, [activeIndex, clampIndex, isTransitioning])

  // Wheel intent: accumulate delta, one step per threshold cross
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (isTransitioning) return
      const dy = e.deltaY
      wheelAccumRef.current += dy
      const threshold = 60
      if (wheelAccumRef.current >= threshold) {
        wheelAccumRef.current = 0
        startTransition(activeIndex + 1)
      } else if (wheelAccumRef.current <= -threshold) {
        wheelAccumRef.current = 0
        startTransition(activeIndex - 1)
      }
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel as EventListener)
  }, [activeIndex, isTransitioning, startTransition])

  // Touch swipe detection
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onTouchStart = (e: TouchEvent) => {
      if (isTransitioning) return
      touchStartRef.current = e.touches[0]?.clientY ?? null
    }
    const onTouchMove = (e: TouchEvent) => {
      if (isTransitioning) return
      if (touchStartRef.current == null) return
      const currentY = e.touches[0]?.clientY ?? 0
      const dy = currentY - touchStartRef.current
      const threshold = 50
      if (dy <= -threshold) {
        touchStartRef.current = null
        startTransition(activeIndex + 1)
      } else if (dy >= threshold) {
        touchStartRef.current = null
        startTransition(activeIndex - 1)
      }
    }
    const onTouchEnd = () => { touchStartRef.current = null }
    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchmove", onTouchMove, { passive: true })
    el.addEventListener("touchend", onTouchEnd)
    return () => {
      el.removeEventListener("touchstart", onTouchStart as EventListener)
      el.removeEventListener("touchmove", onTouchMove as EventListener)
      el.removeEventListener("touchend", onTouchEnd as EventListener)
    }
  }, [activeIndex, isTransitioning, startTransition])

  const requestedIndex = useMemo(() => {
    if (!requestedId) return -1

    return reels.findIndex((r) => r.id === requestedId)

  }, [requestedId, reels])

  useEffect(() => {
    if (requestedIndex < 0) return
    const t = window.setTimeout(() => startTransition(requestedIndex), 0)
    return () => window.clearTimeout(t)
  }, [requestedIndex, startTransition])

  const viewHeight =(vh || 720)  - height_reduced

  return (
    <div className={`relative h-full overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="h-full overflow-hidden"
        style={{ touchAction: "none" }}
      >
        <div
          style={{
            transform: `translateY(${-(activeIndex * viewHeight)}px)`,
            transition: isTransitioning ? "transform 300ms ease-out" : "none",
            willChange: "transform",
          }}
        >
          {reels.map((reel, index) => (
            <div key={reel.id} style={{ height: `${viewHeight}px` }}>
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
                  if (onListEpisodes) {
                    onListEpisodes(reel.id)
                  } else {
                    const dramaId = reel.id.includes("-ep-") ? reel.id.split("-ep-")[0] : reel.id
                    router.push(`/drama/${dramaId}?open=episodes`)
                  }
                }}
                onShare={() => handleReelShare(reel.id)}
                scrolling={isScrolling}
                onWatch={() => {
                  const dramaId = reel.id.includes("-ep-") ? reel.id.split("-ep-")[0] : reel.id
                  router.push(`/drama/${dramaId}#${reel.id}`)
                }}
                showWatchButton={showWatchButton}
              />
            </div>
          ))}

          {isLoading && hasMore && (
            <div style={{ height: `${viewHeight}px` }} className="flex items-center justify-center bg-black">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <span className="text-white text-sm">Loading more reels...</span>
              </div>
            </div>
          )}

          {!hasMore && !isLoading && (
            <div style={{ height: `${viewHeight}px` }} className="flex items-center justify-center bg-black">
              <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🎬</span>
                </div>
                <h3 className="text-white text-lg font-semibold">You&apos;ve reached the end!</h3>
                <p className="text-white/70 text-sm max-w-xs">You&apos;ve watched all available reels. Check back later for more content!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReelContainer;
