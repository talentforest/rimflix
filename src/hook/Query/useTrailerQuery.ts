import { useQuery } from "react-query";
import { getTrailer, IGetVideo, Language } from "../../api/api";
import useFindPath from "../useFindPath";

const useTrailerQuery = (videoId: number) => {
  const { tvPath } = useFindPath();

  const { data: trailer, isLoading: trailerLoading } = useQuery<IGetVideo>(
    ["trailer", tvPath ? "tv" : "movie", videoId],
    () => getTrailer(tvPath ? "tv" : "movie", videoId, Language.ko),
    {
      enabled: !!videoId,
    }
  );

  return { trailer, trailerLoading };
};

export default useTrailerQuery;
