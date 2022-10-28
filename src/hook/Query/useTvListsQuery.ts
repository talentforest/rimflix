import { useContext } from "react";
import { useQuery } from "react-query";
import {
  getAiringTodayTvShows,
  getOnAirTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  IGetMovieTvResult,
} from "../../api/api";
import { LanguageContext } from "../../context/LanguageContext";
import useFindPath from "../useFindPath";

const useTvListsQuery = () => {
  const { tvPath } = useFindPath();
  const { language } = useContext(LanguageContext);

  const top = useQuery<IGetMovieTvResult>(["tvs", "top", language], () =>
    getTopRatedTvShows(language)
  );

  const popular = useQuery<IGetMovieTvResult>(
    ["tvs", "popular", language],
    () => getPopularTvShows(language),
    {
      enabled: tvPath,
    }
  );

  const airingToday = useQuery<IGetMovieTvResult>(
    ["tvs", "airingToday", language],
    () => getAiringTodayTvShows(language),
    {
      enabled: tvPath,
    }
  );

  const onAir = useQuery<IGetMovieTvResult>(
    ["tvs", "onAir", language],
    () => getOnAirTvShows(language), //
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
