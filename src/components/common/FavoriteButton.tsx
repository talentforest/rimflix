import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { useRecoilState } from "recoil";
import { myFavoriteMovieState, myFavoriteTvState } from "../../data/atoms";
import styled from "styled-components";

const FavoriteButton = () => {
  const [like, setLike] = useState(false);
  const [myFavoriteMovie, setMyFavoriteMovie] =
    useRecoilState(myFavoriteMovieState);
  const [myFavoriteTv, setMyFavoriteTv] = useRecoilState(myFavoriteTvState);

  const searchIdMatch = useMatch(`/search/:movieId`)?.params.movieId;
  const movieIdMatch = useMatch(`/movie/:movieId`)?.params.movieId;
  const tvIdMatch = useMatch(`/tv/:tvShowId`)?.params.tvShowId;
  const myFavMovieIdMatch = useMatch("/myFavorite/movie/:movieId")?.params
    .movieId;
  const myFavTvId = useMatch("myFavorite/tv/:tvShowId")?.params.tvShowId;

  useEffect(() => {
    if (
      myFavoriteMovie.includes(
        movieIdMatch ||
          searchIdMatch ||
          tvIdMatch ||
          myFavMovieIdMatch ||
          myFavTvId
      )
    )
      return setLike(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddClick = () => {
    setLike((prev) => !prev);
    if (movieIdMatch || myFavMovieIdMatch)
      return setMyFavoriteMovie((prev) => [
        ...prev,
        movieIdMatch || myFavMovieIdMatch,
      ]);
    if (tvIdMatch || myFavTvId)
      return setMyFavoriteTv((prev) => [...prev, tvIdMatch || myFavTvId]);
    if (searchIdMatch)
      return setMyFavoriteMovie((prev) => [...prev, searchIdMatch]);
  };

  const onDeleteClick = () => {
    setLike((prev) => !prev);
    if (movieIdMatch || myFavMovieIdMatch) {
      setMyFavoriteMovie((prev) =>
        prev.filter((item) => item !== (movieIdMatch || myFavMovieIdMatch))
      );
    }
    if (tvIdMatch || myFavTvId)
      return setMyFavoriteTv((prev) =>
        prev.filter((item) => item !== (tvIdMatch || myFavTvId))
      );
    if (searchIdMatch) {
      setMyFavoriteMovie((prev) =>
        prev.filter((item) => item !== searchIdMatch)
      );
    }
  };
  return (
    <>
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
    </>
  );
};

const MyFavarite = styled(motion.button)`
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 5px;
  border: 1px solid #aaa;
  color: #333;
  background-color: #ffaa9f;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 4px 8px;
  font-weight: 700;
  > svg {
    height: 20px;
    width: 20px;
    margin-left: 5px;
    fill: #ff0000;
  }
`;

export default FavoriteButton;
