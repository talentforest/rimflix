import styled from "styled-components";
import device from "../theme/mediaQueries";
import { motion, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { getDetail, IDetail, IGetMovieTvResult } from "../api/api";
import { v4 as uuidv4 } from "uuid";
import { makeImagePath } from "../utils/makeImagePath";

interface PropsType {
  data?: IGetMovieTvResult;
}

const Modal = ({ data }: PropsType) => {
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const ModalMovieMatch = useMatch("/movies/:movieId");
  const ModalTvShowMatch = useMatch("tv/:tvShowId");

  const onOverlayClicked = (content: string) => {
    if (content === "movie") {
      navigate("/");
    } else if (content === "tv") {
      navigate("/tv");
    }
  };

  const clickedMovie =
    ModalMovieMatch?.params.movieId &&
    data?.results?.find(
      (movie) => +movie.id === +ModalMovieMatch?.params?.movieId
    );

  const clickedTvShow =
    ModalTvShowMatch?.params.tvShowId &&
    data?.results.find(
      (tvShow) => +tvShow.id === +ModalTvShowMatch.params.tvShowId
    );

  const { data: detail, isLoading: detailIsLoading } = useQuery<IDetail>(
    ["detail", `detail_${ModalMovieMatch?.params.movieId}`],
    () => getDetail("movie", ModalMovieMatch?.params.movieId)
  );

  console.log(detail);

  return (
    <>
      {ModalMovieMatch ? (
        <>
          <Overlay
            onClick={() => onOverlayClicked("movie")}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
          <BigMovie
            style={{ top: scrollY.get() + 100 }}
            layoutId={`${ModalMovieMatch.params.movieId}${uuidv4}`}
          >
            {!detailIsLoading && detail && (
              <>
                <BigCover
                  style={{
                    backgroundImage: `linear-gradient(to top, #181818, transparent), url(${makeImagePath(
                      detail.backdrop_path
                    )})`,
                  }}
                />
                <BigTitle>{detail?.title}</BigTitle>
                <Tagline>{detail?.tagline}</Tagline>
                <MovieDetail>
                  <Info>
                    <h5>Genre : </h5>
                    <div>
                      {detail.genres.slice(0, 3).map((item) => (
                        <span>{item.name}</span>
                      ))}
                    </div>
                  </Info>
                  <Info>
                    <h5>Running Time : </h5>
                    <span>{detail.runtime} min</span>
                  </Info>
                  <Info>
                    <h5>Release Date : </h5>
                    <span>{detail.release_data}</span>
                  </Info>
                  <p>
                    <span>Overview</span>
                    {detail?.overview.length > 330
                      ? `${detail?.overview.slice(0, 330)}...`
                      : detail.overview}
                  </p>
                  <span>{detail.release_data}</span>
                  <a
                    href={`${detail.homepage}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>Go Official Page</span>
                  </a>
                </MovieDetail>
              </>
            )}
          </BigMovie>
        </>
      ) : null}
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
  padding: 20px;
  font-size: 46px;
  position: relative;
  font-weight: 700;
  @media ${device.mobile} {
    height: 50px;
    font-size: 22px;
    display: flex;
    align-items: center;
  }
`;

const Tagline = styled.p`
  padding: 5px 20px 0px;
  height: 60px;
  position: relative;
  top: -120px;
  font-size: 22px;
  color: ${(props) => props.theme.white.lighter};
  @media ${device.mobile} {
    font-size: 14px;
    top: -70px;
  }
`;

const MovieDetail = styled.div`
  position: relative;
  top: -55px;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  > p {
    height: fit-content;
    display: flex;
    flex-direction: column;
    font-size: 14px;
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

export default Modal;
