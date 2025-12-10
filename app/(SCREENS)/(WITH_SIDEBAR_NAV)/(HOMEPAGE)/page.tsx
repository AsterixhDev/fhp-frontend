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
    <main className="p-4 md:p-8 bg-neutral-800 md:bg-black size-full overflow-y-auto scrollbar-styled text-white">
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
