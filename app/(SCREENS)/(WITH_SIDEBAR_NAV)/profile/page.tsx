"use client"

import React, { useEffect, useMemo, useState } from "react"
import ProfileHeader from "./ProfileHeader"
import MenuItem from "./MenuItem"
import { Heart, Clock } from "lucide-react"
import PosterCard from "@/app/(SCREENS)/(WITH_SIDEBAR_NAV)/(HOMEPAGE)/PosterCard"
import allTitles from "@/lib/constants/movies"

export default function ProfilePage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        const raw = localStorage.getItem("favoriteTitles")
        setFavoriteIds(raw ? JSON.parse(raw) : [])
      } catch {}
    }, 0)
    return () => clearTimeout(id)
  }, [])

  const favoriteItems = useMemo(() => allTitles.filter((t) => favoriteIds.includes(t.title_id)), [favoriteIds])

  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black size-full overflow-y-auto scrollbar-styled text-white">
      <div className="max-w-3xl mx-auto space-y-4">
        <ProfileHeader />

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-neutral-900/40 rounded-lg p-3">
            <div className="text-xs text-white/70 mb-1 flex items-center gap-2"><Heart className="w-3 h-3 text-emerald-400" /> Favorites</div>
            <div className="text-xl font-bold">{favoriteItems.length}</div>
          </div>
          <div className="bg-neutral-900/40 rounded-lg p-3">
            <div className="text-xs text-white/70 mb-1 flex items-center gap-2"><Clock className="w-3 h-3 text-emerald-400" /> History</div>
            <div className="text-xl font-bold">0</div>
          </div>
          <div className="bg-neutral-900/40 rounded-lg p-3">
            <div className="text-xs text-white/70 mb-1">Plan</div>
            <div className="text-xl font-bold">Free</div>
          </div>
        </div>

        <div className="space-y-2">
          <MenuItem href="/profile/favorites" title="My Favorites" subtitle="Saved movies and shows" />
          <MenuItem href="/profile/history" title="Watch History" subtitle="Continue where you left off" />
          <MenuItem href="/profile/settings" title="Settings" subtitle="Account & preferences" />
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Favorites Preview</h3>
            <a href="/profile/favorites" className="text-xs px-2 py-1 rounded-full bg-emerald-500 text-black">View All</a>
          </div>
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {favoriteItems.slice(0, 10).map((f) => (
              <PosterCard key={f.title_id} movie={f} />
            ))}
            {favoriteItems.length === 0 && (
              <div className="text-white/60 text-sm">No favorites yet</div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
