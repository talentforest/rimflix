import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import {
  getCollection,
  getCrews,
  getDetail,
  getKeyword,
  getRecommendation,
  getSimilar,
  ICastCrew,
  ICollection,
  IDetail,
  IGetMovieTvResult,
  IKeywords,
} from "../api/api";

const useMovieDetailQuery = (detail?: IDetail) => {
  const { pathname } = useLocation();
  const { id } = useParams();

  const { data: movieDetail } = useQuery<IDetail>(
    ["detail", "movie", +id],
    () => getDetail("movie", +id),
    {
      enabled: pathname.includes("/movie"),
    }
  );

  const { data: collection, isLoading: collectionIsLoading } =
    useQuery<ICollection>(
      ["details", "collection", detail?.belongs_to_collection?.id],
      () => getCollection(detail?.belongs_to_collection?.id),
      {
        enabled:
          !!detail?.belongs_to_collection?.id && pathname.includes("/movie"),
      }
    );

  const { data: recommendation, isLoading: recommendationLoading } =
    useQuery<IGetMovieTvResult>(
      ["recommendation", "movie", +detail?.id],
      () => getRecommendation("movie", +detail?.id),
      {
        enabled: !!detail?.id && pathname.includes("/movie"),
      }
    );

  const { data: similar, isLoading: similarLoading } =
    useQuery<IGetMovieTvResult>(
      ["similar", "movie", detail?.id],
      () => getSimilar("movie", +detail?.id),
      {
        enabled: !!detail?.id && pathname.includes("/movie"),
      }
    );

  const { data: crew, isLoading: crewLoading } = useQuery<ICastCrew>(
    ["crew", detail?.id],
    () => getCrews("movie", +detail?.id),
    {
      enabled: !!detail?.id && pathname.includes("/movie"),
    }
  );

  const { data: keyword, isLoading: keywordLoading } = useQuery<IKeywords>(
    ["keyword", "movie", detail?.id],
    () => getKeyword("movie", +detail?.id),
    {
      enabled: !!detail?.id && pathname.includes("/movie"),
    }
  );

  return {
    movieDetail,
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
