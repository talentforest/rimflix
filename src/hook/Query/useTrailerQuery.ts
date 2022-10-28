import { useContext } from "react";
import { useQuery } from "react-query";
import { getTrailer, IGetVideo } from "../../api/api";
import { LanguageContext } from "../../context/LanguageContext";
import useFindPath from "../useFindPath";

const useTrailerQuery = (videoId: number) => {
  const { tvPath } = useFindPath();
  const { language } = useContext(LanguageContext);

  const { data: trailer, isLoading: trailerLoading } = useQuery<IGetVideo>(
    ["trailer", tvPath ? "tv" : "movie", videoId, language],
    () => getTrailer(tvPath ? "tv" : "movie", videoId, language),
    {
      enabled: !!videoId,
    }
  );

  return { trailer, trailerLoading };
};

export default useTrailerQuery;
