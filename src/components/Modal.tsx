import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { getCollection, getDetail, IDetail } from "../api/api";
import Detail from "./Detail";

const Modal = () => {
  const searchIdMatch = useMatch(`/search/:movieId`)?.params.movieId;
  const movieIdMatch = useMatch(`/movie/:movieId`)?.params.movieId;
  const tvIdMatch = useMatch(`/tv/:tvShowId`)?.params.tvShowId;
  const favMovieIdMatch = useMatch("/myFavorite/movie/:movieId")?.params
    .movieId;
  const myFavTvId = useMatch("myFavorite/tv/:tvShowId")?.params.tvShowId;

  const { data: detail, isLoading: detailIsLoading } = useQuery<IDetail>(
    ["detail", movieIdMatch, searchIdMatch, favMovieIdMatch],
    () => getDetail("movie", movieIdMatch || searchIdMatch || favMovieIdMatch)
  );

  const { data: detailTv, isLoading: detailTvIsLoading } = useQuery<IDetail>(
    ["detail", tvIdMatch, myFavTvId],
    () => getDetail("tv", tvIdMatch || myFavTvId)
  );

  const { data: collection, isLoading: collectionIsLoading } = useQuery<any>(
    ["details", `detail_collection`],
    () => getCollection(detail.belongs_to_collection.id),
    {
      enabled:
        Boolean(movieIdMatch) && Boolean(detail?.belongs_to_collection?.id),
    }
  );

  return (
    <>
      {(movieIdMatch || favMovieIdMatch || searchIdMatch) && (
        <Detail
          movieId={movieIdMatch || favMovieIdMatch || searchIdMatch}
          isLoading={detailIsLoading}
          data={detail}
          collection={collection}
          collectionIsLoading={collectionIsLoading}
        />
      )}
      {(tvIdMatch || myFavTvId) && (
        <Detail
          movieId={tvIdMatch || myFavTvId}
          isLoading={detailTvIsLoading}
          data={detailTv}
        />
      )}
    </>
  );
};

export default Modal;
