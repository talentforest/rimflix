import { useState } from "react";
import { getSeasonDetail, ISeasonDetail } from "../../../api/api";
import { makeImagePath } from "../../../utils/makeImagePath";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { convertRunningTime } from "../../../utils/convertRunningTime";
import { AccessTime } from "@mui/icons-material";
import styled from "styled-components";

interface PropsType {
  seasonNumber: number;
  officialPosterPath: string;
}

const Episodes = ({ seasonNumber, officialPosterPath }: PropsType) => {
  const [episodesCount, setEpisodesCount] = useState(10);
  const { id } = useParams();

  const { data: seasonDetail, isLoading: seasonDetailLoading } =
    useQuery<ISeasonDetail>(["season", "episodes", seasonNumber], () =>
      getSeasonDetail(+id, seasonNumber)
    );

  const handleLoadMoreClick = () => {
    setEpisodesCount((prev) => prev + 10);
  };

  const episodes = seasonDetail?.episodes;

  const exceptNoneInfoEpisodes = episodes?.filter(
    (episode) => episode.still_path && episode.overview !== ""
  );

  const viewEpisode =
    exceptNoneInfoEpisodes?.length > 0 && exceptNoneInfoEpisodes?.length < 50;

  const viewloadButton =
    episodes?.length > 10 && episodes?.length > episodesCount;

  return (
    <>
      {!seasonDetailLoading && viewEpisode && (
        <EpisodeList>
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
              <span>
                <AccessTime />
                {convertRunningTime(episode.runtime)}
              </span>
              <p>{episode.overview}</p>
            </Episode>
          ))}
          {viewloadButton && (
            <button onClick={handleLoadMoreClick}>Load More</button>
          )}
        </EpisodeList>
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
  }
  p {
    word-break: break-all;
  }
  span {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    svg {
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
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
