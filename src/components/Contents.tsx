import { useLocation } from "react-router-dom";
import { getGenres, getTvGenres, IDetail, IGenres } from "../api/api";
import { useQuery } from "react-query";
import HoverBox from "./common/HoverBox";

interface IGetGenres {
  genres: IGenres[];
}

interface PropsType {
  contents: IDetail;
}

const Contents = ({ contents }: PropsType) => {
  const { pathname } = useLocation();

  const { data: movieGenres } = useQuery<IGetGenres>(
    ["genres", "MovieGenres"],
    getGenres
  );
  const { data: tvGenres } = useQuery<IGetGenres>(
    ["genres", "TvGenres"],
    getTvGenres
  );

  const findMovieGenres = movieGenres?.genres?.filter((item) =>
    contents.genre_ids.includes(item.id)
  );
  const findTvGenres = tvGenres?.genres?.filter((item) =>
    contents.genre_ids.includes(item.id)
  );

  return (
    <>
      {pathname === "/tv" ? (
        <HoverBox
          id={contents.id}
          poster={contents.poster_path}
          backdrop={contents.backdrop_path}
          title={contents.name}
          firstDate={contents.first_air_date}
          rate={contents.vote_average}
          genreNames={findTvGenres?.slice(0, 3)}
        />
      ) : (
        <HoverBox
          id={contents.id}
          poster={contents.poster_path}
          backdrop={contents.backdrop_path}
          title={contents.title}
          firstDate={contents.release_date}
          rate={contents.vote_average}
          genreNames={findMovieGenres?.slice(0, 3)}
        />
      )}
    </>
  );
};

export default Contents;
