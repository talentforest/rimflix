import { useQuery } from "react-query";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMovieTvResult,
} from "../../api/api";
import useFindPath from "../useFindPath";

const useMovieListsQuery = () => {
  const { homePath } = useFindPath();
  const nowPlaying = useQuery<IGetMovieTvResult>(
    ["movies", "nowPlaying"],
    getNowPlayingMovies,
    {
      enabled: homePath,
    }
  );

  const topRated = useQuery<IGetMovieTvResult>(
    ["movies", "topRated"],
    getTopRatedMovies,
    {
      enabled: homePath,
    }
  );

  const upcoming = useQuery<IGetMovieTvResult>(
    ["movies", "upcoming"],
    getUpcomingMovies,
    {
      enabled: homePath,
    }
  );

  const popular = useQuery<IGetMovieTvResult>(
    ["movies", "popular"],
    getPopularMovies,
    {
      enabled: homePath,
    }
  );

  return {
    nowPlaying,
    topRated,
    upcoming,
    popular,
  };
};

export default useMovieListsQuery;
