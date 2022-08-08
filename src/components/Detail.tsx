import { motion, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { makeImagePath } from "../utils/makeImagePath";
import { IDetail } from "../api/api";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { myFavoriteMovieState, myFavoriteTvState } from "../data/atoms";
import styled from "styled-components";
import device from "../theme/mediaQueries";

interface PropsType {
  movieId: string;
  isLoading: boolean;
  data: IDetail;
}

const Detail = ({ movieId, isLoading, data }: PropsType) => {
  const [like, setLike] = useState(false);
  const navigate = useNavigate();
  const [myFavoriteMovie, setMyFavoriteMovie] =
    useRecoilState(myFavoriteMovieState);
  const [myFavoriteTv, setMyFavoriteTv] = useRecoilState(myFavoriteTvState);
  const { scrollY } = useViewportScroll();
  const movieIdMatch = useMatch(`/movie/:movieId`)?.params.movieId;
  const searchIdMatch = useMatch(`/search/:movieId`)?.params.movieId;
  const tvIdMatch = useMatch(`/tv/:tvShowId`)?.params.tvShowId;

  useEffect(() => {
    if (myFavoriteMovie.includes(movieIdMatch)) return setLike(true);
    if (myFavoriteMovie.includes(searchIdMatch)) return setLike(true);
    if (myFavoriteTv.includes(tvIdMatch)) return setLike(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOverlayClicked = () => {
    navigate(-1);
  };

  const onAddClick = () => {
    setLike((prev) => !prev);
    if (movieIdMatch)
      return setMyFavoriteMovie((prev) => [...prev, movieIdMatch]);
    if (searchIdMatch)
      return setMyFavoriteMovie((prev) => [...prev, searchIdMatch]);
    if (tvIdMatch) return setMyFavoriteTv((prev) => [...prev, tvIdMatch]);
  };

  const onDeleteClick = () => {
    setLike((prev) => !prev);
    if (movieIdMatch) {
      setMyFavoriteMovie((prev) =>
        prev.filter((item) => item !== movieIdMatch)
      );
    }
    if (searchIdMatch) {
      setMyFavoriteMovie((prev) =>
        prev.filter((item) => item !== searchIdMatch)
      );
    }
    if (tvIdMatch)
      return setMyFavoriteTv((prev) =>
        prev.filter((item) => item !== tvIdMatch)
      );
  };

  return (
    <>
      <Overlay
        onClick={() => onOverlayClicked()}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <BigMovie
        style={{ top: scrollY.get() + 100 }}
        layoutId={`${movieId}${uuidv4}`}
      >
        {!isLoading && data && (
          <>
            <BigCoverOverlay />
            <BigCover
              src={
                data.backdrop_path
                  ? makeImagePath(data.backdrop_path)
                  : makeImagePath(data.poster_path)
              }
              alt="backdrop image"
            />
            <Tagline>{data?.tagline}</Tagline>
            <BigTitle>{data?.title ? data.title : data?.name}</BigTitle>
            {like ? (
              <MyFavarite onClick={onDeleteClick}>
                <span>My Favorite</span>
                <Favorite />
              </MyFavarite>
            ) : (
              <MyFavarite onClick={onAddClick}>
                <span>Add My Favorite</span>
                <FavoriteBorder />
              </MyFavarite>
            )}
            <MovieDetail>
              <Info>
                <h5>Genre :</h5>
                <Genres>
                  {data.genres.slice(0, 3).map((item) => (
                    <span key={item.id}>{item.name}</span>
                  ))}
                </Genres>
              </Info>
              <Info>
                <h5>
                  {data?.runtime ? "Running Time :" : "episode_run_time : "}
                </h5>
                <span>
                  {data?.runtime ? data?.runtime : data?.episode_run_time[0]}
                  min
                </span>
              </Info>
              <p>
                <span>Overview</span>
                {data?.overview.length > 330
                  ? `${data?.overview.slice(0, 330)}...`
                  : data.overview}
              </p>
              {data.homepage ? (
                <a href={`${data.homepage}`} target="_blank" rel="noreferrer">
                  <span>Go Official Page</span>
                </a>
              ) : (
                <></>
              )}
            </MovieDetail>
            {data?.belongs_to_collection ? (
              <Collection>
                <h5>Movie Collection</h5>
                <div>
                  <img
                    src={makeImagePath(
                      data?.belongs_to_collection?.poster_path
                    )}
                    alt="collection poster"
                  />
                  <span>{data.belongs_to_collection.name}</span>
                </div>
              </Collection>
            ) : null}
          </>
        )}
      </BigMovie>
    </>
  );
};

const MyFavarite = styled(motion.button)`
  display: flex;
  align-items: center;
  margin: 20px;
  padding: 0 10px;
  width: fit-content;
  border-radius: 20px;
  color: #333;
  background-color: #ffaa9f;
  cursor: pointer;
  > svg {
    height: 24px;
    width: 24px;
    margin: 5px;
    fill: #ff0000;
  }
  @media ${device.mobile} {
    margin: 10px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  width: 50vw;
  position: absolute;
  height: 70vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: ${(props) => props.theme.black.darker};
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${device.tablet} {
    width: 70vw;
  }
  @media ${device.mobile} {
    width: 90vw;
  }
`;

const BigCoverOverlay = styled.div`
  position: absolute;
  height: 340px;
  width: 100%;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, #181818 100%);
  @media ${device.mobile} {
    height: 230px;
  }
`;

const BigCover = styled.img`
  height: 330px;
  width: 100%;
  object-fit: cover;
  @media ${device.mobile} {
    height: 220px;
  }
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px 20px 0;
  font-size: 40px;
  position: relative;
  font-weight: 700;
  @media ${device.mobile} {
    font-size: 22px;
    display: flex;
    align-items: center;
    padding: 0 10px;
  }
`;

const Tagline = styled.p`
  padding: 20px 20px 0;
  font-size: 20px;
  color: ${(props) => props.theme.white.lighter};
  @media ${device.mobile} {
    font-size: 14px;
    padding: 10px;
  }
`;

const Collection = styled.div`
  padding: 20px;
  h5 {
    color: #aaa;
    font-size: 18px;
    margin-bottom: 10px;
  }
  > div {
    display: flex;
    flex-direction: column;
    img {
      width: 160px;
      height: 230px;
      margin-bottom: 10px;
    }
  }
`;

const MovieDetail = styled.div`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  > p {
    height: fit-content;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    line-height: 1.3;
    margin-top: 10px;
    > span {
      color: #c8c8c8;
      font-size: 16px;
      margin-bottom: 5px;
    }
  }
  > a {
    padding: 10px 0;
    align-self: end;
    text-decoration: underline;
    cursor: pointer;
    > span {
      font-size: 12px;
    }
  }
  @media ${device.mobile} {
    top: -50px;
    padding: 0 10px;
    a {
      padding: 10;
      font-size: 11px;
    }
  }
`;

const Info = styled.div`
  display: flex;
  margin-bottom: 5px;
  align-items: center;
  > h5 {
    margin-right: 5px;
    color: #aaa;
    width: max-content;
  }
  > span {
    margin-right: 3px;
  }
  > div {
    font-size: 16px;
    > span {
      margin-left: 5px;
    }
  }
  @media ${device.mobile} {
    > div {
      font-size: 14px;
    }
  }
`;

const Genres = styled.span`
  display: flex;
  gap: 5px;
  span {
    border-radius: 20px;
    background-color: ${(props) => props.theme.white.darker};
    padding: 3px 8px;
    color: #333;
    &:nth-child(2) {
      background-color: #a1bdff;
    }
    &:last-child {
      background-color: #ffbb94;
    }
  }
`;

export default Detail;
