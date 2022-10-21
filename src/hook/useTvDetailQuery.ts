import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import {
  getDetail,
  getKeyword,
  getRecommendation,
  getSeasonDetail,
  getSimilar,
  getTvSeasonCrews,
  ICastCrew,
  IDetail,
  IGetMovieTvResult,
  IKeywords,
  ISeasonDetail,
} from "../api/api";

const useTvDetailQuery = (seasonNumber?: number) => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const { data: tvDetail } = useQuery<IDetail>(
    ["detail", "tv", +id],
    () => getDetail("tv", +id),
    {
      enabled: pathname.includes("/tv"),
    }
  );

  const { data: recommendation, isLoading: recommendationLoading } =
    useQuery<IGetMovieTvResult>(
      ["recommendation", "tv", id],
      () => getRecommendation("tv", +id),
      {
        enabled: !!id && pathname.includes("/tv"),
      }
    );

  const { data: similar, isLoading: similarLoading } =
    useQuery<IGetMovieTvResult>(
      ["similar", "tv", id],
      () => getSimilar("tv", +id),
      {
        enabled: !!id && pathname.includes("/tv"),
      }
    );

  const { data: seasonCrew, isLoading: seasonCrewLoading } =
    useQuery<ICastCrew>(
      ["episodes", id, seasonNumber],
      () => getTvSeasonCrews(+id, seasonNumber),
      {
        enabled: !!id && !!seasonNumber && pathname.includes("/tv"),
      }
    );

  const { data: keyword, isLoading: keywordLoading } = useQuery<IKeywords>(
    ["keyword", "tv", id],
    () => getKeyword("tv", +id),
    {
      enabled: !!id && pathname.includes("/tv"),
    }
  );

  const { data: seasonDetail, isLoading: seasonDetailLoading } =
    useQuery<ISeasonDetail>(
      ["season", "episodes", id, seasonNumber],
      () => getSeasonDetail(+id, seasonNumber),
      {
        enabled: !!id && !!seasonNumber && pathname.includes("/tv"),
      }
    );

  return {
    tvDetail,
    recommendation,
    recommendationLoading,
    similar,
    similarLoading,
    seasonCrew,
    seasonCrewLoading,
    keyword,
    keywordLoading,
    seasonDetail,
    seasonDetailLoading,
  };
};

export default useTvDetailQuery;
