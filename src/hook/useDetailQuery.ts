import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDetail, IDetail } from "../api/api";
import useCategory from "./useCategory";

const useDetailQuery = (contentsId?: number) => {
  const { id } = useParams();
  const { tvPath, moviePath } = useCategory();

  const { data: movieDetail, isLoading: movieDetailIsLoading } =
    useQuery<IDetail>(
      ["detail", "movie", +id || contentsId],
      () => getDetail("movie", +id || contentsId),
      {
        enabled: !!id && moviePath,
      }
    );

  const { data: tvDetail, isLoading: tvDetailIsLoading } = useQuery<IDetail>(
    ["detail", "tv", +id || contentsId],
    () => getDetail("tv", +id || contentsId),
    {
      enabled: !!id && tvPath,
    }
  );

  return {
    movieDetail,
    movieDetailIsLoading,
    tvDetail,
    tvDetailIsLoading,
  };
};

export default useDetailQuery;
