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
} from "../api/api";
import useCategory from "./useCategory";

const useMovieDetailQuery = (detail?: IDetail) => {
  const { moviePath } = useCategory();

  const { data: collection, isLoading: collectionIsLoading } =
    useQuery<ICollection>(
      ["details", "collection", detail?.belongs_to_collection?.id],
      () => getCollection(detail?.belongs_to_collection?.id),
      {
        enabled: !!detail?.belongs_to_collection?.id && moviePath,
      }
    );

  const { data: recommendation, isLoading: recommendationLoading } =
    useQuery<IGetMovieTvResult>(
      ["recommendation", "movie", +detail?.id],
      () => getRecommendation("movie", +detail?.id),
      {
        enabled: !!detail?.id && moviePath,
      }
    );

  const { data: similar, isLoading: similarLoading } =
    useQuery<IGetMovieTvResult>(
      ["similar", "movie", detail?.id],
      () => getSimilar("movie", +detail?.id),
      {
        enabled: !!detail?.id && moviePath,
      }
    );

  const { data: crew, isLoading: crewLoading } = useQuery<ICastCrew>(
    ["crew", detail?.id],
    () => getCrews("movie", +detail?.id),
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
