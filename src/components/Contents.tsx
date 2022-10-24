import { getGenres, IDetail, IGetGenres } from "../api/api";
import { useQuery } from "react-query";
import HoverBox from "./common/HoverBox";
import useCategory from "../hook/useCategory";

interface PropsType {
  contents: IDetail;
  searchMovieId?: number;
  searchTvId?: number;
}

const Contents = ({ contents, searchMovieId, searchTvId }: PropsType) => {
  const { genre_ids } = contents;
  const { tvPath } = useCategory();

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
      {tvPath || searchTvId
        ? !tvGenreIsLoading && (
            <HoverBox
              contents={contents}
              genres={contentsTvGenres}
              searchTvId={searchTvId}
            />
          )
        : !genreIsLoading && (
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
