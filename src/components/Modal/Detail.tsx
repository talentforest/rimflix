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

  const { id, backdrop_path, poster_path } = detail;

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
          {(pathname.includes("movie") || pathname === "/") && (
            <MovieDetail detail={detail} />
          )}
          {pathname.includes("tv") && <TvDetail detail={detail} />}
        </AllDetail>
      </ModalBox>
    </>
  );
};

const ModalBox = styled(motion.div)`
  z-index: 3;
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

export default Detail;
