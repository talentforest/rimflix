import { motion, useViewportScroll } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { IDetail } from "../../api/api";
import styled from "styled-components";
import device from "../../theme/mediaQueries";
import VideoPlayer from "../common/VideoPlayer";
import MovieDetail from "./MovieDetail";
import TvDetail from "./TvDetail";
import MyListButton from "../common/MyListButton";
import RunTime from "./Detail/RunTime";
import Genres from "./Detail/Genres";
import Rate from "../common/Rate";
import useCategory from "../../hook/useCategory";

interface PropsType {
  detail: IDetail;
}

const Modal = ({ detail }: PropsType) => {
  const { scrollY } = useViewportScroll();
  const { moviePath, tvPath } = useCategory();

  const {
    id,
    poster_path,
    backdrop_path,
    tagline,
    overview,
    name,
    title,
    genres,
    homepage,
    vote_average,
    runtime,
    episode_run_time,
  } = detail;

  return (
    <ModalBox style={{ top: scrollY.get() + 100 }} layoutId={`${id}${uuidv4}`}>
      <VideoPlayer videoId={id} backdropPath={backdrop_path} />
      <DetailContainer>
        <p>{tagline}</p>
        <h3>{title || name}</h3>
        <Genres genres={genres} />
        <MyListButton
          category={name ? "tv" : "movie"}
          contentsId={id}
          imgPath={poster_path}
        />
        <RateTime>
          <Rate rate={vote_average} />
          <RunTime runtime={runtime || episode_run_time[0]} />
        </RateTime>
        <Info $column="column">
          <h5>Overview</h5>
          <p>{overview || "There is no information"}</p>
        </Info>
        {moviePath && <MovieDetail detail={detail} />}
        {tvPath && <TvDetail detail={detail} />}
        {homepage && (
          <HomePage href={`${homepage}`} target="_blank" rel="noreferrer">
            Official Pages
          </HomePage>
        )}
      </DetailContainer>
    </ModalBox>
  );
};

const ModalBox = styled(motion.div)`
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 90vw;
  height: 80vh;
  margin: 0 auto;
  border-radius: 15px;
  overflow: scroll;
  -ms-overflow-style: none;
  background-color: ${(props) => props.theme.black.darker};
  @media ${device.tablet} {
    width: 70vw;
  }
  @media ${device.desktop} {
    width: 60vw;
  }
`;

const DetailContainer = styled.section`
  padding: 20px;
  display: flex;
  flex-direction: column;
  > p {
    padding-bottom: 10px;
    color: ${(props) => props.theme.white.lighter};
  }
  > h3 {
    color: ${(props) => props.theme.white.lighter};
    font-size: 26px;
    font-weight: 700;
    padding-bottom: 5px;
    display: block;
  }
  > button {
    margin-bottom: 10px;
    width: fit-content;
    height: 30px;
    padding: 5px;
  }
  @media ${device.desktop} {
    > p {
      font-size: 16px;
    }
    > h3 {
      font-size: 34px;
    }
  }
`;

const RateTime = styled.div`
  display: flex;
  gap: 0 15px;
  margin-bottom: 15px;
  > div:last-child {
    display: flex;
    align-items: center;
    gap: 5px;
    > svg {
      width: 16px;
      height: 16px;
    }
    > span {
      margin-right: 5px;
    }
  }
`;

export const Info = styled.section<{ $column?: string }>`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  flex-direction: ${(props) => (props.$column ? "column" : "row")};
  margin-bottom: ${(props) => (props.$column ? "25px" : "15px")};
  align-items: ${(props) => (props.$column ? "flex-start" : "center")};
  > h5 {
    font-size: 16px;
    font-weight: 700;
    margin-right: 5px;
    margin-bottom: 5px;
    color: ${(props) => props.theme.pink};
    width: max-content;
  }
  > p {
    font-size: 16px;
    line-height: 1.4;
  }
  > img {
    width: 160px;
    height: auto;
    margin: 10px 0;
  }
`;

const HomePage = styled.a`
  padding: 10px 0;
  align-self: flex-end;
  -webkit-align-self: flex-end;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
`;

export default Modal;
