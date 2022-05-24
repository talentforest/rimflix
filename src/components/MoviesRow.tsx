import styled from "styled-components";
import useSlide from "../hook/useSlide";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { IGetMovieTvResult } from "../api/api";
import { makeImagePath } from "../utils/makeImagePath";
import { v4 as uuidv4 } from "uuid";

const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.outerWidth - 10 : window.outerWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth + 10 : -window.outerWidth - 10,
  }),
};
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.5,
    y: -80,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween",
    },
  },
};
const infoVariants = {
  hover: {
    y: 10,
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween",
    },
  },
};

interface PropsType {
  data?: IGetMovieTvResult;
}

const MoviesRow = ({ data }: PropsType) => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();
  const { offset, back, index, toggleLeaving, increaseIndex, decreaseIndex } =
    useSlide(data);

  const ModalMovieMatch = useMatch("/movies/:movieId");
  const ModalTvShowMatch = useMatch("/tv/:tvShowId");

  const onBoxClicked = (id: number) => {
    if (location === "/") {
      navigate(`/movies/${id}`);
    } else if (location === "/tv") {
      navigate(`/tv/${id}`);
    }
  };

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
      (movie) => movie.id + "" === ModalMovieMatch.params.movieId
    );
  const clickedTvShow =
    ModalTvShowMatch?.params.tvShowId &&
    data?.results.find(
      (tvShow) => tvShow.id + "" === ModalTvShowMatch.params.tvShowId
    );

  return (
    <>
      <Slider>
        <svg
          onClick={decreaseIndex}
          width="20px"
          height="100px"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z" />
        </svg>
        <AnimatePresence
          custom={back}
          initial={false}
          onExitComplete={toggleLeaving}
        >
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
            custom={back}
          >
            {data?.results
              ?.slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie_tv) => (
                <Box
                  layoutId={`${movie_tv.id}/${uuidv4()}`}
                  key={movie_tv.id}
                  onClick={() => onBoxClicked(movie_tv.id)}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: "tween" }}
                  $bgPhoto={makeImagePath(
                    movie_tv.backdrop_path || movie_tv.poster_path,
                    "w500"
                  )}
                >
                  <Info variants={infoVariants}>
                    <h4>
                      {movie_tv.title
                        ? +`${movie_tv.title?.length}` > 28
                          ? `${movie_tv.title?.slice(0, 28)}...`
                          : movie_tv.title
                        : +`${movie_tv.name?.length}` > 28
                        ? `${movie_tv.name?.slice(0, 28)}...`
                        : movie_tv.name}
                    </h4>
                    <div>
                      <span>
                        {movie_tv.release_date
                          ? movie_tv.release_date
                          : movie_tv.first_air_date}
                      </span>
                      <span>{movie_tv.vote_average}</span>
                    </div>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <svg
          onClick={increaseIndex}
          width="20px"
          height="100px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="#fff"
            d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"
          />
        </svg>
      </Slider>
      <AnimatePresence>
        {ModalMovieMatch ? (
          <>
            <Overlay
              onClick={() => onOverlayClicked("movie")}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie
              style={{ top: scrollY.get() + 100 }}
              layoutId={ModalMovieMatch.params.movieId}
            >
              {clickedMovie && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedMovie.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  />
                  <BigTitle>{clickedMovie.title}</BigTitle>
                  <BigOverview>{clickedMovie.overview}</BigOverview>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
        {ModalTvShowMatch ? (
          <>
            <Overlay
              onClick={() => onOverlayClicked("tv")}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <BigMovie
              style={{ top: scrollY.get() + 100 }}
              layoutId={ModalTvShowMatch?.params.tvShowId}
            >
              {clickedTvShow && (
                <>
                  <BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clickedTvShow.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  />
                  <BigTitle>{clickedTvShow.title}</BigTitle>
                  <BigOverview>{clickedTvShow.overview}</BigOverview>
                </>
              )}
            </BigMovie>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};

const Slider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  svg {
    margin: 0 10px;
    height: 150px;
    cursor: pointer;
  }
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 150px;
  width: auto;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Img = styled(motion.img)`
  width: 100%;
  height: 150px;
`;

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  padding: 10px;
  opacity: 0;
  position: absolute;
  bottom: -40px;
  width: 100%;
  height: 50px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 12px;
  padding: 10px;
  h4 {
    margin-bottom: 5px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    span {
      margin-right: 5px;
    }
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 500px;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

export default MoviesRow;
