import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { posterSizes, sizeImagePath } from "../../utils/sizeImagePath";
import { IDetail, IGenres } from "../../api/api";
import { changeDateSeperator } from "../../utils/changeDateSeperator";
import { useRecoilValue } from "recoil";
import { searchState } from "../../data/searchAtom";
import { cutLetter } from "../../utils/cutLetter";
import { bigVariants, infoVariants } from "../../utils/variants";
import InfoBox from "./InfoBox";
import Rate from "./Rate";
import styled from "styled-components";
import device from "../../theme/mediaQueries";
import useCategory from "../../hook/useCategory";

interface PropsType {
  searchMovieId?: number;
  searchTvId?: number;
  contents: IDetail;
  genres?: IGenres[];
}

const HoverBox = ({
  searchMovieId,
  searchTvId,
  contents,
  genres,
}: PropsType) => {
  const searchQuery = useRecoilValue(searchState);
  const { homePath, tvPath, searchPath } = useCategory();
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
    if (homePath) return navigate(`/movie/${id}`);
    if (tvPath) return navigate(`/tv/${id}`);
    if (searchMovieId) return navigate(`/search/movie/${id}/${searchQuery}`);
    if (searchTvId) return navigate(`/search/tv/${id}/${searchQuery}`);
  };

  return (
    <Box
      key={id}
      onClick={() => onBoxClicked(id)}
      variants={bigVariants}
      whileHover="hover"
      initial="normal"
      $height={searchPath}
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
  width: 100%;
  z-index: 1;
  cursor: pointer;
  &:nth-child(3n + 1) {
    -webkit-transform-origin: center left;
    transform-origin: center left;
  }
  &:nth-child(3n) {
    -webkit-transform-origin: center right;
    transform-origin: center right;
  }
  @media ${device.tablet} {
    &:nth-child(3n + 1) {
      -webkit-transform-origin: center center;
      transform-origin: center center;
    }
    &:nth-child(3n) {
      -webkit-transform-origin: center center;
      transform-origin: center center;
    }
    &:nth-child(5n + 1) {
      -webkit-transform-origin: center left;
      transform-origin: center left;
    }
    &:nth-child(5n) {
      -webkit-transform-origin: center right;
      transform-origin: center right;
    }
  }
  @media ${device.desktop} {
    &:nth-child(3n + 1) {
      -webkit-transform-origin: center center;
      transform-origin: center center;
    }
    &:nth-child(3n) {
      -webkit-transform-origin: center center;
      transform-origin: center center;
    }
    &:nth-child(5n + 1) {
      -webkit-transform-origin: center center;
      transform-origin: center center;
    }
    &:nth-child(5n) {
      -webkit-transform-origin: center center;
      transform-origin: center center;
    }
    &:nth-child(6n + 1) {
      -webkit-transform-origin: center left;
      transform-origin: center left;
    }
    &:nth-child(6n) {
      -webkit-transform-origin: center right;
      transform-origin: center right;
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
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
