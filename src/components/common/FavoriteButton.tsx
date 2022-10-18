import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  myFavoriteMovieState,
  myFavoriteTvState,
} from "../../data/favoriteAtoms";
import styled from "styled-components";
import { Button } from "../../theme/buttonStyle";

interface PropsType {
  contentsId: number;
}

const FavoriteButton = ({ contentsId }: PropsType) => {
  const { pathname } = useLocation();
  const [like, setLike] = useState(false);
  const [favMovies, setFavMovies] = useRecoilState(myFavoriteMovieState);
  const [favTvs, setFavTvs] = useRecoilState(myFavoriteTvState);

  useEffect(() => {
    if ((favTvs || favMovies).includes(contentsId)) return setLike(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddClick = () => {
    setLike((prev) => !prev);
    if (pathname.includes("/tv")) {
      return setFavTvs((prev) => [...prev, contentsId]);
    } else {
      return setFavMovies((prev) => [...prev, contentsId]);
    }
  };

  const onDeleteClick = () => {
    setLike((prev) => !prev);
    if (pathname.includes("/tv")) {
      return setFavTvs((prev) => prev.filter((item) => item !== contentsId));
    } else {
      setFavMovies((prev) => prev.filter((item) => item !== contentsId));
    }
  };

  return (
    <>
      {like ? (
        <MyFavarite onClick={onDeleteClick}>
          My List <Favorite />
        </MyFavarite>
      ) : (
        <MyFavarite onClick={onAddClick}>
          Add My List <FavoriteBorder />
        </MyFavarite>
      )}
    </>
  );
};

const MyFavarite = styled(Button)`
  background-color: #ffaa9f;
  border: none;
  > svg {
    height: 18px;
    width: 18px;
    fill: #ff0000;
  }
`;

export default FavoriteButton;
