import styled from "styled-components";
import device from "../theme/mediaQueries";
import { Link, useLocation } from "react-router-dom";
import { getMovieTrailer, getTvTrailer, IGetVideo, IDetail } from "../api/api";
import { makeImagePath } from "../utils/makeImagePath";
import { Close, Info, PlayCircle } from "@mui/icons-material";
import { useQuery } from "react-query";
import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import useWindowSize from "../hook/useWindowSize";

interface PropsType {
  data?: IDetail;
}

const Banner = ({ data }: PropsType) => {
  const [videoClick, setVideoClick] = useState(false);
  const { windowSize } = useWindowSize();
  const pathname = useLocation().pathname;
  const videoId = data?.id;

  const { data: movieTrailer } = useQuery<IGetVideo>(
    ["movies", videoId],
    () => getMovieTrailer(videoId),
    {
      enabled: Boolean(videoId),
    }
  );

  const { data: tvTrailer } = useQuery<IGetVideo>(
    ["tv", videoId],
    () => getTvTrailer(videoId),
    {
      enabled: pathname.includes("/tv"),
    }
  );

  const handlePlayClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setVideoClick((prev) => !prev);
  };

  return !videoClick ? (
    <Container
      $bgPhoto={
        windowSize.width > 500
          ? makeImagePath(data?.backdrop_path || data?.poster_path)
          : makeImagePath(data?.poster_path || data?.backdrop_path)
      }
    >
      {data?.title ? <Title>{data?.title}</Title> : <Title>{data?.name}</Title>}
      {windowSize.width > 1023 ? <Overview>{data?.overview}</Overview> : null}
      <div>
        <Link
          to={pathname === "/tv" ? `/tv/${data?.id}` : `/movie/${data?.id}`}
        >
          <InfoButton>
            <span>More Info</span>
            <Info />
          </InfoButton>
        </Link>
        <TrailerButton onClick={handlePlayClick}>
          <span>Trailer</span>
          <PlayCircle />
        </TrailerButton>
      </div>
    </Container>
  ) : (
    <>
      <Video>
        {pathname.includes("/tv") ? (
          <Trailer
            url={`https://www.youtube.com/watch?v=${tvTrailer?.results[0]?.key}`}
            playing={true}
            muted={false}
            controls={false}
            loop={true}
            width="100%"
            height="100%"
            config={{
              youtube: { playerVars: { origin: "https://localhost:3000" } },
            }}
          />
        ) : (
          <Trailer
            url={`https://www.youtube.com/watch?v=${movieTrailer?.results[0]?.key}`}
            playing={true}
            muted={false}
            controls={false}
            loop={true}
            width="100%"
            height="100%"
            config={{
              youtube: { playerVars: { origin: "https://localhost:3000" } },
            }}
          />
        )}
      </Video>
      <TrailerCloseButton onClick={handlePlayClick}>
        <span>Close</span>
        <Close />
      </TrailerCloseButton>
    </>
  );
};

const Container = styled.div<{ $bgPhoto: string }>`
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 60px 0px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  color: #fff;
  > a {
    margin-top: 20px;
    width: fit-content;
    height: fit-content;
  }
  > div {
    display: flex;
    margin-top: 15px;
  }
  @media ${device.tablet} {
    background-size: cover;
    background-repeat: no-repeat;
    align-items: center;
    padding: 0px 20px;
    height: 80vh;
  }
  @media ${device.mobile} {
    padding: 0px 20px;
    height: 80vh;
  }
`;

const Title = styled.h2`
  font-size: 50px;
  font-weight: 700;
  margin: 20px 0;
  @media ${device.tablet} {
    text-align: center;
    font-size: 45px;
    margin-top: 260px;
  }
  @media ${device.mobile} {
    font-size: 28px;
    margin-top: 260px;
  }
`;

const Overview = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
  width: 55%;
`;

const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  width: 130px;
  height: 45px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  background-color: #fff;
  margin: 20px 0;
  > span {
    margin-right: 5px;
  }
  @media ${device.tablet} {
    height: 50px;
    font-weight: 700;
    padding-left: 10px;
  }
  @media ${device.mobile} {
    font-size: 14px;
    width: 100px;
    height: 40px;
    font-weight: 700;
    padding-left: 10px;
  }
`;

const Video = styled.div`
  margin-top: 60px;
  position: relative;
  height: 450px;
  @media ${device.tablet} {
    height: 450px;
  }
  @media ${device.mobile} {
    height: 250px;
  }
`;

const Trailer = styled(ReactPlayer)`
  position: absolute;
  top: 0;
  left: 0;
`;

const TrailerButton = styled(InfoButton)`
  background-color: #fe5151;
  color: #fff;
  margin-left: 10px;
`;

const TrailerCloseButton = styled(TrailerButton)`
  margin: 0 auto 100px;

  @media ${device.tablet} {
  }
  @media ${device.mobile} {
    margin: 0 auto 40px;
  }
`;

export default Banner;
