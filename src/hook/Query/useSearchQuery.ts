import { useContext } from "react";
import { useQuery } from "react-query";
import { getSearch, IGetMovieTvResult } from "../../api/api";
import { LanguageContext } from "../../context/LanguageContext";

const useSearchQuery = (searchKeyword: string) => {
  const { language } = useContext(LanguageContext);

  const { data: searchMovies, isLoading: searchMoviesLoading } =
    useQuery<IGetMovieTvResult>(
      ["search", "movies", searchKeyword, language],
      () => getSearch("movie", searchKeyword, language)
    );

  const { data: searchTvShows, isLoading: searchTvShowsLoading } =
    useQuery<IGetMovieTvResult>(["search", "tv", searchKeyword, language], () =>
      getSearch("tv", searchKeyword, language)
    );

  return {
    searchMovies,
    searchMoviesLoading,
    searchTvShows,
    searchTvShowsLoading,
  };
};

export default useSearchQuery;
