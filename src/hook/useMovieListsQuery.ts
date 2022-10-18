import { useQuery } from "react-query";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMovieTvResult,
} from "../api/api";

const useMovieListsQuery = () => {
  const nowPlaying = useQuery<IGetMovieTvResult>(
    ["movies", "nowPlaying"],
    getNowPlayingMovies
  );

  const topRated = useQuery<IGetMovieTvResult>(
    ["movies", "topRated"],
    getTopRatedMovies
  );

  const upcoming = useQuery<IGetMovieTvResult>(
    ["movies", "upcoming"],
    getUpcomingMovies
  );

  const popular = useQuery<IGetMovieTvResult>(
    ["movies", "popular"],
    getPopularMovies
  );

  return {
    nowPlaying,
    topRated,
    upcoming,
    popular,
  };
};

export default useMovieListsQuery;
