import { useQuery } from "react-query";
import {
  getAiringTodayTvShows,
  getOnAirTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  IGetMovieTvResult,
} from "../api/api";

const useTvListsQuery = () => {
  const top = useQuery<IGetMovieTvResult>(["tvs", "top"], getTopRatedTvShows);

  const popular = useQuery<IGetMovieTvResult>(
    ["tvs", "popular"],
    getPopularTvShows
  );

  const airingToday = useQuery<IGetMovieTvResult>(
    ["tvs", "airingToday"],
    getAiringTodayTvShows
  );

  const onAir = useQuery<IGetMovieTvResult>(["tvs", "onAir"], getOnAirTvShows);

  return {
    top,
    popular,
    airingToday,
    onAir,
  };
};

export default useTvListsQuery;
