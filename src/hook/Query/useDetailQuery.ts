import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDetail, IDetail } from "../../api/api";
import useFindPath from "../useFindPath";

const useDetailQuery = () => {
  const { id } = useParams();
  const { tvPath, moviePath } = useFindPath();

  const { data: movieDetail, isLoading: movieDetailIsLoading } =
    useQuery<IDetail>(["detail", "movie", +id], () => getDetail("movie", +id), {
      enabled: !!id && moviePath,
    });

  const { data: tvDetail, isLoading: tvDetailIsLoading } = useQuery<IDetail>(
    ["detail", "tv", +id],
    () => getDetail("tv", +id),
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
