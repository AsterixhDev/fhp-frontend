"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import ThumbnailImage from "@/components/ui/ThumbnailImage";
import { featuredMovies } from "@/lib/constants/movies";
import { Heart, Play } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FeaturedCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem("favoriteTitles");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      try {
        localStorage.setItem("favoriteTitles", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  useEffect(() => {
    function runSnapSelect() {
      if (!api) return;

      setSnapCount(api.scrollSnapList().length);
      setSelected(api.selectedScrollSnap());
      const onSelect = () => setSelected(api.selectedScrollSnap());
      api.on("select", onSelect);
      return () => {
        api.off("select", onSelect);
      };
    }
    runSnapSelect();
  }, [api]);

  return (
    <div className="mb-6 w-full">
      <Carousel className="overflow-visible w-full" setApi={setApi}>
        <CarouselContent className="!m-0 gap-3 w-full">
          {featuredMovies.map((movie) => {
            const posterAsset = movie.media?.find((m) => m.type === "poster");
            const posterUrl = posterAsset?.url || "";
            const genreName = movie.genres?.[0]?.name || "Unknown";
            return (
              <CarouselItem
                key={movie.title_id}
                className="relative !pl-0 isolate w-full max-w-4xl mx-auto h-72 md:h-96 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/15 via-transparent to-sky-500/15 blur-md mix-blend-soft-light" />
                <ThumbnailImage
                  src={posterUrl}
                  alt={movie.name}
                  width={1024}
                  height={384}
                  className="w-full h-full object-cover pointer-events-none -z-10 inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute z-10 bottom-4 left-4 right-4 text-white p-3 rounded max-w-[70%]">
                  <h1 className="text-lg md:text-3xl font-bold">
                    {movie.name}
                  </h1>
                  <p className="text-xs md:text-sm text-gray-200">
                    {genreName} • {movie.release_year}
                  </p>
                  <p className="hidden md:block text-sm text-white/80 mt-2 line-clamp-2">
                    {movie.overview}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <Link
                      href={`/drama/${movie.title_id}`}
                      className="px-4 py-2 rounded-full bg-amber-500 text-black text-sm font-semibold flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" /> Watch Now
                    </Link>
                    <button
                      type="button"
                      aria-label="Add to favorites"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(movie.title_id);
                      }}
                      className={`px-3 py-2 rounded-full text-sm border ${
                        favorites.includes(movie.title_id)
                          ? "bg-white/20 border-white text-white"
                          : "bg-black/40 border-white/20 text-white"
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 inline-block mr-1 ${
                          favorites.includes(movie.title_id)
                            ? "text-red-500"
                            : "text-white"
                        }`}
                      />
                      {favorites.includes(movie.title_id)
                        ? "In My List"
                        : "Add"}
                    </button>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        {snapCount > 1 && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden md:flex md:flex-col gap-2 z-10">
            {featuredMovies.map((m, i) => {
              const p = m.media?.find((x) => x.type === "poster");
              return (
                <button
                  key={m.title_id}
                  className={`rounded-md overflow-hidden border ${
                    selected === i ? "border-emerald-400" : "border-white/20"
                  }`}
                  aria-label={`Go to ${m.name}`}
                  onClick={() => api?.scrollTo(i)}
                >
                  <ThumbnailImage
                    src={p?.url || ""}
                    alt={m.name}
                    width={56}
                    height={80}
                    className="w-14 h-20 object-cover"
                  />
                </button>
              );
            })}
          </div>
        )}
      </Carousel>
    </div>
  );
}
