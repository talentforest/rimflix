import { useContext } from "react";
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
import { LanguageContext } from "../../context/LanguageContext";
import useFindPath from "../useFindPath";

const useTvDetailQuery = (seasonNumber?: number) => {
  const { language } = useContext(LanguageContext);
  const { tvPath } = useFindPath();
  const { id } = useParams();

  const { data: recommendation, isLoading: recommendationLoading } =
    useQuery<IGetMovieTvResult>(
      ["recommendation", "tv", id, language],
      () => getRecommendation("tv", +id, language),
      {
        enabled: !!id && tvPath,
      }
    );

  const { data: similar, isLoading: similarLoading } =
    useQuery<IGetMovieTvResult>(
      ["similar", "tv", id, language],
      () => getSimilar("tv", +id, language),
      {
        enabled: !!id && tvPath,
      }
    );

  const { data: seasonCrew, isLoading: seasonCrewLoading } =
    useQuery<ICastCrew>(
      ["episodes", id, seasonNumber, language],
      () => getTvSeasonCrews(+id, seasonNumber, language),
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
      ["season", "episodes", id, seasonNumber, language],
      () => getSeasonDetail(+id, seasonNumber, language),
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
