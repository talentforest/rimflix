import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { makeImagePath } from "../../utils/makeImagePath";
import { IGenres } from "../../api/api";
import InfoBox from "./InfoBox";
import RateBox from "./RateBox";
import styled from "styled-components";
import device from "../../theme/mediaQueries";

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.15,
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
    opacity: 1.15,
    y: 0,
    zIndex: 1,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween",
    },
  },
};

interface PropsType {
  movieId?: boolean;
  tvId?: boolean;
  id: number;
  poster: string;
  backdrop: string;
  title: string;
  firstDate: string;
  rate: number;
  genreNames: IGenres[];
}

const HoverBox = ({
  movieId,
  tvId,
  id,
  poster,
  backdrop,
  title,
  firstDate,
  rate,
  genreNames,
}: PropsType) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onBoxClicked = (id: number) => {
    if (pathname === "/") return navigate(`/movie/${id}`);
    if (pathname === "/search") return navigate(`/search/${id}`);
    if (pathname === "/tv") return navigate(`/tv/${id}`);
    if (movieId) return navigate(`/myfavorite/movie/${id}`);
    if (tvId) return navigate(`/myfavorite/tv/${id}`);
  };
  return (
    <Box
      layoutId={`${id}/${uuidv4()}`}
      key={id}
      onClick={() => onBoxClicked(id)}
      variants={boxVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween" }}
    >
      <Image
        src={makeImagePath(poster || backdrop)}
        alt="poster"
        loading="lazy"
      />
      <Info variants={infoVariants}>
        <h4>{title}</h4>
        <Genres>
          {genreNames?.map((item) => (
            <InfoBox key={item.id} info={item.name} />
          ))}
        </Genres>
        <ExtraInfo>
          <span>{firstDate?.split("-").join(".")}</span>
          <RateBox rate={rate} />
        </ExtraInfo>
      </Info>
    </Box>
  );
};

const Box = styled(motion.div)`
  position: relative;
  height: 100%;
  border-radius: 5px;
  margin-bottom: 30px;
  cursor: pointer;
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
  position: absolute;
  bottom: -40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  min-height: 110px;
  padding: 10px 20px;
  opacity: 0;
  background-color: ${(props) => props.theme.black.darker};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 16px;
  > h4 {
    width: 100%;
    text-align: center;
    font-weight: 600;
  }
  @media ${device.tablet} {
    bottom: -38px;
    padding: 10px 15px;
  }
  @media ${device.mobile} {
    height: 60px;
    bottom: -48px;
    font-size: 14px;
    padding: 5px;
  }
`;

const Genres = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  > div {
    font-size: 10px;
    padding: 2px;
  }
`;

const ExtraInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  @media ${device.tablet} {
    font-size: 12px;
  }
`;

export default HoverBox;
