"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { getGenreList } from "@/lib/constants/movies"

export default function Categories() {
  const genres = useMemo(() => getGenreList(), [])

  return (
    <div className="mb-4">
      <h3 className="text-white font-semibold mb-2">Categories</h3>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {genres.map((g, idx) => (
          <Link
            key={g.genre}
            href={`/category/${encodeURIComponent(g.genre.toLowerCase())}`}
            aria-label={`Open ${g.genre} category`}
            className="relative shrink-0 w-36 h-14 rounded-2xl overflow-hidden text-left bg-neutral-800 border border-white/10"
          >
            {/* Image layer */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${g.thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Right-side fade into neutral-800 */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neutral-800/70 to-neutral-800" />

            {/* Existing dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

            {/* Content */}
            <div className="relative px-3 py-2 text-white">
              <div className="text-sm font-semibold truncate">
                {g.genre}
              </div>
              <div className="text-[10px] text-white/70">
                Rank {idx + 1}
              </div>

              {idx === 0 && (
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] bg-emerald-500 text-black">
                  Hot
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
