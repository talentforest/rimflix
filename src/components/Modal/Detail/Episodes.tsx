import { useState } from "react";
import { getSeasonDetail, ISeason, ISeasonDetail } from "../../../api/api";
import { makeImagePath } from "../../../utils/makeImagePath";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { convertRunningTime } from "../../../utils/convertRunningTime";
import { AccessTime } from "@mui/icons-material";
import { changeDateSeperator } from "../../../utils/changeDateSeperator";
import { checkScheduledAir } from "../../../utils/checkScheduledAir";
import RateBox from "../../common/RateBox";
import styled from "styled-components";
import Loading from "../../common/Loading";
import device from "../../../theme/mediaQueries";

interface PropsType {
  seasons: ISeason[];
  officialPoster: string;
  seasonNumber: number;
  setSeasonNumber: (seasonNumber: number) => void;
}

const Episodes = ({
  seasons,
  officialPoster,
  seasonNumber,
  setSeasonNumber,
}: PropsType) => {
  const [episodesCount, setEpisodesCount] = useState(10);
  const { id } = useParams();

  const { data: seasonDetail, isLoading: seasonDetailLoading } =
    useQuery<ISeasonDetail>(["season", "episodes", id, seasonNumber], () =>
      getSeasonDetail(+id, seasonNumber)
    );

  const onSeasonNumberChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSeasonNumber(+event.currentTarget.value);
  };

  const handleLoadMoreClick = () => {
    setEpisodesCount((prev) => prev + 10);
  };

  const episodes = seasonDetail?.episodes;
  const exceptNoneInfoEpisodes = episodes?.filter(
    (episode) => episode.still_path || episode.overview !== ""
  );

  const viewEpisode =
    exceptNoneInfoEpisodes?.length > 0 && exceptNoneInfoEpisodes?.length < 80;

  const viewLoadButton =
    exceptNoneInfoEpisodes?.length > 10 &&
    exceptNoneInfoEpisodes?.length > episodesCount;

  return (
    <>
      <Select defaultValue={seasonNumber} onChange={onSeasonNumberChange}>
        {seasons.map((season) => (
          <option key={season.id} value={season.season_number}>
            {season.name}
          </option>
        ))}
      </Select>
      <BasicInfo>
        <img
          src={makeImagePath(seasonDetail?.poster_path || officialPoster)}
          alt={`${seasonDetail?.name} poster`}
          loading="lazy"
        />
        <h5>{seasonDetail?.name}</h5>
        {checkScheduledAir(seasonDetail?.air_date) ? (
          <span>{changeDateSeperator(seasonDetail?.air_date)}</span>
        ) : (
          <>
            <span>{changeDateSeperator(seasonDetail?.air_date)}</span>
            <span className="willBeAired">
              This Tv Show is going to be aired.
            </span>
          </>
        )}
        <p>{seasonDetail?.overview}</p>
      </BasicInfo>
      {seasonDetailLoading ? (
        <Loading />
      ) : (
        viewEpisode && (
          <EpisodeList>
            {exceptNoneInfoEpisodes?.slice(0, episodesCount)?.map((episode) => (
              <Episode key={episode.id}>
                <h6>{episode.name}</h6>
                {episode.still_path ? (
                  <StillImg
                    src={makeImagePath(episode.still_path)}
                    alt={`${episode.name} ${episode.episode_number} still`}
                    loading="lazy"
                  />
                ) : (
                  <AlternateImg
                    src={makeImagePath(
                      seasonDetail?.poster_path || officialPoster
                    )}
                    alt={`${episode.name} ${episode.episode_number} still`}
                    loading="lazy"
                  />
                )}
                <div>
                  <RateBox detail={true} rate={episode?.vote_average} />
                  {episode.runtime && (
                    <span>
                      <AccessTime />
                      {convertRunningTime(episode.runtime)}
                    </span>
                  )}
                </div>
                <p>{episode.overview}</p>
              </Episode>
            ))}
            {viewLoadButton && (
              <button onClick={handleLoadMoreClick}>Load More Episodes</button>
            )}
          </EpisodeList>
        )
      )}
    </>
  );
};

const Select = styled.select`
  margin-top: 5px;
  height: 30px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const BasicInfo = styled.div`
  background-color: #c0c0c0;
  color: #333;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  img {
    width: 80px;
    height: auto;
    float: left;
    margin-right: 10px;
  }
  span {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    &.willBeAired {
      color: #896a6a;
    }
  }
  h5 {
    font-weight: 700;
    margin-bottom: 5px;
  }
`;

const EpisodeList = styled.ul`
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 10px 0 20px;
  button {
    border: none;
    background-color: transparent;
    color: #fff;
    width: fit-content;
    align-self: center;
    -webkit-align-self: center;
    padding: 5px;
    margin-top: 10px;
    cursor: pointer;
  }
`;

const Episode = styled.li`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  h6 {
    font-weight: 700;
    margin-bottom: 10px;
    color: #ffcccc;
  }
  > div {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 10px;
    span {
      display: flex;
      align-items: center;
      svg {
        width: 16px;
        height: 16px;
        margin-right: 3px;
      }
    }
  }
  p {
    word-break: break-all;
  }
  @media ${device.mobile} {
    > div {
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    }
  }
`;

const StillImg = styled.img`
  width: 130px;
  height: auto;
  float: right;
  margin-left: 10px;
`;

const AlternateImg = styled(StillImg)`
  width: 85px;
  height: 110px;
`;

export default Episodes;
