const API_KEY = "99e273822f064935075b9432f6ea349e";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IGetMovieTvResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page?: number;
  results: IGetMovieTv[];
  total_pages?: number;
  total_results?: number;
}

export interface IGetMovieTv {
  adult?: boolean;
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  url?: string;
  type?: string;
  category?: string;
  key?: string;
}

interface IGenres {
  id: number;
  name: string;
}

export interface IDetail {
  genres?: IGenres[];
  homepage?: string;
  original_title?: string;
  original_name?: string;
  tagline?: string;
  runtime: number;
  number_of_episodes?: number;
  number_of_seasons?: number;
  adult?: boolean;
  backdrop_path?: string;
  poster_path: string;
  release_data: string;
  vote_average: number;
  overview: string;
  title: string;
  first_air_date: string;
  last_air_date: string;
  name: string;
  seasons: ISeason[];
  episode_run_time: number[];
  id: number;
}

interface ISeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

// Movie Api
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTopRatedMovie() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getUpcomingMovie() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getMovieTrailer(movieId: number) {
  return fetch(`${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

// Tv show Api
export function getTopRatedTvShows() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getPopularTvShows() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((response) =>
    response.json()
  );
}

export function getAiringTodayTvShows() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTvTrailer(tvId: number) {
  return fetch(`${BASE_PATH}/tv/${tvId}/videos?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

// Search
export function getSearchMovie(query: string | null) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${query}}&page=1&include_adult=false`
  ).then((response) => response.json());
}

export function getSearchTvShows(query: string | null) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${query}}&page=1&include_adult=false`
  ).then((response) => response.json());
}

// Detail Api
export function getDetail(category?: string, movieId?: string) {
  if (movieId === undefined) return;
  if (movieId)
    return fetch(`${BASE_PATH}/${category}/${movieId}?api_key=${API_KEY}`).then(
      (response) => response.json()
    );
}
