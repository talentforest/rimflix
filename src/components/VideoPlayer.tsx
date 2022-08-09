import { VolumeOff, VolumeUp } from "@mui/icons-material";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getMovieTrailer, getTvTrailer, IGetVideo } from "../api/api";
import { makeImagePath } from "../utils/makeImagePath";

interface PropsType {
  videoId: number;
  mute: boolean;
  backdropPath?: string;
}

const VideoPlayer = ({ videoId, mute, backdropPath }: PropsType) => {
  const pathname = useLocation().pathname;
  const [volume, setVolume] = useState(true);

  const { data: movieTrailer } = useQuery<IGetVideo>(
    ["movies", videoId],
    () => getMovieTrailer(videoId),
    {
      enabled: pathname === "/" || pathname.includes("/movie"),
    }
  );

  const { data: tvTrailer } = useQuery<IGetVideo>(
    ["tv", videoId],
    () => getTvTrailer(videoId),
    {
      enabled: pathname.includes("/tv"),
    }
  );

  const handleVolume = () => {
    setVolume((prev) => !prev);
  };

  return (
    <>
      {tvTrailer?.results.length || movieTrailer?.results.length ? (
        <>
          <Trailer
            url={
              pathname.includes("/tv")
                ? `https://www.youtube.com/watch?v=${
                    tvTrailer?.results[tvTrailer.results.length - 1]?.key
                  }`
                : `https://www.youtube.com/watch?v=${
                    movieTrailer?.results[movieTrailer.results.length - 1]?.key
                  }`
            }
            playing={true}
            muted={volume ? true : false}
            controls={false}
            loop={true}
            width="100%"
            height="100%"
            config={{
              youtube: { playerVars: { origin: "https://localhost:3000" } },
            }}
          />
          {volume ? (
            <Volume as={VolumeOff} onClick={handleVolume} />
          ) : (
            <Volume as={VolumeUp} onClick={handleVolume} />
          )}
        </>
      ) : (
        <>
          <Overlay />
          <BackdropImg src={makeImagePath(backdropPath)} alt="backdrop" />
        </>
      )}
    </>
  );
};

const Trailer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

const Volume = styled.svg`
  cursor: pointer;
  bottom: 20px;
  left: 20px;
  position: absolute;
  border: 1px solid #aaa;
  border-radius: 50%;
  background-color: #333;
  padding: 2px;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 1) 100%
  );
`;

const BackdropImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default VideoPlayer;
