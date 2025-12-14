import type {
  Title,
  TitleFull,
  MediaAsset,
  VideoSource,
} from "@/lib/movie-structure/types"

// Simple deterministic helpers to generate seed data for local/dev UI
const generateRandomYear = () => {
  const currentYear = new Date().getFullYear()
  return Math.floor(Math.random() * (currentYear - 2000 + 1)) + 2000
}

const sampleDirectors = [
  "Steven Spielberg",
  "Christopher Nolan",
  "Quentin Tarantino",
  "Martin Scorsese",
  "Ridley Scott",
]

const sampleDescriptions = [
  "An epic story of adventure and friendship.",
  "A journey into space filled with mystery and discovery.",
  "A thrilling romance that defies the odds.",
  "A case that will keep you at the edge of your seat.",
  "A fantasy world where magic and danger collide.",
]

const posterFor = (seed: string, w = 800, h = 1400) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`

const generateMediaAssets = (titleId: string): MediaAsset[] => {
  return [
    {
      media_id: `${titleId}-poster`,
      title_id: titleId,
      type: "poster",
      url: posterFor(`${titleId}-poster`, 400, 600),
      width: 400,
      height: 600,
      is_primary: true,
      metadata: null,
    },
    {
      media_id: `${titleId}-backdrop`,
      title_id: titleId,
      type: "backdrop",
      url: posterFor(`${titleId}-backdrop`, 1200, 675),
      width: 1200,
      height: 675,
      is_primary: false,
      metadata: null,
    },
  ]
}

const generateVideoSources = (titleId: string): VideoSource[] => {
  return [
    {
      source_id: `${titleId}-hls-720p`,
      title_id: titleId,
      quality: "720p",
      format: "HLS",
      url: `https://stream.example.com/${titleId}/index.m3u8`,
      provider: "mock-stream",
      is_stream: true,
      is_downloadable: false,
      metadata: null,
    },
    {
      source_id: `${titleId}-mp4-1080p`,
      title_id: titleId,
      quality: "1080p",
      format: "MP4",
      url: `https://cdn.example.com/${titleId}/1080p.mp4`,
      provider: "mock-cdn",
      is_stream: false,
      is_downloadable: true,
      metadata: null,
    },
  ]
}

const generateTitle = (idx: number): Title => {
  const id = `t-${idx + 1}`
  return {
    title_id: id,
    type: "movie",
    name: `Drama Title ${idx + 1}`,
    original_name: null,
    overview: sampleDescriptions[idx % sampleDescriptions.length],
    tagline: null,
    release_year: generateRandomYear(),
    status: "released",
    original_language: "en",
    popularity_score: Math.round(Math.random() * 1000) / 100,
    maturity_rating: "PG-13",
    runtime_minutes: 90 + (idx % 40),
    metadata: { director: sampleDirectors[idx % sampleDirectors.length] },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

const generateTitleFull = (idx: number): TitleFull => {
  const base = generateTitle(idx)
  const media = generateMediaAssets(base.title_id)
  const video_sources = generateVideoSources(base.title_id)
  const genres = [
    { genre_id: `g-${(idx % 5) + 1}`, name: ["Romance", "Thriller", "Fantasy", "Mystery", "Adventure"][idx % 5] },
  ]

  // Generate a variable number of episodes to support drama pages
  const episodeCount = 5 + (idx % 36) // 5..40
  const episodes = Array.from({ length: episodeCount }, (_, i) => {
    const n = i + 1
    return {
      episode_id: `${base.title_id}-ep-${n}`,
      title: `Episode ${n}`,
      thumbnail: posterFor(`${base.title_id}-ep-${n}`, 400, 600),
      duration: `${10 + (n % 50)}m`,
      views: `${(n * 1234).toString()}`,
      likes: Math.floor(Math.random() * 1000),
      shares: Math.floor(Math.random() * 200),
    }
  })

  return {
    ...base,
    genres,
    keywords: [{ keyword_id: `k-${(idx % 6) + 1}`, name: ["epic", "sci-fi", "romance", "crime", "fantasy", "adventure"][idx % 6] }],
    credits: [],
    media,
    video_sources,
    subtitles: [],
    series_info: null,
    episodes,
  }
}

// Create a set of titles (30 by default)
export const allTitles: TitleFull[] = Array.from({ length: 30 }, (_, i) => generateTitleFull(i))

export const getFeaturedTitles = (): TitleFull[] => allTitles.slice(0, 3)

export const getTrendingTitles = (): TitleFull[] => allTitles.slice(3, 8)

export const featuredMovies: TitleFull[] = getFeaturedTitles()
export const trendingMovies: TitleFull[] = getTrendingTitles()

export type GenreSummary = {
  genre: string
  thumbnail: string
  ranking: number
}

export const getGenreList = (): GenreSummary[] => {
  const byGenre = new Map<string, { sum: number; count: number; thumb?: string }>()

  for (const t of allTitles) {
    const posterAsset = t.media?.find((m) => m.type === "backdrop")?.url || t.media?.find((m) => m.type === "poster")?.url || ""
    const popularity = t.popularity_score ?? 0
    for (const g of t.genres ?? []) {
      const key = g.name
      const prev = byGenre.get(key)
      if (prev) {
        byGenre.set(key, { sum: prev.sum + popularity, count: prev.count + 1, thumb: prev.thumb ?? posterAsset })
      } else {
        byGenre.set(key, { sum: popularity, count: 1, thumb: posterAsset })
      }
    }
  }

  const list: GenreSummary[] = Array.from(byGenre.entries()).map(([genre, v]) => ({
    genre,
    thumbnail: v.thumb || "",
    ranking: v.sum,
  }))

  return list.sort((a, b) => b.ranking - a.ranking)
}

/**
 * Generate episode-based reel data: picks 1 random drama and 1 random episode from it
 * Returns a data shape compatible with ReelContainer
 */
export interface GeneratedReel {
  id: string
  title: string
  episode: string
  thumbnail: string
  duration: string
  views: string
  likes: number
  shares: number
}

export const generateRandomEpisodeReel = (): GeneratedReel => {
  // Pick random title (drama)
  const randomTitle = allTitles[Math.floor(Math.random() * allTitles.length)]
  
  // Generate a random episode number (1-12)
  const episodeNum = Math.floor(Math.random() * 12) + 1
  const episodeId = `${randomTitle.title_id}-ep-${episodeNum}`
  
  // Get a variation of the poster for the episode thumbnail
  const posterAsset = randomTitle.media?.find((m) => m.type === "poster")
  const thumbnailUrl = posterAsset?.url || posterFor(`${episodeId}-thumb`)
  
  return {
    id: episodeId,
    title: randomTitle.name,
    episode: `Episode ${episodeNum}`,
    thumbnail: thumbnailUrl,
    duration: `${randomTitle.runtime_minutes ?? 45}m`,
    views: `${Math.floor(Math.random() * 5000000).toLocaleString()}`,
    likes: Math.floor(Math.random() * 500000),
    shares: Math.floor(Math.random() * 50000),
  }
}

/**
 * Generate multiple episode reels from random titles
 */
export const generateMultipleEpisodeReels = (count: number = 20): GeneratedReel[] => {
  return Array.from({ length: count }, () => generateRandomEpisodeReel())
}

export default allTitles
