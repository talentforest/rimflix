import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { IMyList, myListMovieState, myListTvState } from "../data/myListAtoms";

interface IAddMyListProps {
  contentInfo: IMyList;
}

const useAddMyList = ({ contentInfo }: IAddMyListProps) => {
  const [like, setLike] = useState(false);
  const [myListMovies, setMyListMovies] = useRecoilState(myListMovieState);
  const [myListTvs, setMyListTvs] = useRecoilState(myListTvState);
  const { category, id } = contentInfo;
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
    if (contentInfo.category === "tv") {
      return setMyListTvs((prev) => [
        ...prev,
        {
          ...contentInfo,
          date: krTime,
        },
      ]);
    } else {
      return setMyListMovies((prev) => [
        ...prev,
        {
          ...contentInfo,
          date: krTime,
        },
      ]);
    }
  };

  const onDeleteClick = () => {
    setLike((prev: boolean) => !prev);
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
