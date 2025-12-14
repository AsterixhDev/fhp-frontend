import MovieCard from "@/components/Movies/MovieCard"
import allTitles from "@/lib/constants/movies"
import type { TitleFull } from "@/lib/movie-structure/types"

type Props = {
  params: Promise<{ genre: string }>
}

export default async function GenrePage({ params }: Props) {
  const { genre } = await params
  const normalized = (genre || "").toLowerCase()
  const items: TitleFull[] = (allTitles as TitleFull[]).filter((t) =>
    (t.genres || []).some((g) => g.name.toLowerCase() === normalized),
  )

  return (
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black min-h-screen text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold capitalize">{normalized} Titles</h1>
          <div className="text-sm text-white/60">{items.length} items</div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {items
            .slice()
            .sort(
              (a, b) => (b.popularity_score ?? 0) - (a.popularity_score ?? 0),
            )
            .map((m) => (
              <MovieCard key={m.title_id} movie={m} />
            ))}
        </div>

        {items.length === 0 && (
          <div className="py-8 text-center text-white/60">
            No titles found for this genre.
          </div>
        )}
      </div>
    </main>
  )
}
