/* eslint-disable react-hooks/set-state-in-effect */
"use client"

import { useEffect, useMemo, useState } from "react"
import { EpisodeAsset } from "@/lib/movie-structure/types"
import { X } from "lucide-react"
import ThumbnailImage from "@/components/ui/ThumbnailImage"

type Props = {
  episodes: EpisodeAsset[]
  initialOpen?: boolean
  initialEpisodeId?: string | null
  open?: boolean
  onOpenChange?: (open: boolean) => void
  hideLauncher?: boolean
  activeEpisodeId?: string | null
  onSelectEpisode?: (episodeId: string) => void
}

const PAGE_SIZE = 25

export default function EpisodesDrawer({ episodes, initialOpen = false, initialEpisodeId = null, open: controlledOpen, onOpenChange, hideLauncher = false, activeEpisodeId = null, onSelectEpisode }: Props) {
  const [internalOpen, setInternalOpen] = useState<boolean>(initialOpen)
  const [tabIndex, setTabIndex] = useState(0)
  const [overridePage, setOverridePage] = useState(false)

  const open = controlledOpen ?? internalOpen
  const setOpen = (next: boolean | ((s: boolean) => boolean)) => {
    const value = typeof next === "function" ? (next as (s: boolean) => boolean)(open) : next
    if (onOpenChange) onOpenChange(value)
    else setInternalOpen(value)
  }

  const pageCount = Math.max(1, Math.ceil(episodes.length / PAGE_SIZE))

  const pages = useMemo(() => {
    return Array.from({ length: pageCount }, (_, i) => episodes.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE))
  }, [episodes, pageCount])

  useEffect(() => {
    if (initialEpisodeId) {
      // if the element exists on the page, scroll to it after a short delay
      setTimeout(() => {
        const el = document.getElementById(initialEpisodeId)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 300)
    }
  }, [initialEpisodeId, episodes])

  useEffect(() => {
    // When active episode changes (due to scroll), return to auto page selection
    setOverridePage(false)
  }, [activeEpisodeId])

  const computedTabIndex = (() => {
    const targetId = activeEpisodeId || initialEpisodeId || null
    if (!overridePage && targetId) {
      const idx = episodes.findIndex((e) => e.episode_id === targetId)
      if (idx >= 0) return Math.floor(idx / PAGE_SIZE)
    }
    return tabIndex
  })()

  const onSelectEpisodeInternal = (episodeId: string) => {
    // close drawer then scroll to episode on the parent page
    setOpen(false)
    setTimeout(() => {
      if (onSelectEpisode) onSelectEpisode(episodeId)
      else {
        const el = document.getElementById(episodeId)
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" })
        else if (typeof window !== "undefined") {
          window.location.hash = `#${episodeId}`
        }
      }
    }, 220)
  }

  return (
    <div className="fixed right-4 bottom-4 z-50">
      {!hideLauncher && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen((s) => !s)}
            className="px-3 py-2 rounded bg-zinc-900 text-white hover:opacity-90"
          >
            Episodes ({episodes.length})
          </button>
        </div>
      )}

      {open && (
        <div className="mt-2 w-[340px] max-w-full bg-white dark:bg-zinc-900 rounded shadow-lg p-3">
          <div className="flex items-center justify-between mb-3">
            <strong>Episodes</strong>
            <div className="flex items-center gap-2">
              <div className="text-sm text-zinc-500">Page</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setTabIndex(i)
                      setOverridePage(true)
                    }}
                    className={`px-2 py-1 rounded text-sm ${i === computedTabIndex ? "bg-zinc-800 text-white" : "bg-zinc-100 dark:bg-zinc-800/40"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-[60vh] overflow-auto">
            {pages[computedTabIndex]?.map((ep) => (
              <div key={ep.episode_id} className={`flex items-center gap-3 p-2 rounded hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer ${activeEpisodeId === ep.episode_id ? "bg-zinc-100 dark:bg-zinc-800" : ""}`} onClick={() => onSelectEpisodeInternal(ep.episode_id)}>
                <ThumbnailImage src={ep.thumbnail} alt={ep.title || ep.episode_id} width={56} height={80} className="w-14 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="text-sm font-medium">{ep.title}</div>
                  <div className="text-xs text-zinc-500">{ep.duration} • {ep.views} views</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
