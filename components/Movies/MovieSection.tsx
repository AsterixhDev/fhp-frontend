import MovieCard from "./MovieCard"
import { TitleFull } from "@/lib/movie-structure/types"

interface Props {
  title: string
  movies: TitleFull[]
}

const MovieSection = ({ title, movies }: Props) => {
  return (
    <section className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="flex gap-4 scrollbar-hide overflow-x-auto snap-x snap-mandatory">
        {movies.map((movie) => (
          <MovieCard key={movie.title_id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default MovieSection
