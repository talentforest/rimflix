import { motion } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getDetail, IDetail } from "../api/api";
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

const FavContents = ({ movieId, tvId }: PropsType) => {
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
    >
      <Picture>
        <source
          srcSet={makeImagePath(
            detail
              ? detail?.backdrop_path || detail?.poster_path
              : tvDetail?.backdrop_path || tvDetail?.poster_path
          )}
          media="(min-width: 1023px)"
        />
        <img
          src={makeImagePath(
            detail
              ? detail?.poster_path || detail?.poster_path
              : tvDetail?.poster_path || tvDetail?.poster_path
          )}
          alt="movie poster"
        />
      </Picture>
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

const Box = styled(motion.div)`
  width: 250px;
  height: 180px;
  border-radius: 5px;
  margin-bottom: 30px;
  position: relative;
  @media ${device.tablet} {
    width: 180px;
    height: 250px;
  }
  @media ${device.mobile} {
    width: 120px;
    height: 180px;
  }
`;

const Picture = styled.picture`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Info = styled(motion.div)`
  opacity: 0;
  background-color: ${(props) => props.theme.black.darker};
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  position: absolute;
  bottom: -55px;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 10px;
  width: 100%;
  > h4 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    width: 100%;
    span {
      margin-right: 5px;
    }
  }
  @media ${device.tablet} {
    > h4 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 8px;
    }
  }
  @media ${device.mobile} {
    > h4 {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 8px;
    }
  }
`;

export default FavContents;
