"use client"

import React, { useState } from "react"
import ReelContainer, {
  ReelData,
} from "@/components/reelscroll/ReelContainer"
import { generateMultipleEpisodeReels } from "@/lib/constants/movies"

const ReelsPage: React.FC = () => {
  const [activeReelIndex, setActiveReelIndex] = useState(0)
  const [reels] = useState<ReelData[]>(generateMultipleEpisodeReels(20))

  const handleReelChange = (index: number) => {
    setActiveReelIndex(index)
    console.log("Active reel changed to index:", index)
  }

  return (
    <div className="h-screen bg-black overflow-hidden">
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
