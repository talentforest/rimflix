import { AccessTime } from "@mui/icons-material";
import { IDetail } from "../../../api/api";
import { convertRunningTime } from "../../../utils/convertRunningTime";
import FavoriteButton from "../../common/FavoriteButton";
import InfoBox from "../../common/InfoBox";
import RateBox from "../../common/RateBox";
import Episodes from "./Episodes";
import LinkButton from "./LinkButton";
import device from "../../../theme/mediaQueries";
import styled from "styled-components";

interface PropsType {
  detail: IDetail;
}

const TvDetail = ({ detail }: PropsType) => {
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
  } = detail;

  return (
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
      {number_of_seasons && (
        <Info $column="column">
          <Episodes
            seasons={seasons}
            lastSeasonNumber={number_of_seasons}
            officialPosterPath={poster_path}
          />
        </Info>
      )}
      {homepage && (
        <LinkButton homepage={detail.homepage} contents="Official Homepage" />
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
    height: 240px;
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
      height: 180px;
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

export default TvDetail;
