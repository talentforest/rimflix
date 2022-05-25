import styled from "styled-components";
import useSlide from "../hook/useSlide";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { IGetMovieTvResult } from "../api/api";
import { makeImagePath } from "../utils/makeImagePath";
import { v4 as uuidv4 } from "uuid";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import device from "../theme/mediaQueries";
import useWindowSize from "../hook/useWindowSize";
import Modal from "./Modal";

const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.outerWidth + 40 : window.outerWidth - 40,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth - 40 : -window.outerWidth + 40,
  }),
};
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -60,
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

const RowSlider = ({ data }: PropsType) => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const { windowSize } = useWindowSize();
  const { offset, back, index, toggleLeaving, increaseIndex, decreaseIndex } =
    useSlide(data);

  const onBoxClicked = (id: number) => {
    if (location === "/") {
      navigate(`/movies/${id}`);
    } else if (location === "/tv") {
      navigate(`/tv/${id}`);
    }
  };

  return (
    <Container>
      <ArrowBackIos sx={{ width: "3%" }} onClick={decreaseIndex} />
      <SliderContainer>
        <Slider>
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
                    $bgPhoto={
                      windowSize.width > 500
                        ? makeImagePath(
                            movie_tv.backdrop_path || movie_tv.poster_path
                          )
                        : makeImagePath(
                            movie_tv.poster_path || movie_tv.backdrop_path
                          )
                    }
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
        </Slider>
        <AnimatePresence>
          <Modal data={data} />
        </AnimatePresence>
      </SliderContainer>
      <ArrowForwardIos sx={{ width: "3%" }} onClick={increaseIndex} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 20px;
  svg {
    margin: 0 10px;
    height: 150px;
    cursor: pointer;
  }
  @media ${device.mobile} {
    padding: 0;
  }
`;

const SliderContainer = styled.div`
  overflow: hidden;
  width: 100%;
  margin: -80px auto 0;
  display: flex;
  align-items: center;
  padding: 80px 0 140px;
  > svg {
    padding-bottom: 10px;
  }
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto 50px;
`;

const Row = styled(motion.div)`
  position: absolute;
  top: 5px;
  width: 100%;
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  @media ${device.tablet} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${device.mobile} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 150px;
  width: auto;
  font-size: 66px;
  border-radius: 3px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  position: absolute;
  bottom: -40px;
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-size: 12px;
  padding: 8px 10px;
  > h4 {
    font-weight: 700;
    margin-bottom: 8px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    span {
      margin-right: 5px;
    }
  }
  @media ${device.tablet} {
    bottom: -38px;
  }
  @media ${device.mobile} {
    height: 60px;
    bottom: -48px;
  }
`;

export default RowSlider;
