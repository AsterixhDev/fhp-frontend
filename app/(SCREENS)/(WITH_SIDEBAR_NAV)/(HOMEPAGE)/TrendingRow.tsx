"use client"

import React from "react"
import { useRouter } from "next/navigation"
import PosterCard from "./PosterCard"
import { TitleFull } from "@/lib/movie-structure/types"
import { ArrowRight, Flame } from "lucide-react"

interface Props {
  title: string
  movies: TitleFull[]
}

export default function TrendingRow({ title, movies }: Props) {
  const router = useRouter()

  return (
    <section className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold text-lg flex items-center gap-2">
          {title} <Flame className="h-4 w-4 text-amber-400" />
        </h3>
        <button
          onClick={() => router.push("/discover")}
          className="text-sm text-gray-300 flex items-center gap-1"
        >
          All <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
        {movies.map((m) => (
          <PosterCard key={m.title_id} movie={m} />
        ))}
      </div>
    </section>
  )
}
