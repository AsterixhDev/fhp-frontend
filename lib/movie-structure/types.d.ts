/**
 * Movie Streaming Platform — Master Data Types
 *
 * Production-ready, technology-agnostic TypeScript definitions
 * that map directly to the information architecture provided.
 *
 * These definitions are intentionally implementation-agnostic:
 * - Primary keys are typed as `string` to accommodate UUIDs, numeric IDs, or composite keys.
 * - Timestamps are `string` (ISO 8601) to avoid runtime Date conversion assumptions.
 * - `metadata` containers use `Record<string, any>` for extensibility.
 *
 * Use these types as canonical models for SQL/NoSQL/Graph/REST/GraphQL layers.
 */

// ---------------------------
// 1. Core enums / primitives
// ---------------------------

export type TitleType = "movie" | "series" | "season" | "episode"

export type TitleStatus = "released" | "ongoing" | "ended" | "upcoming"

export type MaturityRating =
  | "G"
  | "PG"
  | "PG-13"
  | "R"
  | "NC-17"
  | "TV-Y"
  | "TV-Y7"
  | "TV-G"
  | "TV-PG"
  | "TV-14"
  | "TV-MA"
  | string // allow custom/region-specific ratings

export type VideoQuality = "360p" | "480p" | "720p" | "1080p" | "4K" | string

export type VideoFormat = "HLS" | "MP4" | "DASH" | "MKV" | string

// ---------------------------
// 2. Core Title / Content
// ---------------------------

/**
 * Title — abstract parent entity used for movies, series, seasons and episodes.
 */
export interface Title {
  title_id: string // PK
  type: TitleType
  name: string
  original_name?: string | null
  overview?: string | null
  tagline?: string | null
  release_year?: number | null
  status?: TitleStatus
  original_language?: string | null // ISO language code
  popularity_score?: number | null // normalized score for ranking/discovery
  maturity_rating?: MaturityRating | null
  runtime_minutes?: number | null // for movie/episode
  metadata?: Record<string, unknown> | null // extensible container for external IDs, tags
  created_at: string // ISO 8601
  updated_at: string // ISO 8601
}

// ---------------------------
// 3. Classifications
// ---------------------------

export interface Genre {
  genre_id: string
  name: string
}

export interface TitleGenre {
  title_id: string
  genre_id: string
}

export interface Keyword {
  keyword_id: string
  name: string
}

export interface TitleKeyword {
  title_id: string
  keyword_id: string
}

// ---------------------------
// 4. People and credits
// ---------------------------

export interface Person {
  person_id: string
  name: string
  biography?: string | null
  birthday?: string | null // ISO date
  deathday?: string | null // ISO date
  place_of_birth?: string | null
  profile_image?: string | null
  metadata?: Record<string, unknown> | null
}

/**
 * Credits model — unified cast & crew linking table.
 * role_type is flexible to support cast, director, writer, producer, composer, creator etc.
 */
export interface TitlePerson {
  title_id: string
  person_id: string
  role_type: string // cast | director | writer | producer | composer | creator | ...
  character_name?: string | null
  order_index?: number | null // billing order
  notes?: string | null
}

// ---------------------------
// 5. Media Assets & Playback
// ---------------------------

export type MediaType =
  | "poster"
  | "backdrop"
  | "still"
  | "banner"
  | "art"
  | "episode_thumbnail"
  | string

export interface MediaAsset {
  media_id: string
  title_id: string
  type: MediaType
  url: string
  width?: number | null
  height?: number | null
  language?: string | null
  is_primary?: boolean
  metadata?: Record<string, unknown> | null
}

/**
 * VideoSource represents a playable resource for a Title (movie, episode, trailer).
 * This supports multi-host, multi-quality, multi-format playback.
 */
export interface VideoSource {
  source_id: string
  title_id: string
  quality?: VideoQuality | null
  format?: VideoFormat | null
  url: string
  provider?: string | null // e.g., server1, cloudflare, akamai
  is_stream?: boolean
  is_downloadable?: boolean
  metadata?: Record<string, unknown> | null
}

