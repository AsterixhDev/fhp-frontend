"use client"

import useDebounce from "@/lib/hooks/useDebounce"
import { useRouter } from "next/navigation"
import React, { useEffect, useRef, useState, useCallback, useMemo } from "react"
import DiscoverPosterCard from "./DiscoverPosterCard"
import { TitleFull } from "@/lib/movie-structure/types"
import { allTitles } from "@/lib/constants/movies"

const PAGE_SIZE = 12

interface Props {
  query: string
  category: string
}

// Utility function to filter movies by query and category
const filterMovies = (movies: TitleFull[], query: string, category: string) => {
  const q = query.trim().toLowerCase()
  return movies.filter((movie) => {
    const matchesCategory =
      category === "all" ||
      movie.genres?.[0]?.name.toLowerCase() === category.toLowerCase()
    const matchesQuery =
      !q ||
      movie.name.toLowerCase().includes(q) ||
      movie.genres?.[0]?.name.toLowerCase().includes(q) ||
      movie.release_year?.toString().includes(q)
    return matchesCategory && matchesQuery
  })
}

const DiscoverGrid: React.FC<Props> = ({ query, category }) => {
  const [results, setResults] = useState<TitleFull[]>([])
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const router = useRouter()
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const debouncedQuery = useDebounce(query, 300)

  // Full filtered movies based on current query/category
  const filteredMovies = useMemo(
    () => filterMovies(allTitles, debouncedQuery, category),
    [debouncedQuery, category],
  )

  // Reset state when query/category changes safely
  useEffect(() => {
    // Defer state updates to avoid synchronous setState in effect
    const reset = () => {
      setPage(0)
      setHasMore(true)
      setResults(filteredMovies.slice(0, PAGE_SIZE))
      if (filteredMovies.length <= PAGE_SIZE) setHasMore(false)
    }

    const id = setTimeout(reset, 0)
    return () => clearTimeout(id)
  }, [filteredMovies])

  // Load more items on scroll
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    const nextPage = page + 1
    const start = nextPage * PAGE_SIZE
    const newItems = filteredMovies.slice(start, start + PAGE_SIZE)

    setResults((prev) => [...prev, ...newItems])
    setPage(nextPage)
    if (start + PAGE_SIZE >= filteredMovies.length) setHasMore(false)
    setIsLoading(false)
  }, [filteredMovies, page, isLoading, hasMore])

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMore()
          }
        })
      },
      { rootMargin: "200px" },
    )

    obs.observe(node)
    return () => obs.disconnect()
  }, [loadMore])

  const openDramaPage = (id: string) => router.push(`/drama/${id}`)

  return (
    <div className="px-4 pb-24">
      <h3 className="text-sm font-semibold mb-3">
        Results {debouncedQuery ? `for "${debouncedQuery}"` : ""}
      </h3>

      {results.length === 0 && !isLoading && (
        <div className="py-6 text-center text-white/60">No results found</div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {results.map((movie) => {
          const posterAsset = movie.media?.find((m) => m.type === "poster")
          const posterUrl = posterAsset?.url || ""
          return (
            <DiscoverPosterCard
              key={movie.title_id}
              id={movie.title_id}
              title={movie.name}
              episodes={movie.release_year?.toString() || "Unknown"}
              cover={posterUrl}
              onOpen={openDramaPage}
            />
          )
        })}
      </div>

      <div ref={sentinelRef} className="h-8" />

      {isLoading && (
        <div className="flex items-center justify-center py-6">
          <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {!hasMore && results.length > 0 && (
        <div className="py-8 text-center text-white/60">No more results</div>
      )}
    </div>
  )
}

export default DiscoverGrid
