"use client"

import React, { useEffect, useMemo, useState } from "react"
import { allTitles } from "@/lib/constants/movies"
import PosterCard from "@/app/(SCREENS)/(WITH_SIDEBAR_NAV)/(HOMEPAGE)/PosterCard"
import { ArrowUpDown, X } from "lucide-react"

// Simple favorites page: in a real app favorites would come from user data.
export default function FavoritesPage() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([])
  const [sort, setSort] = useState<"latest" | "popularity">("popularity")

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        const raw = localStorage.getItem("favoriteTitles")
        setFavoriteIds(raw ? JSON.parse(raw) : [])
      } catch {}
    }, 0)
    return () => clearTimeout(id)
  }, [])

  const favorites = useMemo(() => {
    let items = allTitles.filter((t) => favoriteIds.includes(t.title_id))
    items = items.slice().sort((a, b) => {
      if (sort === "latest") return (b.release_year ?? 0) - (a.release_year ?? 0)
      return (b.popularity_score ?? 0) - (a.popularity_score ?? 0)
    })
    return items
  }, [favoriteIds, sort])

  const removeFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = prev.filter((x) => x !== id)
      try { localStorage.setItem("favoriteTitles", JSON.stringify(next)) } catch {}
      return next
    })
  }

  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black min-h-screen text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">My Favorites</h1>
          <div className="flex items-center gap-2">
            <button onClick={() => setSort((s) => (s === "popularity" ? "latest" : "popularity"))} className="px-3 py-1.5 rounded-full bg-white/10 text-white text-sm flex items-center gap-1">
              <ArrowUpDown className="w-4 h-4" /> {sort === "popularity" ? "Popularity" : "Latest"}
            </button>
            <div className="text-sm text-white/60">{favorites.length} items</div>
          </div>
        </div>

        <section className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {favorites.map((f) => (
              <div key={f.title_id} className="relative">
                <PosterCard movie={f} />
                <button
                  aria-label="Remove from favorites"
                  onClick={(e) => { e.preventDefault(); removeFavorite(f.title_id) }}
                  className="absolute top-2 right-2 z-10 p-1 rounded-full bg-black/60 text-white hover:bg-black"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {favorites.length === 0 && (
          <div className="py-8 text-center text-white/60">You haven&lsquo;t favorited any titles yet.</div>
        )}
      </div>
    </main>
  )
}
