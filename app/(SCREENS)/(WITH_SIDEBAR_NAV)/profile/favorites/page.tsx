"use client"

import React from "react"
import { allTitles } from "@/lib/constants/movies"
import PosterCard from "@/app/(SCREENS)/(WITH_SIDEBAR_NAV)/(HOMEPAGE)/PosterCard"

// Simple favorites page: in a real app favorites would come from user data.
export default function FavoritesPage() {
  // For demo, treat first 8 titles as favorites
  const favorites = allTitles.slice(0, 8)

  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black min-h-screen text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">My Favorites</h1>

        <section className="mb-6">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
            {favorites.map((f) => (
              <PosterCard key={f.title_id} movie={f} />
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
