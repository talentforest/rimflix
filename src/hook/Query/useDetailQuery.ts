import { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDetail, IDetail } from "../../api/api";
import { LanguageContext } from "../../context/LanguageContext";
import useFindPath from "../useFindPath";

const useDetailQuery = () => {
  const { id } = useParams();
  const { tvPath, moviePath } = useFindPath();
  const { language } = useContext(LanguageContext);

  const { data: movieDetail, isLoading: movieDetailIsLoading } =
    useQuery<IDetail>(
      ["detail", "movie", +id, language],
      () => getDetail("movie", +id, language),
      {
        enabled: !!id && moviePath,
      }
    );

  const { data: tvDetail, isLoading: tvDetailIsLoading } = useQuery<IDetail>(
    ["detail", "tv", +id, language],
    () => getDetail("tv", +id, language),
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
