import { AccessTime } from "@mui/icons-material";
import {
  getTvRecommendation,
  IDetail,
  IGetMovieTvResult,
} from "../../../api/api";
import { convertRunningTime } from "../../../utils/convertRunningTime";
import { useQuery } from "react-query";
import { useState } from "react";
import { makeImagePath } from "../../../utils/makeImagePath";
import { changeDateSeperator } from "../../../utils/changeDateSeperator";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FavoriteButton from "../../common/FavoriteButton";
import InfoBox from "../../common/InfoBox";
import RateBox from "../../common/RateBox";
import Episodes from "./Episodes";
import LinkButton from "./LinkButton";
import device from "../../../theme/mediaQueries";
import styled from "styled-components";

interface PropsType {
  tvDetail: IDetail;
}

const TvDetail = ({ tvDetail }: PropsType) => {
  const [category, setCategory] = useState("seasons");

  const { data: recommendation, isLoading: recommendationLoading } =
    useQuery<IGetMovieTvResult>(["recommendation", "tv", tvDetail.id], () =>
      getTvRecommendation(+tvDetail.id)
    );

  const onCategoryClick = (name: string) => {
    setCategory(name);
  };

  const {
    id,
    poster_path,
    name,
    tagline,
    overview,
    genres,
    episode_run_time,
    homepage,
    seasons,
    number_of_seasons,
    vote_average,
  } = tvDetail;

  return (
    <>
      {!recommendationLoading && (
        <>
          <p>{tagline}</p>
          <h3>{name}</h3>
          {genres?.length !== 0 && (
            <Info>
              <Genres>
                {genres?.map((item) => (
                  <InfoBox key={item.id} info={item.name} />
                ))}
              </Genres>
            </Info>
          )}
          <FavoriteButton contentsId={id} />
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
          <Info $column="column">
            <Category>
              <motion.li
                onClick={() => onCategoryClick("seasons")}
                animate={
                  category === "seasons"
                    ? { scale: 1.1, color: "#ffcccc" }
                    : { scale: 1 }
                }
              >
                <span>Seasons</span>
              </motion.li>
              <motion.li
                onClick={() => onCategoryClick("similar")}
                animate={
                  category === "similar"
                    ? { scale: 1.1, color: "#ffcccc" }
                    : { scale: 1 }
                }
              >
                <span>Similar Contents</span>
              </motion.li>
            </Category>
            {category === "seasons" && number_of_seasons && (
              <Episodes
                seasons={seasons}
                lastSeasonNumber={number_of_seasons}
                officialPoster={poster_path}
              />
            )}
            {category === "similar" && (
              <Recommendation>
                {recommendation?.results?.map((item) => (
                  <Link to={`/tv/${item.id}`}>
                    <img
                      src={makeImagePath(item.poster_path)}
                      alt={`${item.name} poster`}
                    />
                    <h5>{item.name}</h5>
                    <div>
                      <span>{changeDateSeperator(item.first_air_date)}</span>
                      <RateBox rate={item.vote_average} />
                    </div>
                  </Link>
                ))}
              </Recommendation>
            )}
          </Info>
          {homepage && (
            <LinkButton homepage={homepage} contents="Official Homepage" />
          )}
        </>
      )}
    </>
  );
};

export const Info = styled.div<{ $column?: string }>`
  display: flex;
  flex-direction: ${(props) => (props.$column ? "column" : "row")};
  margin-bottom: ${(props) => (props.$column ? "25px" : "15px")};
  align-items: ${(props) => (props.$column ? "flex-start" : "center")};
  > h5 {
    font-size: 16px;
    margin-right: 5px;
    color: #ffcccc;
    width: max-content;
  }
  > p {
    font-size: 16px;
  }
  > img {
    width: 160px;
    height: auto;
    margin: 10px 0;
  }
  @media ${device.mobile} {
    margin-bottom: 16px;
    > h5 {
      margin-bottom: 5px;
    }
    > p {
      margin-top: 0;
    }
    > img {
      width: 120px;
      height: auto;
      margin: 10px 0;
    }
  }
`;

export const Genres = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

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
    margin-bottom: 5px;
    height: 30px;
    color: #888;
    cursor: pointer;
  }
`;

export const Recommendation = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  list-style: none;
  margin-top: 5px;
  > a {
    width: 47%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    padding: 10px;
    background-color: ${(props) => props.theme.black.lighter};
    cursor: pointer;
    &:hover {
      background-color: #444;
    }
    img {
      width: 90px;
      height: auto;
    }
    h5 {
      margin: 5px 0;
      text-align: center;
    }
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 5px;
      span {
        font-size: 14px;
      }
    }
  }
`;

export default TvDetail;
