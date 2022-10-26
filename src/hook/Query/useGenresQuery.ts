import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { getGenres, IGetGenres } from "../../api/api";
import { movieGenresState, tvGenresState } from "../../data/genresAtom";

const useGenresQuery = (category: string) => {
  const setMovieGenres = useSetRecoilState(movieGenresState);
  const setTvGenres = useSetRecoilState(tvGenresState);

  const { data: allGenres, isLoading: allGenresLoading } = useQuery<IGetGenres>(
    ["genres", category],
    () => getGenres(category),
    {
      onSuccess: (data) => {
        category === "movie"
          ? setMovieGenres(data.genres)
          : setTvGenres(data.genres);
      },
    }
  );

  return { allGenres, allGenresLoading };
};

export default useGenresQuery;