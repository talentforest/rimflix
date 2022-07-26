import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getDetail, IDetail } from "../api/api";
import useWindowSize from "../hook/useWindowSize";
import { makeImagePath } from "../utils/makeImagePath";
import { v4 as uuidv4 } from "uuid";
import device from "../theme/mediaQueries";

interface PropsType {
  movieId?: string;
  tvId?: string;
}

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -10,
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
    opacity: 1,
    y: 10,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween",
    },
  },
};

const FavMovies = ({ movieId, tvId }: PropsType) => {
  const { data: detail, isLoading: detailIsLoading } = useQuery<IDetail>(
    ["detail", `detail_${movieId}`],
    () => getDetail("movie", movieId),
    {
      enabled: Boolean(movieId),
    }
  );
  const { data: tvDetail, isLoading: tvDetailIsLoading } = useQuery<IDetail>(
    ["detail", `detail_${tvId}`],
    () => getDetail("tv", tvId),
    {
      enabled: Boolean(tvId),
    }
  );

  const { windowSize } = useWindowSize();

  return detailIsLoading && tvDetailIsLoading ? (
    <div>Loading...</div>
  ) : (
    <Box
      layoutId={`${detail?.id}/${uuidv4()}`}
      key={detail?.id}
      variants={boxVariants}
      whileHover="hover"
      initial="normal"
      transition={{ type: "tween" }}
      $bgPhoto={
        windowSize.width > 500
          ? makeImagePath(
              detail?.backdrop_path ||
                detail?.poster_path ||
                tvDetail?.backdrop_path ||
                tvDetail?.poster_path
            )
          : makeImagePath(
              detail?.poster_path ||
                detail?.backdrop_path ||
                tvDetail?.backdrop_path ||
                tvDetail?.poster_path
            )
      }
    >
      <Info variants={infoVariants}>
        <h4>
          {detail?.title
            ? +`${detail?.title?.length}` > 28
              ? `${detail?.title?.slice(0, 28)}...`
              : detail?.title
            : +`${tvDetail?.name?.length}` > 28
            ? `${tvDetail?.name?.slice(0, 28)}...`
            : tvDetail?.name}
        </h4>
        <div>
          <span>
            {detail?.release_date
              ? detail?.release_date
              : tvDetail?.first_air_date}
          </span>
          <span>{detail?.vote_average || tvDetail?.vote_average}</span>
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
  height: 220px;
  width: 130px;
  border-radius: 3px;
  margin-bottom: 30px;
  position: relative;
  @media ${device.tablet} {
    height: 220px;
    width: 160px;
  }
  @media ${device.mobile} {
    height: 200px;
    width: 150px;
  }
`;

const Info = styled(motion.div)`
  opacity: 0;
  background-color: ${(props) => props.theme.black.darker};
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  position: absolute;
  bottom: -40px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  font-size: 12px;
  padding: 4px;
  width: 100%;
  > h4 {
    font-weight: 700;
    margin-bottom: 4px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
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
  }
`;

export default FavMovies;
