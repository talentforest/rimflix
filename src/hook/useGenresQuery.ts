import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getGenres, IGetGenres } from "../api/api";
import { movieGenresState, tvGenresState } from "../data/genresAtom";

const useGenresQuery = () => {
  const { pathname } = useLocation();
  const setMovieGenres = useSetRecoilState(movieGenresState);
  const setTvGenres = useSetRecoilState(tvGenresState);

  const getMovieGenres = useQuery<IGetGenres>(
    ["genres", "Movie"],
    () => getGenres("movie"),
    {
      onSuccess: (data) => {
        setMovieGenres(data.genres);
      },
      enabled: !pathname.includes("tv"),
    }
  );

  const getTvGenres = useQuery<IGetGenres>(
    ["genres", "Tv"],
    () => getGenres("tv"),
    {
      onSuccess: (data) => {
        setTvGenres(data.genres);
      },
      enabled: pathname.includes("tv"),
    }
  );

  return pathname.includes("tv") ? getTvGenres : getMovieGenres;
};

export default useGenresQuery;
