"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer"
import type { TitleFull } from "@/lib/movie-structure/types"
import EpisodesDrawer from "./EpisodesDrawer"
import BackButton from "@/components/ui/BackButton"
import ReelContainer, { ReelData } from "@/components/reelscroll/ReelContainer"
import { useRouter, usePathname } from "next/navigation"

type Props = {
  title: TitleFull
  initialOpen?: boolean
  initialEpisodeId?: string | null
}

export default function SingleItemReel({ title, initialOpen = false, initialEpisodeId = null }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const initialIndex = (() => {
    if (!initialEpisodeId) return 0
    const eps = title.episodes || []
    const idx = eps.findIndex((e) => e.episode_id === initialEpisodeId)
    return idx >= 0 ? idx : 0
  })()

  const [episodesOpen, setEpisodesOpen] = useState<boolean>(!!initialOpen)
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(initialIndex)

  const reels: ReelData[] = useMemo(() => {
    const eps = title.episodes || []
    return eps.map((ep) => ({
      id: ep.episode_id,
      title: title.name,
      episode: ep.title || ep.episode_id,
      thumbnail: title.media?.find((m) => m.type === "poster")?.url || ep.thumbnail || "",
      duration: ep.duration || `${title.runtime_minutes}m`,
      views: ep.views || "",
      likes: ep.likes || 0,
      shares: ep.shares || 0,
    }))
  }, [title])

  const activeEpisodeId = reels[activeIndex]?.id || null

  const openEpisodesAndFocusActive = () => {
    setEpisodesOpen(true)
  }

  const scrollToEpisode = (episodeId: string) => {
    const el = document.querySelector(`[data-reel-id="${episodeId}"]`)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }

  const updateUrlEpisode = useCallback((episodeId: string) => {
    const url = `${pathname}?episode=${encodeURIComponent(episodeId)}`
    router.replace(url)
  }, [pathname, router])

  useEffect(() => {
    if (initialEpisodeId) {
      scrollToEpisode(initialEpisodeId)
    }
  }, [initialEpisodeId])

  useEffect(() => {
    if (activeEpisodeId) {
      updateUrlEpisode(activeEpisodeId)
    }
  }, [activeEpisodeId, updateUrlEpisode])

  return (
    <div className="h-screen bg-black overflow-hidden relative">
      <div className="absolute top-4 left-4 z-10"><BackButton /></div>

      <ReelContainer
        reels={reels}
        initialActiveIndex={activeIndex}
        onReelChange={(idx) => setActiveIndex(idx)}
        hasMore={false}
        isLoading={false}
        className="h-full"
        onListEpisodes={() => openEpisodesAndFocusActive()}
        showWatchButton={false}
      />

      <EpisodesDrawer
        episodes={title.episodes || []}
        initialOpen={false}
        initialEpisodeId={initialEpisodeId || null}
        open={episodesOpen}
        onOpenChange={setEpisodesOpen}
        hideLauncher={true}
        activeEpisodeId={activeEpisodeId}
        onSelectEpisode={(episodeId) => {
          updateUrlEpisode(episodeId)
          scrollToEpisode(episodeId)
        }}
      />

      <Drawer open={detailsOpen} onOpenChange={setDetailsOpen} direction="right">
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title.name}</DrawerTitle>
            <DrawerDescription>{title.release_year} • {(title.genres || []).map((g) => g.name).join(", ")}</DrawerDescription>
          </DrawerHeader>
          <div className="px-4 pb-4 space-y-3 text-sm text-foreground">
            <div className="text-muted-foreground">Overview</div>
            <div>{title.overview}</div>
            <div className="text-muted-foreground">Runtime</div>
            <div>{title.runtime_minutes} min • Rated {title.maturity_rating}</div>
          </div>
          <div className="px-4 pb-4">
            <button onClick={() => setDetailsOpen(false)} className="px-3 py-2 rounded bg-neutral-900 text-white">Close</button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
