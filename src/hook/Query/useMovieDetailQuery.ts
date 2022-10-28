import { useContext } from "react";
import { useQuery } from "react-query";
import {
  getCollection,
  getCrews,
  getKeyword,
  getRecommendation,
  getSimilar,
  ICastCrew,
  ICollection,
  IDetail,
  IGetMovieTvResult,
  IKeywords,
} from "../../api/api";
import { LanguageContext } from "../../context/LanguageContext";
import useFindPath from "../useFindPath";

const useMovieDetailQuery = (detail?: IDetail) => {
  const { moviePath } = useFindPath();
  const { language } = useContext(LanguageContext);

  const { data: collection, isLoading: collectionIsLoading } =
    useQuery<ICollection>(
      ["details", "collection", detail?.belongs_to_collection?.id, language],
      () => getCollection(detail?.belongs_to_collection?.id, language),
      {
        enabled: !!detail?.belongs_to_collection?.id && moviePath,
      }
    );

  const { data: recommendation, isLoading: recommendationLoading } =
    useQuery<IGetMovieTvResult>(
      ["recommendation", "movie", +detail?.id, language],
      () => getRecommendation("movie", +detail?.id, language),
      {
        enabled: !!detail?.id && moviePath,
      }
    );

  const { data: similar, isLoading: similarLoading } =
    useQuery<IGetMovieTvResult>(
      ["similar", "movie", detail?.id, language],
      () => getSimilar("movie", +detail?.id, language),
      {
        enabled: !!detail?.id && moviePath,
      }
    );

  const { data: crew, isLoading: crewLoading } = useQuery<ICastCrew>(
    ["crew", detail?.id, language],
    () => getCrews("movie", +detail?.id, language),
    {
      enabled: !!detail?.id && moviePath,
    }
  );

  const { data: keyword, isLoading: keywordLoading } = useQuery<IKeywords>(
    ["keyword", "movie", detail?.id],
    () => getKeyword("movie", +detail?.id),
    {
      enabled: !!detail?.id && moviePath,
    }
  );

  return {
    collection,
    collectionIsLoading,
    recommendation,
    recommendationLoading,
    similar,
    similarLoading,
    crew,
    crewLoading,
    keyword,
    keywordLoading,
  };
};

export default useMovieDetailQuery;
