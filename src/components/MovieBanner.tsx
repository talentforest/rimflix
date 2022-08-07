import styled from "styled-components";
import device from "../theme/mediaQueries";
import { Link, useLocation } from "react-router-dom";
import { getMovieTrailer, getTvTrailer, IGetVideo, IDetail } from "../api/api";
import { makeImagePath } from "../utils/makeImagePath";
import { CancelRounded, Info, PlayCircle } from "@mui/icons-material";
import { useQuery } from "react-query";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";

interface PropsType {
  data?: IDetail;
}

const MovieBanner = ({ data }: PropsType) => {
  const [videoClick, setVideoClick] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
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

  const handlePlayClick = () => {
    setVideoClick((prev) => !prev);

    setTimeout(() => {
      setShowMessage((prev) => !prev);
      console.log(showMessage);
    }, 6000);
    setShowMessage((prev) => !prev);
  };

  return !videoClick ? (
    <BannerWrapper>
      <Picture>
        <source
          srcSet={makeImagePath(data?.backdrop_path)}
          media="(min-width: 700px)"
        />
        <img src={makeImagePath(data?.poster_path)} alt="movie poster" />
      </Picture>
      <BannerInfo>
        {data?.title ? (
          <Title>{data?.title}</Title>
        ) : (
          <Title>{data?.name}</Title>
        )}
        <Overview>{data?.overview}</Overview>
        <BannerButtons>
          <InfoButton
            as={Link}
            to={pathname === "/tv" ? `/tv/${data?.id}` : `/movie/${data?.id}`}
          >
            <span>More Info</span>
            <Info />
          </InfoButton>
          <TrailerButton onClick={handlePlayClick}>
            <span>Trailer</span>
            <PlayCircle />
          </TrailerButton>
        </BannerButtons>
      </BannerInfo>
    </BannerWrapper>
  ) : (
    <Video>
      <Trailer
        url={
          pathname.includes("/tv")
            ? `https://www.youtube.com/watch?v=${tvTrailer?.results[0]?.key}`
            : `https://www.youtube.com/watch?v=${movieTrailer?.results[0]?.key}`
        }
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
      <GuideMsg className={showMessage ? "" : "none"}>
        if you want to close the video, then click this button!
        <div />
      </GuideMsg>
      <TrailerCloseButton onClick={handlePlayClick}>
        <CancelRounded />
      </TrailerCloseButton>
    </Video>
  );
};

const GuideMsg = styled.div`
  color: #fff;
  position: absolute;
  top: -55px;
  right: 110px;
  font-size: 18px;
  border-radius: 20px;
  padding: 10px 20px;
  background-color: #ffa2a2;
  div {
    width: 13px;
    height: 13px;
    position: absolute;
    right: -5px;
    bottom: 14px;
    transform: rotate(45deg);
    background-color: #ffa2a2;
  }
  &.none {
    display: none;
  }
  @media ${device.tablet} {
    font-size: 14px;
    top: -58px;
    right: 100px;
    div {
      width: 12px;
      height: 12px;
      right: -4px;
      bottom: 12px;
    }
  }
  @media ${device.mobile} {
    top: -45px;
    right: 90px;
  }
`;

const BannerWrapper = styled.div`
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  margin-bottom: 80px;
`;

const Picture = styled.picture`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: relative;
    z-index: -1;
  }
`;

const BannerInfo = styled.div`
  margin-left: 30px;
  position: absolute;
  @media ${device.tablet} {
    text-align: center;
    font-size: 45px;
    display: block;
    width: 100%;
    margin: 0;
  }
  @media ${device.mobile} {
    font-size: 28px;
  }
`;

const Title = styled.h2`
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 10px;
  @media ${device.tablet} {
    text-align: center;
    font-size: 45px;
    width: 100%;
    margin-bottom: 30px;
  }
  @media ${device.mobile} {
    font-size: 28px;
  }
`;

const Overview = styled.p`
  font-size: 22px;
  width: 650px;
  line-height: 1.2;
  margin-bottom: 30px;
  @media ${device.tablet} {
    display: none;
  }
`;

const BannerButtons = styled.div`
  display: flex;
  gap: 20px;
  @media ${device.tablet} {
    justify-content: center;
  }
  @media ${device.mobile} {
    gap: 10px;
  }
`;

const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 5px;
  width: 150px;
  height: 60px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  background-color: #fff;
  color: #333;
  > span {
    margin-right: 5px;
  }
  @media ${device.tablet} {
    font-weight: 700;
    padding-left: 10px;
    width: 130px;
    height: 50px;
  }
  @media ${device.mobile} {
    font-size: 14px;
    width: 110px;
    height: 40px;
    font-weight: 700;
  }
`;

const Video = styled.div`
  margin: 140px 0 80px;
  position: relative;
  height: 550px;
  box-shadow: 1px 2px 50px rgba(249, 249, 249, 0.3);
  @media ${device.tablet} {
    height: 400px;
  }
  @media ${device.mobile} {
    margin: 110px 0 80px;
    height: 300px;
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

const TrailerCloseButton = styled.button`
  position: absolute;
  right: 40px;
  top: -60px;
  border: none;
  background-color: transparent;
  color: #fff;
  display: flex;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  svg {
    width: 50px;
    height: 50px;
  }
  @media ${device.tablet} {
    svg {
      width: 40px;
      height: 40px;
    }
  }
  @media ${device.mobile} {
    top: -40px;
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export default MovieBanner;
