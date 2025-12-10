"use client"

import React from "react"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { featuredMovies } from "@/lib/constants/movies"

export default function FeaturedCarousel() {
  return (
    <div className="mb-6 w-full">
      <Carousel className="overflow-visible w-full">
        <CarouselContent className="gap-3 w-full">
          {featuredMovies.map((movie) => {
            const posterAsset = movie.media?.find((m) => m.type === "poster")
            const posterUrl = posterAsset?.url || ""
            const genreName = movie.genres?.[0]?.name || "Unknown"
            return (
              <CarouselItem
                key={movie.title_id}
                className="relative !pl-0 isolate w-full max-w-4xl mx-auto h-56 md:h-96 rounded-xl overflow-hidden"
              >
                <div
                  className="w-full h-full absolute -z-10 inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${posterUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute z-10 bottom-4 left-4 text-white p-3 rounded max-w-[70%]">
                  <h1 className="text-lg md:text-3xl font-bold">{movie.name}</h1>
                  <p className="text-xs md:text-sm text-gray-200">
                    {genreName} • {movie.release_year}
                  </p>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
