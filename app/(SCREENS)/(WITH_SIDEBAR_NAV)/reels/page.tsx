"use client"

import React, { useState } from "react"
import ReelContainer, { ReelData } from "@/components/reelscroll/ReelContainer"
import BackButton from "@/components/ui/BackButton"
import { generateMultipleEpisodeReels } from "@/lib/constants/movies"

const ReelsPage: React.FC = () => {
  // Removed unused activeReelIndex state
  const [reels] = useState<ReelData[]>(generateMultipleEpisodeReels(20))

  const handleReelChange = (index: number) => {
    // Removed setActiveReelIndex, just log
    console.log("Active reel changed to index:", index)
  }

  return (
    <div className="h-screen bg-black overflow-hidden">
      <div className="absolute top-4 left-4 z-10"><BackButton /></div>
      <ReelContainer
        reels={reels}
        initialActiveIndex={0}
        onReelChange={handleReelChange}
        hasMore={false}
        isLoading={false}
        className="h-full"
      />
    </div>
  )
}

export default ReelsPage
