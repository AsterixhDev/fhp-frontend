"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Search, Sliders } from "lucide-react"

export default function Header() {
  const router = useRouter()

  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex-1">
        <button
          onClick={() => router.push("/discover")}
          className="w-full flex items-center gap-3 bg-neutral-900/60 hover:bg-neutral-900/80 transition p-3 rounded-2xl"
          aria-label="Open discover"
        >
          <Search className="h-5 w-5 text-gray-300" />
          <span className="text-sm text-gray-300 text-left">Search movies, shows...</span>
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="bg-neutral-900/60 p-2 rounded-lg" aria-label="Filters">
          <Sliders className="h-5 w-5 text-gray-300" />
        </button>
      </div>
    </div>
  )
}
