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
import device, { deviceSizes } from "../../theme/mediaQueries";
import useFindPath from "../../hook/useFindPath";
import useWindowSize from "../../hook/useWindowSize";

interface PropsType {
  contents: IDetail;
  genres?: IGenres[];
}

const ContentsBox = ({ contents, genres }: PropsType) => {
  const searchQuery = useRecoilValue(searchState);
  const { homePath, tvPath, searchPath } = useFindPath();
  const navigate = useNavigate();

  const {
    id,
    title,
    name,
    poster_path,
    first_air_date,
    release_date,
    vote_average,
  } = contents;

  const {
    windowSize: { width },
  } = useWindowSize();

  const onBoxClicked = () => {
    if (homePath) return navigate(`/movie/${id}`);
    if (tvPath) return navigate(`/tv/${id}`);
    if (searchPath && title)
      return navigate(`/search/movie/${id}/${searchQuery}`);
    if (searchPath && name) return navigate(`/search/tv/${id}/${searchQuery}`);
  };

  return (
    <Box
      key={id}
      onClick={() => onBoxClicked()}
      variants={width >= +deviceSizes.tablet ? bigVariants : {}}
      whileHover="hover"
      initial="normal"
      $height={searchPath}
    >
      <Image
        src={sizeImagePath(posterSizes.w342, poster_path)}
        alt={`${title || name} poster`}
      />
      <Info variants={infoVariants}>
        <h1>{cutLetter(title || name, 26)}</h1>
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
    &:nth-child(7n + 1) {
      -webkit-transform-origin: center left;
      transform-origin: center left;
    }
    &:nth-child(7n) {
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
  display: none;
  @media ${device.tablet} {
    opacity: 0;
    position: absolute;
    bottom: -38px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    height: 130px;
    background-color: ${(props) => props.theme.black.darker};
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 5px 10px;
    font-size: 14px;
    > h1 {
      width: 100%;
      font-weight: 700;
      margin-bottom: 5px;
    }
  }
  @media ${device.desktop} {
    > h1 {
      font-size: 16px;
    }
  }
`;

const Genres = styled.ul`
  width: 100%;
  min-height: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 4px;
  margin: 5px 0;
  > li {
    font-size: 10px;
    padding: 3px;
    height: fit-content;
  }
  @media ${device.tablet} {
    > li {
      font-size: 11px;
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

export default ContentsBox;