export interface Subtitle {
  subtitle_id: string
  title_id: string
  language: string
  type?: string | null // VTT, SRT, etc.
  url: string
  is_closed_caption?: boolean
}

export interface EpisodeAsset {
  episode_id: string
  title: string
  thumbnail?: string | null
  duration?: string | null
  views?: string | null
  likes?: number | null
  shares?: number | null
}

// ---------------------------
// 6. Series / Season / Episode
// ---------------------------

/**
 * SeriesInfo is a thin extension linking Title to series-level metadata.
 * series_id is intentionally the same PK as Title.title_id for normalization.
 */
export interface SeriesInfo {
  series_id: string // FK → Title.title_id
  number_of_seasons?: number | null
  number_of_episodes?: number | null
  in_production?: boolean | null
  next_episode_to_air?: string | null // episode title_id or external reference
  network?: string | null
}

export interface Season {
  season_id: string
  series_id: string // FK → Title.title_id
  season_number: number
  name?: string | null
  overview?: string | null
  air_date?: string | null // ISO date
  episode_count?: number | null
  poster_url?: string | null
}

/**
 * Episode re-uses the Title entity (episode_id → Title.title_id)
 * and links back to Season for hierarchy.
 */
export interface Episode {
  episode_id: string // PK → Title.title_id
  season_id: string
  episode_number?: number | null
  air_date?: string | null
  production_code?: string | null
}

// ---------------------------
// 7. Production & Distribution
// ---------------------------

export interface Company {
  company_id: string
  name: string
  country?: string | null
  logo_url?: string | null
}

export interface TitleCompany {
  title_id: string
  company_id: string
  role?: string | null // production, distribution, sales
}

// ---------------------------
// 8. Ratings & Reviews
// ---------------------------

export interface Rating {
  title_id: string
  source: string // IMDB, TMDB, RottenTomatoes, internal
  score: number // normalized numeric score
  vote_count?: number | null
}

export interface UserReview {
  review_id: string
  user_id: string
  title_id: string
  rating: number // 1..10 (or other agreed scale)
  comment?: string | null
  created_at: string
  updated_at?: string | null
}

// ---------------------------
// 9. User models (optional module)
// ---------------------------

export interface User {
  user_id: string
  email: string
  password_hash?: string | null // store hashes only
  name?: string | null
  avatar_url?: string | null
  created_at: string
}

export interface WatchlistItem {
  user_id: string
  title_id: string
  added_at: string
}

export interface WatchHistory {
  user_id: string
  title_id: string
  progress_seconds?: number | null
  last_watched_at?: string | null
}

// ---------------------------
// 10. Discovery & Collections
// ---------------------------

export interface SimilarTitle {
  title_id: string
  similar_title_id: string
}

export interface Collection {
  collection_id: string
  name: string
  description?: string | null
  metadata?: Record<string, unknown> | null
}

export interface CollectionTitle {
  collection_id: string
  title_id: string
  position?: number | null // display ordering
}

// ---------------------------
// 11. System & Logging
// ---------------------------

export interface IngestLog {
  ingest_id: string
  title_id?: string | null
  source?: string | null
  status?: string | null
  details?: string | null
  timestamp: string
}

export interface ContentHash {
  title_id: string
  content_type: string // e.g., "metadata", "poster", "video"
  hash_value: string
}

// ---------------------------
// 12. Example composite types (helpers)
// ---------------------------

/**
 * TitleFull — convenient aggregated shape for API responses / views.
 * This is a non-normalized projection combining the core title with
 * related entities for fast read operations.
 */
export interface TitleFull extends Title {
  genres?: Genre[]
  keywords?: Keyword[]
  credits?: (TitlePerson & { person?: Person })[]
  media?: MediaAsset[]
  video_sources?: VideoSource[]
  subtitles?: Subtitle[]
  series_info?: SeriesInfo | null
  episodes?: EpisodeAsset[]
}

// ---------------------------
// End of definitions
// ---------------------------
