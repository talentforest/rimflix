import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { getCollection, getDetail, IDetail } from "../../api/api";
import Detail from "./Detail";

const Modal = () => {
  const searchIdMatch = useMatch(`/search/:movieId`)?.params.movieId;
  const movieIdMatch = useMatch(`/movie/:movieId`)?.params.movieId;
  const tvIdMatch = useMatch(`/tv/:tvShowId`)?.params.tvShowId;
  const favMovieIdMatch = useMatch("/myFavorite/movie/:movieId")?.params
    .movieId;
  const myFavTvIdMatch = useMatch("myFavorite/tv/:tvShowId")?.params.tvShowId;

  const { data: detail, isLoading: detailIsLoading } = useQuery<IDetail>(
    ["detail", movieIdMatch, searchIdMatch, favMovieIdMatch],
    () => getDetail("movie", movieIdMatch || searchIdMatch || favMovieIdMatch)
  );

  const { data: tvDetail, isLoading: tvDetailIsLoading } = useQuery<IDetail>(
    ["detail", tvIdMatch, myFavTvIdMatch],
    () => getDetail("tv", tvIdMatch || myFavTvIdMatch)
  );

  const { data: collection, isLoading: collectionIsLoading } = useQuery<any>(
    ["details", `detail_collection`],
    () => getCollection(detail.belongs_to_collection.id),
    {
      enabled:
        Boolean(movieIdMatch || favMovieIdMatch) &&
        Boolean(detail?.belongs_to_collection?.id),
    }
  );

  return (
    <>
      {(movieIdMatch || favMovieIdMatch || searchIdMatch) && (
        <Detail
          detail={detail}
          isLoading={detailIsLoading}
          collection={collection}
          collectionIsLoading={collectionIsLoading}
        />
      )}
      {(tvIdMatch || myFavTvIdMatch) && (
        <Detail detail={tvDetail} isLoading={tvDetailIsLoading} />
      )}
    </>
  );
};

export default Modal;
