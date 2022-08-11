import { Link, useLocation } from "react-router-dom";
import { IDetail } from "../api/api";
import { makeImagePath } from "../utils/makeImagePath";
import { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import device from "../theme/mediaQueries";
import styled from "styled-components";
import ButtonBox from "./common/ButtonBox";

interface PropsType {
  data?: IDetail;
}

const Banner = ({ data }: PropsType) => {
  const [videoClick, setVideoClick] = useState(false);
  const { pathname } = useLocation();

  const handlePlayClick = () => {
    setVideoClick((prev) => !prev);
  };

  return !videoClick ? (
    <BannerContainer>
      <Picture>
        <source
          srcSet={makeImagePath(data?.backdrop_path)}
          media="(min-width: 700px)"
        />
        <img src={makeImagePath(data?.poster_path)} alt="movie poster" />
      </Picture>
      <InfoBox>
        {data?.title ? <h3>{data?.title}</h3> : <h3>{data?.name}</h3>}
        <p>{data?.overview}</p>
        <ButtonsContainer>
          <Link
            to={pathname === "/tv" ? `/tv/${data?.id}` : `/movie/${data?.id}`}
          >
            <ButtonBox buttonName="More Info" infoIcon={true} />
          </Link>
          <ButtonBox
            buttonName="Trailer"
            handlePlayClick={handlePlayClick}
            playIcon={true}
          />
        </ButtonsContainer>
      </InfoBox>
    </BannerContainer>
  ) : (
    <VideoContainer>
      <ButtonBox
        buttonName="Close"
        handlePlayClick={handlePlayClick}
        closeIcon={true}
      />
      <VideoPlayer videoId={data.id} />
    </VideoContainer>
  );
};

const BannerContainer = styled.div`
  height: 70vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  margin-bottom: 30px;
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

const InfoBox = styled.div`
  margin-left: 40px;
  position: absolute;
  bottom: 50px;
  h3 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  p {
    font-size: 20px;
    width: 650px;
    line-height: 1.2;
    margin-bottom: 20px;
  }
  @media ${device.tablet} {
    text-align: center;
    font-size: 45px;
    display: block;
    width: 100%;
    bottom: 100px;
    margin: 0;
    h3 {
      text-align: center;
      font-size: 45px;
      width: 100%;
      margin-bottom: 30px;
    }
    p {
      display: none;
    }
  }
  @media ${device.mobile} {
    font-size: 28px;
    bottom: 50px;
    h3 {
      font-size: 28px;
    }
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  @media ${device.tablet} {
    justify-content: center;
  }
  @media ${device.mobile} {
    gap: 10px;
  }
`;

const VideoContainer = styled.div`
  margin: 140px 0 80px;
  position: relative;
  height: 550px;
  box-shadow: 1px 2px 50px rgba(249, 249, 249, 0.3);
  svg {
    width: 40px;
    height: 40px;
  }
  @media ${device.tablet} {
    height: 400px;
  }
  @media ${device.mobile} {
    margin: 110px 0 80px;
    height: 300px;
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export default Banner;
