import { MovieCreation, VolumeOff, VolumeUp } from "@mui/icons-material";
import { useState } from "react";
import { useQuery } from "react-query";
import { getTrailer, IGetVideo } from "../../api/api";
import { backdropSizes, sizeImagePath } from "../../utils/sizeImagePath";
import ReactPlayer from "react-player/lazy";
import styled from "styled-components";
import useFindPath from "../../hook/useFindPath";

interface PropsType {
  videoId: number;
  backdropPath?: string;
  title: string;
}

const VideoPlayer = ({ videoId, backdropPath, title }: PropsType) => {
  const [volume, setVolume] = useState(true);
  const { homePath, moviePath, tvPath } = useFindPath();

  const { data: movieTrailer, isLoading: movieTrailerLoading } =
    useQuery<IGetVideo>(
      ["movieTrailer", videoId],
      () => getTrailer("movie", videoId),
      {
        enabled: (homePath || moviePath) && !!videoId,
      }
    );

  const { data: tvTrailer, isLoading: tvTrailerLoading } = useQuery<IGetVideo>(
    ["tvTrailer", videoId],
    () => getTrailer("tv", videoId),
    {
      enabled: tvPath && !!videoId,
    }
  );

  const handleVolume = () => {
    setVolume((prev) => !prev);
  };

  const tvResults = tvTrailer?.results;
  const movieResults = movieTrailer?.results;

  return !movieTrailerLoading &&
    !tvTrailerLoading &&
    (tvResults?.length || movieResults?.length) ? (
    <>
      <Trailer
        url={`https://www.youtube.com/watch?v=${
          tvPath
            ? tvResults[tvResults.length - 1]?.key
            : movieResults[movieResults.length - 1]?.key
        }`}
        playing={true}
        muted={volume ? true : false}
        controls={false}
        loop={true}
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
      <Volume as={volume ? VolumeOff : VolumeUp} onClick={handleVolume} />
    </>
  ) : (
    <>
      <Overlay />
      {backdropPath ? (
        <BackdropImg
          src={sizeImagePath(backdropSizes.original, backdropPath)}
          alt={`${title} backdrop`}
          loading="lazy"
        />
      ) : (
        <MovieCreation />
      )}
    </>
  );
};

const Trailer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Volume = styled.svg`
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
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
