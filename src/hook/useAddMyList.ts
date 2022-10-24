import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IMyList, myListMovieState, myListTvState } from "../data/myListAtoms";

interface IAddMyListProps {
  category: string;
  id: number;
  imgPath: string;
}

const useAddMyList = ({ category, id, imgPath }: IAddMyListProps) => {
  const [like, setLike] = useState(false);
  const [myListMovies, setMyListMovies] = useRecoilState(myListMovieState);
  const [myListTvs, setMyListTvs] = useRecoilState(myListTvState);
  const { id: paramsId } = useParams();
  const date = new Date();
  const krTime = new Intl.DateTimeFormat("kr").format(date).slice(0, -1);

  const checkMyList = (contents: IMyList[]) => {
    return contents.some((item) => item.id === id);
  };

  useEffect(() => {
    if (checkMyList(myListTvs)) return setLike(true);
    if (checkMyList(myListMovies)) return setLike(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsId]);

  const onAddClick = () => {
    setLike((prev: boolean) => !prev);
    if (category === "tv") {
      return setMyListTvs((prev) => [
        ...prev,
        {
          category,
          id,
          imgPath,
          date: krTime,
        },
      ]);
    } else {
      return setMyListMovies((prev) => [
        ...prev,
        {
          category,
          id,
          imgPath,
          date: krTime,
        },
      ]);
    }
  };

  const onDeleteClick = () => {
    setLike((prev) => !prev);
    if (category === "tv") {
      return setMyListTvs((prev) => prev.filter((item) => item.id !== id));
    } else {
      setMyListMovies((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return {
    like,
    onAddClick,
    onDeleteClick,
  };
};

export default useAddMyList;
