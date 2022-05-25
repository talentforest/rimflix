const API_KEY = "99e273822f064935075b9432f6ea349e";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IGetMovieTvResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IGetMovieTv[];
  total_pages: number;
  total_results: number;
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
  release_data: string;
  vote_average: number;
  overview: string;
  title: string;
}

// Movie Api
export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getLatestMovie() {
  return fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getPopularMovie() {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`).then(
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
  return fetch(`${BASE_PATH}/${category}/${movieId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}
