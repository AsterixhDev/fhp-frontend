"use client"

import React from "react"
import { TitleFull } from "@/lib/movie-structure/types"

interface Props {
  movie: TitleFull
}

export default function PosterCard({ movie }: Props) {
  const posterAsset = movie.media?.find((m) => m.type === "poster")
  const posterUrl = posterAsset?.url || ""

  return (
    <div className="snap-start shrink-0 w-40 md:w-48 lg:w-52 cursor-pointer rounded-lg overflow-hidden bg-neutral-900">
      <div
        className="w-full h-44 bg-cover bg-center"
        style={{ backgroundImage: `url(${posterUrl})` }}
      />
      <div className="p-2 text-white">
        <h4 className="text-sm font-semibold truncate">{movie.name}</h4>
        <p className="text-xs text-gray-400">{movie.genres?.[0]?.name}</p>
      </div>
    </div>
  )
}
