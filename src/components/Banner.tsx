import styled from "styled-components";
import device from "../theme/mediaQueries";
import { Link, useLocation } from "react-router-dom";
import { getMovieTrailer, getTvTrailer, IGetMovieTvResult } from "../api/api";
import { makeImagePath } from "../utils/makeImagePath";
import { Close, Info, PlayCircle } from "@mui/icons-material";
import { useQuery } from "react-query";
import { useState } from "react";
import useWindowSize from "../hook/useWindowSize";

interface PropsType {
  data?: IGetMovieTvResult;
}

const Banner = ({ data }: PropsType) => {
  const [videoClick, setVideoClick] = useState(false);
  const { windowSize } = useWindowSize();
  const pathname = useLocation().pathname;
  const videoId = data?.results[0].id;

  const { data: movieTrailer } = useQuery<IGetMovieTvResult>(
    ["movies", videoId],
    () => getMovieTrailer(videoId)
  );

  const { data: tvTrailer } = useQuery<IGetMovieTvResult>(
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
          ? makeImagePath(
              data?.results[0].backdrop_path || data?.results[0].poster_path
            )
          : makeImagePath(
              data?.results[0].poster_path || data?.results[0].backdrop_path
            )
      }
    >
      {data?.results[0].title ? (
        <Title>{data?.results[0].title}</Title>
      ) : (
        <Title>{data?.results[0].name}</Title>
      )}
      {windowSize.width > 1023 ? (
        <Overview>{data?.results[0].overview}</Overview>
      ) : null}
      <div>
        <Link
          to={
            pathname === "/tv"
              ? `/tv/${data?.results[0].id}`
              : `/movie/${data?.results[0].id}`
          }
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
    <Video>
      {pathname.includes("/tv") ? (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${tvTrailer?.results[0].key}?controls=&autoplay=1&loop=1&mute=1&playlist=${tvTrailer?.results[0].key}`}
          title="YouTube video player"
          allowFullScreen
          allow="accelerometer; autoplay"
        ></iframe>
      ) : (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${movieTrailer?.results[0]?.key}?controls=&autoplay=1&loop=1&mute=1&playlist=${movieTrailer?.results[0]?.key}`}
          title="YouTube video player"
          allowFullScreen
          allow="accelerometer; autoplay"
        ></iframe>
      )}
      <TrailerCloseButton onClick={handlePlayClick}>
        <span>Close</span>
        <Close />
      </TrailerCloseButton>
    </Video>
  );
};

const Container = styled.div<{ $bgPhoto: string }>`
  height: 80vh;
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
    height: 70vh;
  }
  @media ${device.mobile} {
    padding: 0px 20px;
    height: 70vh;
  }
`;

const Title = styled.h2`
  font-size: 55px;
  font-weight: 700;
  margin-bottom: 20px;
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
  font-size: 24px;
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
  > span {
    margin-right: 5px;
  }
  @media ${device.tablet} {
    height: 50px;
    font-weight: 700;
    padding-left: 10px;
  }
  @media ${device.mobile} {
    font-size: 12px;
    height: 30px;
    width: 100px;
    font-weight: 700;
    padding-left: 10px;
  }
`;

const Video = styled.div`
  position: relative;
  margin: 60px 0;
`;

const TrailerButton = styled(InfoButton)`
  background-color: #fe5151;
  color: #fff;
  margin-left: 10px;
`;

const TrailerCloseButton = styled(TrailerButton)`
  position: absolute;
  right: 0;
  margin: 20px 40px 0 0;
  @media ${device.tablet} {
    margin-right: 40px;
    margin-top: 0;
  }
  @media ${device.mobile} {
    margin-right: 20px;
    margin-top: 0;
  }
`;

export default Banner;
