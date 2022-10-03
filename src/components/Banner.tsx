import { Link, useLocation } from "react-router-dom";
import { IDetail } from "../api/api";
import {
  backdropSizes,
  posterSizes,
  sizeImagePath,
} from "../utils/sizeImagePath";
import ButtonBox from "./common/ButtonBox";
import device from "../theme/mediaQueries";
import styled from "styled-components";

interface PropsType {
  data: IDetail;
}

const Banner = ({ data }: PropsType) => {
  const { pathname } = useLocation();
  const { backdrop_path, poster_path, title, name, overview, id } = data;

  return (
    <BannerContainer>
      <Poster>
        <source
          srcSet={sizeImagePath(backdropSizes.original, backdrop_path)}
          media="(min-width: 700px)"
        />
        <img
          src={sizeImagePath(posterSizes.w780, poster_path)}
          alt={`${title || name}poster`}
        />
      </Poster>
      <PosterInfo>
        <h1>{title || name}</h1>
        <p>{overview}</p>
        <ButtonsContainer>
          <Link to={pathname === "/tv" ? `/tv/${id}` : `/movie/${id}`}>
            <ButtonBox buttonName="More Info" infoIcon={true} />
          </Link>
        </ButtonsContainer>
      </PosterInfo>
    </BannerContainer>
  );
};

const BannerContainer = styled.section`
  height: 70vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
`;

const Poster = styled.picture`
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

const PosterInfo = styled.div`
  margin-left: 40px;
  position: absolute;
  bottom: 50px;
  padding: 0 10px;
  h1 {
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
    h1 {
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
    h1 {
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

export default Banner;
