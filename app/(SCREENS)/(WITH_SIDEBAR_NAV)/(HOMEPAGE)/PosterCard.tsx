"use client"

import React from "react"
import { TitleFull } from "@/lib/movie-structure/types"
import Link from "next/link"
import ThumbnailImage from "@/components/ui/ThumbnailImage"

interface Props {
  movie: TitleFull
}

export default function PosterCard({ movie }: Props) {
  const posterAsset = movie.media?.find((m) => m.type === "poster")
  const posterUrl = posterAsset?.url || ""

  return (
    <Link href={`/drama/${movie.title_id}`} aria-label={`Open ${movie.name}`} className="relative snap-start shrink-0 w-40 md:w-48 lg:w-52 cursor-pointer rounded-lg overflow-hidden bg-neutral-900">
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-sky-500/10 blur-lg -z-10" />
      <ThumbnailImage src={posterUrl} alt={movie.name} width={160} height={176} className="w-full h-44 object-cover" />
      <div className="p-2 text-white">
        <h4 className="text-sm font-semibold truncate">{movie.name}</h4>
        <p className="text-xs text-gray-400">{movie.genres?.[0]?.name}</p>
      </div>
    </Link>
  )
}
