import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { myFavoriteMovieState, myFavoriteTvState } from "../../data/atoms";
import styled from "styled-components";

interface PropsType {
  contentsId: number;
}

const FavoriteButton = ({ contentsId }: PropsType) => {
  const { pathname } = useLocation();

  const [like, setLike] = useState(false);
  const [favMovies, setFavMovies] = useRecoilState(myFavoriteMovieState);
  const [favTvs, setFavTvs] = useRecoilState(myFavoriteTvState);

  useEffect(() => {
    if (favMovies.includes(contentsId)) return setLike(true);

    if (favTvs.includes(contentsId)) return setLike(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddClick = () => {
    setLike((prev) => !prev);
    if (pathname.includes("/movie"))
      return setFavMovies((prev) => [...prev, contentsId]);

    if (pathname.includes("/tv"))
      return setFavTvs((prev) => [...prev, contentsId]);
  };

  const onDeleteClick = () => {
    setLike((prev) => !prev);
    if (pathname.includes("/movie")) {
      setFavMovies((prev) => prev.filter((item) => item !== contentsId));
    }
    if (pathname.includes("/tv"))
      return setFavTvs((prev) => prev.filter((item) => item !== contentsId));
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
