import { motion, useViewportScroll } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IDetail } from "../../api/api";
import { useRecoilValue } from "recoil";
import { searchState } from "../../data/atoms";
import styled from "styled-components";
import device from "../../theme/mediaQueries";
import VideoPlayer from "../common/VideoPlayer";
import Overlay from "../common/Overlay";
import MovieDetail from "./Detail/MovieDetail";
import TvDetail from "./Detail/TvDetail";
import FavoriteButton from "../common/FavoriteButton";
import InfoBox from "../common/InfoBox";
import LinkButton from "./Detail/LinkButton";

interface PropsType {
  detail: IDetail;
}

const Detail = ({ detail }: PropsType) => {
  const searchQuery = useRecoilValue(searchState);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { scrollY } = useViewportScroll();

  const onOverlayClicked = () => {
    if (pathname.includes("search")) {
      return navigate(`/search/${searchQuery}`);
    }
    if (pathname.includes("myFavorite")) {
      return navigate("/myFavorite");
    }
    if (pathname.includes("movie")) {
      return navigate("/");
    }
    if (pathname.includes("tv")) {
      return navigate("/tv");
    }
  };

  const {
    id,
    backdrop_path,
    poster_path,
    tagline,
    name,
    title,
    genres,
    homepage,
  } = detail;

  return (
    <>
      <Overlay onOverlayClicked={onOverlayClicked} />
      <ModalBox
        style={{ top: scrollY.get() + 100 }}
        layoutId={`${detail?.id}${uuidv4}`}
      >
        <VideoContainer>
          <VideoPlayer
            videoId={id}
            backdropPath={backdrop_path}
            posterPath={poster_path}
          />
        </VideoContainer>
        <AllDetail>
          <p>{tagline}</p>
          <h3>{title || name}</h3>
          {genres?.length !== 0 && (
            <Info>
              <Genres>
                {genres?.map((item) => (
                  <InfoBox key={item.id} info={item.name} />
                ))}
              </Genres>
            </Info>
          )}
          <FavoriteButton contentsId={id} />
          {(pathname.includes("movie") || pathname === "/") && (
            <MovieDetail movieDetail={detail} />
          )}
          {pathname.includes("tv") && <TvDetail tvDetail={detail} />}
          {homepage && (
            <LinkButton homepage={homepage} contents="Official Homepage" />
          )}
        </AllDetail>
      </ModalBox>
    </>
  );
};

const ModalBox = styled(motion.div)`
  z-index: 2;
  width: 50vw;
  position: absolute;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: scroll;
  -ms-overflow-style: none;
  background-color: ${(props) => props.theme.black.darker};
  @media ${device.tablet} {
    width: 70vw;
  }
  @media ${device.mobile} {
    width: 90vw;
  }
`;

const VideoContainer = styled.section`
  position: relative;
  width: 100%;
  height: 330px;
  svg {
    width: 40px;
    height: 40px;
  }
  @media ${device.mobile} {
    height: 230px;
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

const AllDetail = styled.section`
  padding: 20px;
  display: flex;
  flex-direction: column;
  > h3 {
    color: ${(props) => props.theme.white.lighter};
    font-size: 40px;
    font-weight: 700;
    padding-bottom: 30px;
    display: block;
  }
  > p {
    font-size: 20px;
    padding-bottom: 10px;
    color: ${(props) => props.theme.white.lighter};
  }
  @media ${device.tablet} {
    > h3 {
      font-size: 32px;
    }
  }
  @media ${device.mobile} {
    top: -50px;
    > h3 {
      font-size: 24px;
    }
    > p {
      font-size: 14px;
    }
  }
`;

export const Info = styled.section<{ $column?: string }>`
  display: flex;
  flex-direction: ${(props) => (props.$column ? "column" : "row")};
  margin-bottom: ${(props) => (props.$column ? "25px" : "15px")};
  align-items: ${(props) => (props.$column ? "flex-start" : "center")};
  > h5 {
    font-size: 16px;
    margin-right: 5px;
    margin-bottom: 5px;
    color: #ffcccc;
    width: max-content;
  }
  > p {
    font-size: 16px;
  }
  > img {
    width: 160px;
    height: auto;
    margin: 10px 0;
  }
  @media ${device.mobile} {
    margin-bottom: 30px;
    > h5 {
      margin-bottom: 5px;
    }
    > p {
      margin-top: 0;
    }
    > img {
      width: 120px;
      height: auto;
      margin: 10px 0;
    }
  }
`;

export const Genres = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export default Detail;
