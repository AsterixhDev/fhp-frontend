export interface DramaEpisode {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  likes: number;
  shares: number;
}

export interface Drama {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: string;
  director: string;
  description: string;
  episodes: DramaEpisode[];
  thumbnail: string;
}
