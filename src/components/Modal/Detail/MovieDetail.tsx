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
} from "../../../api/api";
import { useState } from "react";
import { useQuery } from "react-query";
import { convertRunningTime } from "../../../utils/convertRunningTime";
import { AccessTime } from "@mui/icons-material";
import { Category, Keywords, RateTime } from "./TvDetail";
import { GenresKeyword, Info } from "../Detail";
import { motion } from "framer-motion";
import Collection from "./Collection";
import useCategory from "../../../hook/useCategory";
import SimilarRecommendationList from "./SimilarRecommendationList";
import Cast from "./Cast";
import InfoBox from "../../common/InfoBox";
import RateBox from "../../common/RateBox";

interface PropsType {
  movieDetail: IDetail;
}

const MovieDetail = ({ movieDetail }: PropsType) => {
  const [showAllKeywords, setShowAllKeywords] = useState(false);
  const { category, onCategoryClick, animate } = useCategory(
    movieDetail?.belongs_to_collection ? "collection" : "similar"
  );

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

  const { data: crew, isLoading: crewLoading } = useQuery<ICastCrew>(
    ["crew", movieDetail.id],
    () => getCrews("movie", +movieDetail.id)
  );

  const { data: keyword, isLoading: keywordLoading } = useQuery<IKeywords>(
    ["keyword", "movie", movieDetail.id],
    () => getKeyword("movie", +movieDetail.id)
  );

  const handleKeywordNumberClick = () => {
    setShowAllKeywords((prev) => !prev);
  };
  const {
    poster_path,
    overview,
    runtime,
    belongs_to_collection,
    vote_average,
  } = movieDetail;

  return (
    <>
      {!keywordLoading && keyword.keywords?.length !== 0 && (
        <GenresKeyword>
          <h5>Keywords</h5>
          <Keywords>
            {keyword.keywords
              ?.slice(0, showAllKeywords ? keyword.keywords?.length : 5)
              ?.map((item) => (
                <InfoBox key={item.id} info={item.name} />
              ))}
            {keyword.keywords?.length > 5 && (
              <button onClick={handleKeywordNumberClick}>
                {showAllKeywords ? "Fold Keywords" : "See More Keywords"}
              </button>
            )}
          </Keywords>
        </GenresKeyword>
      )}
      <RateTime>
        {(runtime || runtime === 0) && (
          <>
            <RateBox detail={true} rate={vote_average} />
            {!!runtime && (
              <div>
                <AccessTime />
                <span>{`${convertRunningTime(runtime)}`}</span>
              </div>
            )}
          </>
        )}
      </RateTime>
      <Info $column="column">
        <h5>Overview</h5>
        <p>{overview || "There is no information"}</p>
      </Info>
      {!crewLoading && (
        <Info $column="column">
          <h5>Cast</h5>
          {crew?.cast?.length !== 0 ? (
            <Cast cast={crew?.cast} />
          ) : (
            "There is no information"
          )}
        </Info>
      )}
      {!recommendationLoading && !similarLoading && !collectionIsLoading && (
        <Info $column="column">
          <Category>
            {belongs_to_collection && (
              <motion.li
                onClick={() => onCategoryClick("collection")}
                animate={animate("collection")}
              >
                <span>Collection</span>
              </motion.li>
            )}
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
          {category === "collection" && belongs_to_collection && (
            <Collection parts={collection.parts} officailPoster={poster_path} />
          )}
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
