import { MovieCreation, VolumeOff, VolumeUp } from "@mui/icons-material";
import { useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getTrailer, IGetVideo } from "../../api/api";
import { backdropSizes, sizeImagePath } from "../../utils/sizeImagePath";
import ReactPlayer from "react-player/lazy";
import styled from "styled-components";
import device from "../../theme/mediaQueries";

interface PropsType {
  videoId: number;
  backdropPath?: string;
}

const VideoPlayer = ({ videoId, backdropPath }: PropsType) => {
  const [volume, setVolume] = useState(true);
  const { pathname } = useLocation();

  const { data: movieTrailer, isLoading: movieTrailerLoading } =
    useQuery<IGetVideo>(
      ["movieTrailer", videoId],
      () => getTrailer("movie", videoId),
      {
        enabled: (pathname === "/" || pathname.includes("/movie")) && !!videoId,
      }
    );

  const { data: tvTrailer, isLoading: tvTrailerLoading } = useQuery<IGetVideo>(
    ["tvTrailer", videoId],
    () => getTrailer("tv", videoId),
    {
      enabled: pathname.includes("/tv") && !!videoId,
    }
  );

  const handleVolume = () => {
    setVolume((prev) => !prev);
  };

  const tvResults = tvTrailer?.results;
  const movieResults = movieTrailer?.results;

  return (
    <VideoContainer>
      {!movieTrailerLoading &&
      !tvTrailerLoading &&
      (tvResults?.length || movieResults?.length) ? (
        <>
          <Trailer
            url={
              pathname.includes("/tv")
                ? `https://www.youtube.com/watch?v=${
                    tvResults[tvResults.length - 1]?.key
                  }`
                : `https://www.youtube.com/watch?v=${
                    movieResults[movieResults.length - 1]?.key
                  }`
            }
            playing={true}
            muted={volume ? true : false}
            controls={false}
            loop={false}
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  origin: "https://localhost:3000",
                },
              },
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
          {backdropPath ? (
            <BackdropImg
              src={sizeImagePath(backdropSizes.original, backdropPath)}
              alt="backdrop"
              loading="lazy"
            />
          ) : (
            <MovieCreation />
          )}
        </>
      )}
    </VideoContainer>
  );
};

const VideoContainer = styled.section`
  position: relative;
  width: 100%;
  height: 30vh;
  svg {
    width: 30px;
    height: 30px;
  }
  @media ${device.tablet} {
    height: 40vh;
  }
  @media ${device.desktop} {
    height: 45vh;
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;

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