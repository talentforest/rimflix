import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils/makeImagePath";
import { v4 as uuidv4 } from "uuid";
import { IDetail } from "../api/api";
import styled from "styled-components";
import device from "../theme/mediaQueries";

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.12,
    y: -20,
    zIndex: 1,
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
    zIndex: 1,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween",
    },
  },
};

interface PropsType {
  contents: IDetail;
}

const ContentsBox = ({ contents }: PropsType) => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const onBoxClicked = (id: number) => {
    if (location === "/") return navigate(`/movie/${id}`);
    if (location === "/search") return navigate(`/search/${id}`);
    if (location === "/tv") return navigate(`/tv/${id}`);
  };

  console.log(contents);

  return (
    <Box
      layoutId={`${contents.id}/${uuidv4()}`}
      key={contents.id}
      onClick={() => onBoxClicked(contents.id)}
      variants={boxVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween" }}
    >
      <Image
        src={makeImagePath(contents?.poster_path || contents?.poster_path)}
        alt="movie poster"
      />
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

const Box = styled(motion.div)`
  position: relative;
  height: 100%;
  border-radius: 3px;
  margin-bottom: 30px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  @media ${device.tablet} {
    height: 240px;
  }
  @media ${device.mobile} {
    height: 180px;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Info = styled(motion.div)`
  opacity: 0;
  background-color: ${(props) => props.theme.black.darker};
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  position: absolute;
  bottom: -40px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-size: 16px;
  padding: 4px;
  width: 100%;
  > h4 {
    font-weight: 700;
    margin-bottom: 4px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    width: 100%;
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
    font-size: 14px;
    > div {
      font-size: 12px;
    }
  }
`;

export default ContentsBox;
