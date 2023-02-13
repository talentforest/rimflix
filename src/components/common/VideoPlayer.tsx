import { MovieCreation, VolumeOff, VolumeUp } from '@mui/icons-material';
import { useState } from 'react';
import { backdropSizes, sizeImagePath } from '../../utils/sizeImagePath';
import ReactPlayer from 'react-player/lazy';
import styled from 'styled-components';
import useTrailerQuery from '../../hook/query/useTrailerQuery';

interface PropsType {
  videoId: number;
  backdropPath?: string;
  title: string;
}

const VideoPlayer = ({ videoId, backdropPath, title }: PropsType) => {
  const [volume, setVolume] = useState(true);
  const { trailer, trailerLoading } = useTrailerQuery(videoId);
  const handleVolume = () => setVolume((prev) => !prev);

  return !trailerLoading && trailer.results?.length ? (
    <>
      <Trailer
        url={`https://www.youtube.com/watch?v=${
          trailer.results[trailer.results.length - 1]?.key
        }`}
        playing={true}
        muted={volume ? true : false}
        controls={false}
        loop={true}
        width='100%'
        height='100%'
        config={{
          youtube: {
            playerVars: {
              origin: 'https://localhost:3000',
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
          loading='lazy'
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
