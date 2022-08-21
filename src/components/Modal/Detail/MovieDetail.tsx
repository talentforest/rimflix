import {
  getCollection,
  getRecommendation,
  getSimilar,
  ICollection,
  IDetail,
  IGetMovieTvResult,
} from "../../../api/api";
import { useQuery } from "react-query";
import { convertRunningTime } from "../../../utils/convertRunningTime";
import { AccessTime } from "@mui/icons-material";
import { Category, RateTime } from "./TvDetail";
import { Info } from "../Detail";
import { motion } from "framer-motion";
import RateBox from "../../common/RateBox";
import Collection from "./Collection";
import useCategory from "../../../hook/useCategory";
import SimilarRecommendationList from "./SimilarRecommendationList";

interface PropsType {
  movieDetail: IDetail;
}

const MovieDetail = ({ movieDetail }: PropsType) => {
  const { category, onCategoryClick, animate } = useCategory("similar");

  const { data: collection, isLoading: collectionIsLoading } =
    useQuery<ICollection>(
      ["details", "collection", movieDetail?.belongs_to_collection?.id],
      () => getCollection(movieDetail?.belongs_to_collection?.id),
      {
        enabled: !!movieDetail?.belongs_to_collection?.id,
      }
    );

  const { data: recommendation, isLoading: recommendationLoading } =
    useQuery<IGetMovieTvResult>(
      ["recommendation", "movie", movieDetail.id],
      () => getRecommendation("movie", +movieDetail.id)
    );

  const { data: similar, isLoading: similarLoading } =
    useQuery<IGetMovieTvResult>(["similar", "movie", movieDetail.id], () =>
      getSimilar("movie", +movieDetail.id)
    );

  const {
    poster_path,
    overview,
    runtime,
    belongs_to_collection,
    vote_average,
  } = movieDetail;

  return (
    <>
      <RateTime>
        <RateBox detail={true} rate={vote_average} />
        {(runtime || runtime === 0) && (
          <>
            {runtime ? (
              <div>
                <AccessTime />
                <span>{`${convertRunningTime(runtime)}`}</span>
              </div>
            ) : (
              <span>There is no informationsss</span>
            )}
          </>
        )}
      </RateTime>
      <Info $column="column">
        <h5>Overview</h5>
        <p>{overview || "There is no information"}</p>
      </Info>
      {!collectionIsLoading && (
        <>
          {belongs_to_collection && (
            <Info $column="column">
              <Collection
                collection={collection}
                officailPoster={poster_path}
              />
            </Info>
          )}
        </>
      )}
      {!recommendationLoading && !similarLoading && (
        <Info $column="column">
          <Category>
            {!!similar?.results?.length && (
              <motion.li
                onClick={() => onCategoryClick("similar")}
                animate={animate("similar")}
              >
                <span>Similar</span>
              </motion.li>
            )}
            {!!recommendation?.results?.length && (
              <motion.li
                onClick={() => onCategoryClick("recommendation")}
                animate={animate("recommendation")}
              >
                <span>How about this?</span>
              </motion.li>
            )}
          </Category>
          <SimilarRecommendationList
            route="movie"
            category={category}
            recommendation={recommendation.results}
            similar={similar.results}
          />
        </Info>
      )}
    </>
  );
};

export default MovieDetail;
