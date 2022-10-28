const API_KEY = "99e273822f064935075b9432f6ea349e";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IGetMovieTvResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page?: number;
  results: IDetail[];
  total_pages?: number;
  total_results?: number;
}

export interface ICastCrew {
  id: number;
  cast: IGuestStar[];
  crew: ICrew[];
}

export interface ICrew {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number;
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface IGuestStar {
  adult: boolean;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string;
}

export interface ISeasonEpisode {
  air_date: string;
  crew: ICrew[];
  episode_number: number;
  guest_stars: IGuestStar[];
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface ISeasonDetail {
  air_date: string;
  episodes: ISeasonEpisode[];
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  _id: string;
}

export interface ICollection {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
  overview?: string;
  parts?: IDetail[];
}

export interface IDetail {
  id?: number;
  genres?: IGenres[];
  genre_ids: number[];
  homepage?: string;
  original_title?: string;
  original_name?: string;
  tagline?: string;
  runtime?: number;
  belongs_to_collection?: ICollection;
  number_of_episodes?: number;
  number_of_seasons?: number;
  adult?: boolean;
  backdrop_path?: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  title: string;
  first_air_date?: string;
  last_air_date?: string;
  last_episode_to_air?: ISeasonEpisode;
  name?: string;
  seasons?: ISeason[];
  episode_run_time?: number[];
}

export interface IGetGenres {
  genres: IGenres[];
}

export interface IGenres {
  id: number;
  name: string;
}

export interface ISeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface IGetVideo {
  id: string;
  results: IVideo[];
}

interface IVideo {
  id: string;
  key: string;
  name?: string;
}

export interface IKeywords {
  id: number;
  keywords: IKeyword[];
  results: IKeyword[];
}

export interface IKeyword {
  id: number;
  name: string;
}

export enum Language {
  ko = "ko",
  en = "en-US",
}

// Movie Lists Api
export function getNowPlayingMovies(language: string) {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export function getPopularMovies(language: string) {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export function getTopRatedMovies(language: string) {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export function getUpcomingMovies(language: string) {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

// Tv show Lists Api
export function getTopRatedTvShows(language: string) {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export function getPopularTvShows(language: string) {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export function getAiringTodayTvShows(language: string) {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export function getOnAirTvShows(language: string) {
  return fetch(
    `${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

// Keyword 언어 지원 없음
export function getKeyword(category: string, movieId: number) {
  return fetch(
    `${BASE_PATH}/${category}/${movieId}/keywords?api_key=${API_KEY}`
  ).then((response) => response.json());
}

// Trailer
export function getTrailer(
  category: string,
  movieId: number,
  language: string
) {
  return fetch(
    `${BASE_PATH}/${category}/${movieId}/videos?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

// Genres
export function getGenres(category: string, language: string) {
  return fetch(
    `${BASE_PATH}/genre/${category}/list?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

// Search
export function getSearch(
  category: string,
  query: string | null,
  language: string
) {
  return fetch(
    `${BASE_PATH}/search/${category}?api_key=${API_KEY}&query=${query}}&page=1&include_adult=false&language=${language}`
  ).then((response) => response.json());
}

// Detail
export function getDetail(
  category: string,
  contents_id: number,
  language: string
) {
  return fetch(
    `${BASE_PATH}/${category}/${contents_id}?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

// Movie Detail
export function getCollection(collectionId: number, language: string) {
  return fetch(
    `${BASE_PATH}/collection/${collectionId}?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

// Tv Season Detail
export function getSeasonDetail(
  tv_id: number,
  season_number: number,
  language: string
) {
  return fetch(
    `${BASE_PATH}/tv/${tv_id}/season/${season_number}?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export function getEpisodeDetail(
  tv_id: number,
  season_number: number,
  episode_number: number,
  language: string
) {
  return fetch(
    `${BASE_PATH}/tv/${tv_id}/season/${season_number}/episode/${episode_number}?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

// Another Contents Lists
export function getRecommendation(
  category: string,
  contents_id: number,
  language: string
) {
  return fetch(
    `${BASE_PATH}/${category}/${contents_id}/recommendations?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export function getSimilar(
  category: string,
  contents_id: number,
  language: string
) {
  return fetch(
    `${BASE_PATH}/${category}/${contents_id}/similar?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export function getCrews(
  category: string,
  contents_id: number,
  language: string
) {
  return fetch(
    `${BASE_PATH}/${category}/${contents_id}/credits?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}

export function getTvSeasonCrews(
  tv_id: number,
  season_number: number,
  language: string
) {
  return fetch(
    `${BASE_PATH}/tv/${tv_id}/season/${season_number}/credits?api_key=${API_KEY}&language=${language}`
  ).then((response) => response.json());
}
