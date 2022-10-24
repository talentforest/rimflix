import { useQuery } from "react-query";
import { getSearch, IGetMovieTvResult } from "../api/api";

const useSearchQuery = (searchKeyword: string) => {
  const { data: searchMovies, isLoading: searchMoviesLoading } =
    useQuery<IGetMovieTvResult>(["search", "movies", searchKeyword], () =>
      getSearch("movie", searchKeyword)
    );

  const { data: searchTvShows, isLoading: searchTvShowsLoading } =
    useQuery<IGetMovieTvResult>(["search", "tv", searchKeyword], () =>
      getSearch("tv", searchKeyword)
    );

  return {
    searchMovies,
    searchMoviesLoading,
    searchTvShows,
    searchTvShowsLoading,
  };
};

export default useSearchQuery;
