import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  IMyList,
  myListMovieState,
  myListTvState,
} from "../../data/myListAtoms";
import { Button } from "../../theme/buttonStyle";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useCategory from "../../hook/useCategory";

interface PropsType {
  category: string;
  bannerId?: number;
  contentsId?: number;
  imgPath: string;
}

const MyListButton = ({
  category,
  bannerId,
  contentsId,
  imgPath,
}: PropsType) => {
  const [like, setLike] = useState(false);
  const [myListMovies, setMyListMovies] = useRecoilState(myListMovieState);
  const [myListTvs, setMyListTvs] = useRecoilState(myListTvState);
  const { myListPath } = useCategory();
  const { id } = useParams();

  const checkMyList = (contents: IMyList[]) => {
    return contents.some(
      (item) => item.contentsId === (contentsId || bannerId)
    );
  };

  useEffect(() => {
    if (checkMyList(myListTvs)) return setLike(true);
    if (checkMyList(myListMovies)) return setLike(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const date = new Date();
  const krTime = new Intl.DateTimeFormat("kr").format(date).slice(0, -1);

  const onAddClick = () => {
    setLike((prev: boolean) => !prev);
    if (category === "tv") {
      return setMyListTvs((prev) => [
        ...prev,
        {
          category,
          contentsId: contentsId || bannerId,
          imgPath,
          date: krTime,
        },
      ]);
    } else {
      return setMyListMovies((prev) => [
        ...prev,
        {
          category,
          contentsId: contentsId || bannerId,
          imgPath,
          date: krTime,
        },
      ]);
    }
  };

  const onDeleteClick = () => {
    setLike((prev) => !prev);
    if (category === "tv") {
      return setMyListTvs((prev) =>
        prev.filter((item) => item.contentsId !== (contentsId || bannerId))
      );
    } else {
      setMyListMovies((prev) =>
        prev.filter((item) => item.contentsId !== (contentsId || bannerId))
      );
    }
  };

  return (
    <>
      {!myListPath &&
        (like ? (
          <MyFavarite onClick={onDeleteClick}>
            My List <Favorite />
          </MyFavarite>
        ) : (
          <MyFavarite onClick={onAddClick}>
            Add My List <FavoriteBorder />
          </MyFavarite>
        ))}
      {myListPath &&
        (like ? (
          <button onClick={onDeleteClick}>
            <Favorite />
          </button>
        ) : (
          <button onClick={onAddClick}>
            <FavoriteBorder />
          </button>
        ))}
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

export default MyListButton;
