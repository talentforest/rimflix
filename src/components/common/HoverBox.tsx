import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { posterSizes, sizeImagePath } from "../../utils/sizeImagePath";
import { IDetail, IGenres } from "../../api/api";
import { changeDateSeperator } from "../../utils/changeDateSeperator";
import { useRecoilValue } from "recoil";
import { searchState } from "../../data/searchAtom";
import { cutLetter } from "../../utils/cutLetter";
import InfoBox from "./InfoBox";
import Rate from "./Rate";
import styled from "styled-components";
import device from "../../theme/mediaQueries";

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -20,
    zIndex: 2,
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
    opacity: 1.2,
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
  myListMovieId?: boolean;
  myListTvId?: boolean;
  searchMovieId?: number;
  searchTvId?: number;
  contents: IDetail;
  genres?: IGenres[];
}

const HoverBox = ({
  myListMovieId,
  myListTvId,
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
    first_air_date,
    release_date,
    vote_average,
  } = contents;

  const onBoxClicked = (id: number) => {
    if (pathname === "/") return navigate(`/movie/${id}`);
    if (pathname === "/tv") return navigate(`/tv/${id}`);
    if (searchMovieId) return navigate(`/search/movie/${id}/${searchQuery}`);
    if (searchTvId) return navigate(`/search/tv/${id}/${searchQuery}`);
    if (myListMovieId) return navigate(`/myList/movie/${id}`);
    if (myListTvId) return navigate(`/myList/tv/${id}`);
  };

  return (
    <Box
      key={id}
      onClick={() => onBoxClicked(id)}
      variants={boxVariants}
      whileHover="hover"
      initial="normal"
      $height={pathname.includes("search")}
    >
      <Image
        src={sizeImagePath(posterSizes.w342, poster_path)}
        alt={`${title || name} poster`}
      />
      <Info variants={infoVariants}>
        <h1>{cutLetter(title || name, 30)}</h1>
        <Genres>
          {genres?.map((item) => (
            <InfoBox key={item.id} info={item.name} />
          ))}
        </Genres>
        <ExtraInfo>
          <span>{changeDateSeperator(release_date || first_air_date)}</span>
          <Rate rate={vote_average} />
        </ExtraInfo>
      </Info>
    </Box>
  );
};

const Box = styled(motion.div)<{ $height: boolean }>`
  position: relative;
  border-radius: 5px;
  height: 100%;
  z-index: 1;
  cursor: pointer;
  &:first-child {
    -webkit-transform-origin: center left;
    transform-origin: center left;
  }
  &:last-child {
    -webkit-transform-origin: center right;
    transform-origin: center right;
  }
  @media ${device.tablet} {
    height: ${(props) => (props.$height ? "220px" : "100%")};
  }
  @media ${device.desktop} {
    height: ${(props) => (props.$height ? "260px" : "100%")};
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
  border-radius: 5px;
`;

const Info = styled(motion.div)`
  opacity: 0;
  position: absolute;
  bottom: -50px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  min-height: 120px;
  padding: 5px 10px;
  background-color: ${(props) => props.theme.black.darker};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 16px;
  > h1 {
    width: 100%;
    font-weight: 700;
  }
  @media ${device.tablet} {
    bottom: -38px;
    padding: 5px 10px;
    font-size: 16px;
    height: 130px;
  }
  @media ${device.desktop} {
    > h1 {
      font-size: 18px;
    }
  }
`;

const Genres = styled.ul`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 4px;
  margin: 5px 0;
  > li {
    font-size: 10px;
    padding: 3px;
  }
  @media ${device.tablet} {
    > li {
      font-size: 11px;
    }
  }
  @media ${device.desktop} {
    > li {
      font-size: 13px;
    }
  }
`;

const ExtraInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  @media ${device.tablet} {
  }
`;

export default HoverBox;
