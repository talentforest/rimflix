import { useLocation } from "react-router-dom";
import { getGenres, IDetail, IGenres } from "../api/api";
import { useQuery } from "react-query";
import HoverBox from "./common/HoverBox";

interface IGetGenres {
  genres: IGenres[];
}

interface PropsType {
  contents: IDetail;
  searchMovieId?: number;
  searchTvId?: number;
}

const Contents = ({ contents, searchMovieId, searchTvId }: PropsType) => {
  const { pathname } = useLocation();
  const { genre_ids, backdrop_path, poster_path } = contents;

  const { data: movieGenres, isLoading: genreIsLoading } = useQuery<IGetGenres>(
    ["genres", "MovieGenres"],
    () => getGenres("movie")
  );
  const { data: tvGenres, isLoading: tvGenreIsLoading } = useQuery<IGetGenres>(
    ["genres", "TvGenres"],
    () => getGenres("tv")
  );

  const contentsGenres = movieGenres?.genres
    .filter((item) => genre_ids.includes(item.id))
    .slice(0, 3);

  const contentsTvGenres = tvGenres?.genres
    .filter((item) => genre_ids.includes(item.id))
    .slice(0, 3);

  return (
    <>
      {pathname === "/tv" || searchTvId
        ? !tvGenreIsLoading &&
          (backdrop_path || poster_path) && (
            <HoverBox
              contents={contents}
              genres={contentsTvGenres}
              searchTvId={searchTvId}
            />
          )
        : !genreIsLoading &&
          (backdrop_path || poster_path) && (
            <HoverBox
              contents={contents}
              genres={contentsGenres}
              searchMovieId={searchMovieId}
            />
          )}
    </>
  );
};

export default Contents;
