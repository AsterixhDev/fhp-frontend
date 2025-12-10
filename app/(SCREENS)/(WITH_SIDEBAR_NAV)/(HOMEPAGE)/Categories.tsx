"use client"

import React from "react"

const categories = [
  "All",
  "Hollywood",
  "Nollywood",
  "Anime",
  "ShortTV",
  "TV",
  "Movie",
]

export default function Categories() {
  return (
    <div className="mb-4">
      <h3 className="text-white font-semibold mb-2">Categories</h3>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        {categories.map((c) => (
          <button
            key={c}
            className="whitespace-nowrap bg-neutral-900 px-4 py-2 rounded-2xl text-sm text-gray-200 shadow-sm border border-neutral-800"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
