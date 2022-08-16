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

interface ICrew {
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

interface IGuestStar {
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
  name?: string;
  seasons?: ISeason[];
  episode_run_time?: number[];
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

// get Movie Collection info
export function getCollection(collectionId: number) {
  return fetch(
    `${BASE_PATH}/collection/${collectionId}?api_key=${API_KEY}`
  ).then((response) => response.json());
}

// get Genre Ids
export function getGenres() {
  return fetch(`${BASE_PATH}/genre/movie/list?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTvGenres() {
  return fetch(`${BASE_PATH}/genre/tv/list?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

// Movie Api
export function getNowPlayingMovies() {
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

// Tv Season | Episode
export function getSeasonDetail(tv_id: number, season_number: number) {
  return fetch(
    `${BASE_PATH}/tv/${tv_id}/season/${season_number}?api_key=${API_KEY}`
  ).then((response) => response.json());
}

export function getEpisodeDetail(
  tv_id: number,
  season_number: number,
  episode_number: number
) {
  return fetch(
    `${BASE_PATH}/tv/${tv_id}/season/${season_number}/episode/${episode_number}?api_key=${API_KEY}`
  ).then((response) => response.json());
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
export function getDetail(category?: string, contentsId?: number) {
  if (contentsId === undefined) return;
  if (contentsId)
    return fetch(
      `${BASE_PATH}/${category}/${contentsId}?api_key=${API_KEY}`
    ).then((response) => response.json());
}
