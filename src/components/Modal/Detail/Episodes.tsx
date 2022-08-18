import { useState } from "react";
import { getSeasonDetail, ISeason, ISeasonDetail } from "../../../api/api";
import { makeImagePath } from "../../../utils/makeImagePath";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { convertRunningTime } from "../../../utils/convertRunningTime";
import { AccessTime } from "@mui/icons-material";
import { changeDateSeperator } from "../../../utils/changeDateSeperator";
import RateBox from "../../common/RateBox";
import styled from "styled-components";

interface PropsType {
  seasons: ISeason[];
  lastSeasonNumber: number;
  officialPosterPath: string;
}

const Episodes = ({
  seasons,
  lastSeasonNumber,
  officialPosterPath,
}: PropsType) => {
  const [seasonNumber, setSeasonNumber] = useState(lastSeasonNumber);
  const [episodesCount, setEpisodesCount] = useState(10);
  const { id } = useParams();

  const { data: seasonDetail, isLoading: seasonDetailLoading } =
    useQuery<ISeasonDetail>(["season", "episodes", seasonNumber], () =>
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

  const viewEpisode = episodes?.length > 0 && episodes?.length < 100;

  const viewloadButton =
    exceptNoneInfoEpisodes?.length > 10 &&
    exceptNoneInfoEpisodes?.length > episodesCount;

  const today = new Date().toISOString().split("T")[0];

  const checkScheduledAir =
    new Date(`${seasonDetail?.air_date}`) < new Date(`${today}`);

  return (
    <>
      {!seasonDetailLoading && viewEpisode && (
        <>
          <h5>Seasons</h5>
          <Select defaultValue={seasonNumber} onChange={onSeasonNumberChange}>
            {seasons.map((season) => (
              <option key={season.season_number} value={season.season_number}>
                {season.name}
              </option>
            ))}
          </Select>
          <EpisodeList>
            <BasicInfo>
              <img
                src={makeImagePath(
                  seasonDetail.poster_path || officialPosterPath
                )}
                alt={`${seasonDetail.name} poster`}
              />
              <h5>{seasonDetail.name}</h5>
              {!seasonDetail.air_date || checkScheduledAir ? (
                <span>{changeDateSeperator(seasonDetail.air_date)}</span>
              ) : (
                <>
                  <span>{changeDateSeperator(seasonDetail.air_date)}</span>
                  <span>This Tv Show is going to be aired.</span>
                </>
              )}
              <p>{seasonDetail.overview}</p>
            </BasicInfo>
            {exceptNoneInfoEpisodes?.slice(0, episodesCount)?.map((episode) => (
              <Episode key={episode.id}>
                <h6>{episode.name}</h6>
                {episode.still_path ? (
                  <StillImg
                    src={makeImagePath(episode.still_path)}
                    alt="still"
                    loading="lazy"
                  />
                ) : (
                  <AlternateImg
                    src={makeImagePath(
                      seasonDetail?.poster_path || officialPosterPath
                    )}
                    alt="still"
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
            {viewloadButton && (
              <button onClick={handleLoadMoreClick}>Load More</button>
            )}
          </EpisodeList>
        </>
      )}
    </>
  );
};

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
    margin-bottom: 5px;
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
`;

const Select = styled.select`
  margin-top: 5px;
  height: 30px;
  &:focus {
    outline: none;
  }
`;

const BasicInfo = styled.div`
  background-color: #c0c0c0;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  img {
    width: 80px;
    height: 110px;
    float: left;
    margin-right: 10px;
  }
  span {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
  }
  h5 {
    font-weight: 700;
    margin-bottom: 5px;
  }
`;

const StillImg = styled.img`
  height: 80px;
  width: 130px;
  float: right;
  margin-left: 10px;
`;

const AlternateImg = styled(StillImg)`
  width: 85px;
  height: 110px;
`;

export default Episodes;
