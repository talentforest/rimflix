import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowSize from "../hook/useWindowSize";
import device from "../theme/mediaQueries";
import { makeImagePath } from "../utils/makeImagePath";
import { v4 as uuidv4 } from "uuid";
import { IGetMovieTv } from "../api/api";
import styled from "styled-components";

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
  normal: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    y: 10,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween",
    },
  },
};

interface PropsType {
  contents: IGetMovieTv;
  type: string;
  category: string;
}

const ContentsBox = ({ contents }: PropsType) => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const { windowSize } = useWindowSize();

  const onBoxClicked = (id: number) => {
    if (location === "/") {
      navigate(`/movie/${id}`);
    } else if (location === "/tv") {
      navigate(`/tv/${id}`);
    }
  };

  return (
    <Box
      layoutId={`${contents.id}/${uuidv4()}`}
      key={contents.id}
      onClick={() => onBoxClicked(contents.id)}
      variants={boxVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween" }}
      $bgPhoto={
        windowSize.width > 500
          ? makeImagePath(contents.backdrop_path || contents.poster_path)
          : makeImagePath(contents.poster_path || contents.backdrop_path)
      }
    >
      <Info variants={infoVariants}>
        <h4>
          {contents.title
            ? +`${contents.title?.length}` > 28
              ? `${contents.title?.slice(0, 28)}...`
              : contents.title
            : +`${contents.name?.length}` > 28
            ? `${contents.name?.slice(0, 28)}...`
            : contents.name}
        </h4>
        <div>
          <span>
            {contents.release_date
              ? contents.release_date
              : contents.first_air_date}
          </span>
          <span>{contents.vote_average}</span>
        </div>
      </Info>
    </Box>
  );
};

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
  opacity: 0;
  background-color: ${(props) => props.theme.black.darker};
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

export default ContentsBox;
