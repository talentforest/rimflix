import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils/makeImagePath";
import { v4 as uuidv4 } from "uuid";
import { getGenres, getTvGenres, IDetail, IGenres } from "../api/api";
import styled from "styled-components";
import device from "../theme/mediaQueries";
import { useQuery } from "react-query";
import RateBox from "./common/RateBox";
import GenreBox from "./common/GenreBox";

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

interface IGetGenres {
  genres: IGenres[];
}

interface PropsType {
  contents: IDetail;
}

const ContentsBox = ({ contents }: PropsType) => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const { data: movieGenres } = useQuery<IGetGenres>(
    ["genres", "MovieGenres"],
    getGenres
  );

  const { data: tvGenres } = useQuery<IGetGenres>(
    ["tvGenres", "TvGenres"],
    getTvGenres
  );

  const onBoxClicked = (id: number) => {
    if (location === "/") return navigate(`/movie/${id}`);
    if (location === "/search") return navigate(`/search/${id}`);
    if (location === "/tv") return navigate(`/tv/${id}`);
  };

  const findMovieGenres = movieGenres?.genres?.filter((item) =>
    contents.genre_ids.includes(item.id)
  );
  const findTvGenres = tvGenres?.genres?.filter((item) =>
    contents.genre_ids.includes(item.id)
  );

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
        loading="lazy"
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
        <Genres>
          {location === "/tv"
            ? findTvGenres
                ?.slice(0, 3)
                .map((item) => <GenreBox key={item.id} genre={item.name} />)
            : findMovieGenres
                ?.slice(0, 3)
                .map((item) => <GenreBox key={item.id} genre={item.name} />)}
        </Genres>
        <div>
          <span>
            {contents.release_date
              ? contents.release_date.split("-").join(".")
              : contents.first_air_date.split("-").join(".")}
          </span>
          <RateBox rate={contents.vote_average} />
        </div>
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
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    width: 100%;
  }
  @media ${device.tablet} {
    bottom: -38px;
    padding: 10px 15px;
    div {
      font-size: 12px;
    }
  }
  @media ${device.mobile} {
    height: 60px;
    bottom: -48px;
    font-size: 14px;
    padding: 10px 5px;
  }
`;

const Genres = styled.span`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px;
  font-size: 12px;
  @media ${device.tablet} {
    font-size: 12px;
  }
  @media ${device.mobile} {
    font-size: 10px;
  }
`;

export default ContentsBox;
