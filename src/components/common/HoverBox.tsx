import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import { makeImagePath } from "../../utils/makeImagePath";
import { IDetail, IGenres } from "../../api/api";
import { changeDateSeperator } from "../../utils/changeDateSeperator";
import InfoBox from "./InfoBox";
import RateBox from "./RateBox";
import styled from "styled-components";
import device from "../../theme/mediaQueries";
import { useRecoilValue } from "recoil";
import { searchState } from "../../data/atoms";

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
  favMovieId?: boolean;
  favTvId?: boolean;
  searchMovieId?: number;
  searchTvId?: number;
  contents: IDetail;
  genres?: IGenres[];
}

const HoverBox = ({
  favMovieId,
  favTvId,
  searchMovieId,
  searchTvId,
  contents,
  genres,
}: PropsType) => {
  const searchQuery = useRecoilValue(searchState);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const {
    title,
    id,
    name,
    poster_path,
    backdrop_path,
    first_air_date,
    release_date,
    vote_average,
  } = contents;

  const onBoxClicked = (id: number) => {
    if (pathname === "/") return navigate(`/movie/${id}`);
    if (pathname === "/tv") return navigate(`/tv/${id}`);

    if (searchMovieId) return navigate(`/search/movie/${id}/${searchQuery}`);
    if (searchTvId) return navigate(`/search/tv/${id}/${searchQuery}`);

    if (favMovieId) return navigate(`/myFavorite/movie/${id}`);
    if (favTvId) return navigate(`/myFavorite/tv/${id}`);
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
      <Image src={makeImagePath(poster_path || backdrop_path)} alt="poster" />
      <Info variants={infoVariants}>
        <h4>{title || name}</h4>
        <Genres>
          {genres?.map((item) => (
            <InfoBox key={item.id} info={item.name} />
          ))}
        </Genres>
        <ExtraInfo>
          <span>{changeDateSeperator(release_date || first_air_date)}</span>
          <RateBox rate={vote_average} />
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
    padding: 5px 10px;
  }
  @media ${device.mobile} {
    height: 60px;
    bottom: -48px;
    font-size: 14px;
    padding: 5px;
  }
`;

const Genres = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  > li {
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
