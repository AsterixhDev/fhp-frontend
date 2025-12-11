// components/Homepage.tsx

import MovieSection from "@/components/Movies/MovieSection";
import { featuredMovies, trendingMovies } from "@/lib/constants/movies";
import Header from "./Header";
import FeaturedCarousel from "./FeaturedCarousel";
import Categories from "./Categories";
import TrendingRow from "./TrendingRow";

import BackButton from "@/components/ui/BackButton"

const Homepage = () => {
  return (
    <main className="isolate relative p-4 md:p-8 bg-black size-full overflow-y-auto scrollbar-styled text-white">
      <div className="w-full h-full overflow-hidden pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-gradient-to-br from-rose-500/30 to-indigo-500/30 blur-3xl rounded-full" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 bg-gradient-to-tr from-emerald-500/25 to-sky-500/25 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-gradient-to-tr from-amber-500/20 to-pink-500/30 blur-3xl rounded-full" />
      </div>
      <div className="mb-4"><BackButton /></div>
      <Header />

      <FeaturedCarousel />

      <Categories />

      <TrendingRow title="Trending Now" movies={trendingMovies} />

      <MovieSection title="Hollywood Movie" movies={featuredMovies} />
    </main>
  )
}

export default Homepage
