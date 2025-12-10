// components/MovieCard.tsx

import { TitleFull } from "@/lib/movie-structure/types"

interface Props {
  movie: TitleFull
}

const MovieCard = ({ movie }: Props) => {
  const posterAsset = movie.media?.find((m) => m.type === "poster")
  const posterUrl = posterAsset?.url || ""

  return (
    <div className="bg-neutral-900 snap-start shrink-0 w-40 md:w-48 lg:w-52 cursor-pointer rounded-lg overflow-hidden hover:scale-[1.01] transition-transform">
      <div
        className="w-full h-44 bg-cover bg-center"
        style={{ backgroundImage: `url(${posterUrl})` }}
      />
      <div className="text-white p-2">
        <h3 className="text-sm font-semibold truncate">{movie.name}</h3>
        <p className="text-xs text-gray-400">
          {movie.genres?.[0]?.name} • {movie.release_year}
        </p>
      </div>
    </div>
  )
}

export default MovieCard
