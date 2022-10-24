import { useQuery } from "react-query";
import {
  getAiringTodayTvShows,
  getOnAirTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  IGetMovieTvResult,
} from "../../api/api";
import useFindPath from "../useFindPath";

const useTvListsQuery = () => {
  const { tvPath } = useFindPath();
  const top = useQuery<IGetMovieTvResult>(["tvs", "top"], getTopRatedTvShows);

  const popular = useQuery<IGetMovieTvResult>(
    ["tvs", "popular"],
    getPopularTvShows,
    {
      enabled: tvPath,
    }
  );

  const airingToday = useQuery<IGetMovieTvResult>(
    ["tvs", "airingToday"],
    getAiringTodayTvShows,
    {
      enabled: tvPath,
    }
  );

  const onAir = useQuery<IGetMovieTvResult>(
    ["tvs", "onAir"],
    getOnAirTvShows, //
    {
      enabled: tvPath,
    }
  );

  return {
    top,
    popular,
    airingToday,
    onAir,
  };
};

export default useTvListsQuery;
