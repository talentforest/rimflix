import { AccessTime } from "@mui/icons-material";
import {
  getRecommendation,
  getSimilar,
  IDetail,
  IGetMovieTvResult,
} from "../../../api/api";
import { useQuery } from "react-query";
import { convertRunningTime } from "../../../utils/convertRunningTime";
import { motion } from "framer-motion";
import { Info } from "../Detail";
import RateBox from "../../common/RateBox";
import Episodes from "./Episodes";
import styled from "styled-components";
import useCategory from "../../../hook/useCategory";
import device from "../../../theme/mediaQueries";
import SimilarRecommendationList from "./SimilarRecommendationList";

interface PropsType {
  tvDetail: IDetail;
}

const TvDetail = ({ tvDetail }: PropsType) => {
  const { category, onCategoryClick, animate } = useCategory("seasons");

  const { data: recommendation, isLoading: recommendationLoading } =
    useQuery<IGetMovieTvResult>(
      ["recommendation", "tv", tvDetail.id],
      () => getRecommendation("tv", +tvDetail.id),
      {
        enabled: !!tvDetail.id,
      }
    );

  const { data: similar, isLoading: similarLoading } =
    useQuery<IGetMovieTvResult>(["similar", "tv", tvDetail.id], () =>
      getSimilar("tv", +tvDetail.id)
    );

  const {
    poster_path,
    overview,
    episode_run_time,
    seasons,
    number_of_seasons,
    vote_average,
  } = tvDetail;

  return (
    <>
      <RateTime>
        <RateBox detail={true} rate={vote_average} />
        {episode_run_time && (
          <>
            {Boolean(episode_run_time?.length) ? (
              <div>
                <AccessTime />
                <span>{`${convertRunningTime(episode_run_time[0])}`}</span>
              </div>
            ) : (
              <span>There is no information</span>
            )}
          </>
        )}
      </RateTime>
      <Info $column="column">
        <h5>Overview</h5>
        <p>{overview || "There is no information"}</p>
      </Info>
      {!recommendationLoading && !similarLoading && (
        <Info $column="column">
          <Category>
            <motion.li
              onClick={() => onCategoryClick("seasons")}
              animate={animate("seasons")}
            >
              <span>Seasons</span>
            </motion.li>
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
          {category === "seasons" && number_of_seasons && (
            <Episodes
              seasons={seasons}
              lastSeasonNumber={number_of_seasons}
              officialPoster={poster_path}
            />
          )}
          <SimilarRecommendationList
            route="tv"
            category={category}
            recommendation={recommendation.results}
            similar={similar.results}
          />
        </Info>
      )}
    </>
  );
};

export const RateTime = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  > div:last-child {
    display: flex;
    align-items: center;
    gap: 5px;
    > svg {
      width: 16px;
      height: 16px;
    }
    > span {
      margin-right: 5px;
    }
  }
`;

export const Category = styled(motion.div)`
  display: flex;
  gap: 15px;
  li {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 5px;
    height: 30px;
    color: #888;
    cursor: pointer;
  }
  @media ${device.mobile} {
    li {
      font-size: 15px;
    }
  }
`;

export const OtherContents = styled.ul`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  margin-top: 5px;
  @media ${device.tablet} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${device.mobile} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const Contents = styled(motion.li)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #444;
  }
  img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }
`;

export default TvDetail;
