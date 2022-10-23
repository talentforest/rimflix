import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { getGenres, IGetGenres } from "../api/api";
import { movieGenresState, tvGenresState } from "../data/genresAtom";
import useCategory from "./useCategory";

const useGenresQuery = () => {
  const setMovieGenres = useSetRecoilState(movieGenresState);
  const setTvGenres = useSetRecoilState(tvGenresState);
  const { tvPath } = useCategory();

  const getMovieGenres = useQuery<IGetGenres>(
    ["genres", "Movie"],
    () => getGenres("movie"),
    {
      onSuccess: (data) => {
        setMovieGenres(data.genres);
      },
      enabled: !tvPath,
    }
  );

  const getTvGenres = useQuery<IGetGenres>(
    ["genres", "Tv"],
    () => getGenres("tv"),
    {
      onSuccess: (data) => {
        setTvGenres(data.genres);
      },
      enabled: tvPath,
    }
  );

  return tvPath ? getTvGenres : getMovieGenres;
};

export default useGenresQuery;
