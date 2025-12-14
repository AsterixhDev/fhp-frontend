// components/MovieCard.tsx

import { TitleFull } from "@/lib/movie-structure/types"
import Link from "next/link"
import ThumbnailImage from "@/components/ui/ThumbnailImage"
import { Star } from "lucide-react"

interface Props {
  movie: TitleFull
}

const MovieCard = ({ movie }: Props) => {
  const posterAsset = movie.media?.find((m) => m.type === "poster")
  const posterUrl = posterAsset?.url || ""

  return (
    <Link href={`/drama/${movie.title_id}`} className="bg-neutral-900 snap-start shrink-0 w-40 md:w-48 max-w-full lg:w-52 cursor-pointer rounded-xl overflow-hidden hover:scale-[1.01] transition-transform relative">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-indigo-500/10 blur-lg -z-10" />
      <div className="relative">
        <ThumbnailImage src={posterUrl} alt={movie.name} width={192} height={176} className="w-full h-44 object-cover" />
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] bg-black/70 text-white flex items-center gap-1">
          <Star className="w-3 h-3 text-amber-400" /> {(movie.popularity_score ?? 8).toFixed(1)}
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-[10px] bg-black/70 text-white">
          {movie.release_year}
        </div>
      </div>
      <div className="text-white p-2">
        <h3 className="text-sm font-semibold truncate">{movie.name}</h3>
        <p className="text-xs text-white/70">
          {movie.genres?.[0]?.name}
        </p>
      </div>
    </Link>
  )
}

export default MovieCard
