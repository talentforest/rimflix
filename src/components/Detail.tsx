import { motion, useViewportScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { makeImagePath } from "../utils/makeImagePath";
import { IDetail } from "../api/api";
import styled from "styled-components";
import device from "../theme/mediaQueries";

interface PropsType {
  movieId: string;
  isLoading: boolean;
  data: IDetail;
}

const Detail = ({ movieId, isLoading, data }: PropsType) => {
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();

  const onOverlayClicked = () => {
    navigate(-1);
  };

  return (
    <>
      <Overlay
        onClick={() => onOverlayClicked()}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <BigMovie
        style={{ top: scrollY.get() + 100 }}
        layoutId={`${movieId}${uuidv4}`}
      >
        {!isLoading && data && (
          <>
            <BigCover
              style={{
                backgroundImage: `linear-gradient(to top, #181818, transparent), url(${makeImagePath(
                  data.backdrop_path ? data.backdrop_path : data.poster_path
                )})`,
              }}
            />
            <BigTitle>{data?.title ? data.title : data?.name}</BigTitle>
            <Tagline>{data?.tagline}</Tagline>
            <MovieDetail>
              <Info>
                <h5>Genre : </h5>
                <div>
                  {data.genres.slice(0, 3).map((item) => (
                    <span key={item.id}>{item.name}</span>
                  ))}
                </div>
              </Info>
              <Info>
                <h5>
                  {data?.runtime ? "Running Time :" : "episode_run_time : "}
                </h5>
                <span>
                  {data?.runtime ? data.runtime : data.episode_run_time[0]} min
                </span>
              </Info>
              <p>
                <span>Overview</span>
                {data?.overview.length > 330
                  ? `${data?.overview.slice(0, 330)}...`
                  : data.overview}
              </p>
              {data.homepage ? (
                <a href={`${data.homepage}`} target="_blank" rel="noreferrer">
                  <span>Go Official Page</span>
                </a>
              ) : (
                <></>
              )}
            </MovieDetail>
          </>
        )}
      </BigMovie>
    </>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: 470px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: ${(props) => props.theme.black.darker};
  @media ${device.tablet} {
    width: 450px;
    height: 600px;
  }
  @media ${device.mobile} {
    width: 280px;
    height: 400px;
  }
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 330px;
  @media ${device.tablet} {
    width: 450px;
    height: 320px;
  }
  @media ${device.mobile} {
    width: 280px;
    height: 220px;
  }
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px 20px 0;
  font-size: 46px;
  position: relative;
  font-weight: 700;
  @media ${device.mobile} {
    height: 50px;
    font-size: 22px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
`;

const Tagline = styled.p`
  padding: 0 20px;
  font-size: 20px;
  color: ${(props) => props.theme.white.lighter};
  @media ${device.mobile} {
    font-size: 14px;
    padding: 10px;
  }
`;

const MovieDetail = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  > p {
    height: fit-content;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    line-height: 1.3;
    margin-top: 10px;
    > span {
      color: #c8c8c8;
      font-size: 16px;
      margin-bottom: 5px;
    }
  }
  > a {
    padding: 10px 0;
    align-self: end;
    text-decoration: underline;
    cursor: pointer;
    > span {
      font-size: 12px;
    }
  }
  @media ${device.mobile} {
    top: -50px;
    padding: 0 10px;
    a {
      padding: 10;
      font-size: 11px;
    }
  }
`;

const Info = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  > h5 {
    margin-right: 5px;
    color: #c8c8c8;
  }
  > span {
    margin-right: 3px;
  }
  > div {
    font-size: 16px;
    > span {
      margin-left: 5px;
    }
  }
  @media ${device.mobile} {
    > div {
      font-size: 14px;
    }
  }
`;

export default Detail;
