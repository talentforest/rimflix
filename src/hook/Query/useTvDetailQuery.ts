import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import {
  getKeyword,
  getRecommendation,
  getSeasonDetail,
  getSimilar,
  getTvSeasonCrews,
  ICastCrew,
  IGetMovieTvResult,
  IKeywords,
  ISeasonDetail,
} from "../../api/api";
import useCategory from "../useCategory";

const useTvDetailQuery = (seasonNumber?: number) => {
  const { tvPath } = useCategory();
  const { id } = useParams();

  const { data: recommendation, isLoading: recommendationLoading } =
    useQuery<IGetMovieTvResult>(
      ["recommendation", "tv", id],
      () => getRecommendation("tv", +id),
      {
        enabled: !!id && tvPath,
      }
    );

  const { data: similar, isLoading: similarLoading } =
    useQuery<IGetMovieTvResult>(
      ["similar", "tv", id],
      () => getSimilar("tv", +id),
      {
        enabled: !!id && tvPath,
      }
    );

  const { data: seasonCrew, isLoading: seasonCrewLoading } =
    useQuery<ICastCrew>(
      ["episodes", id, seasonNumber],
      () => getTvSeasonCrews(+id, seasonNumber),
      {
        enabled: !!id && !!seasonNumber && tvPath,
      }
    );

  const { data: keyword, isLoading: keywordLoading } = useQuery<IKeywords>(
    ["keyword", "tv", id],
    () => getKeyword("tv", +id),
    {
      enabled: !!id && tvPath,
    }
  );

  const { data: seasonDetail, isLoading: seasonDetailLoading } =
    useQuery<ISeasonDetail>(
      ["season", "episodes", id, seasonNumber],
      () => getSeasonDetail(+id, seasonNumber),
      {
        enabled: !!id && !!seasonNumber && tvPath,
      }
    );

  return {
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
