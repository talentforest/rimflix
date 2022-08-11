import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { getCollection, getDetail, IDetail } from "../api/api";
import Detail from "./Detail";

const Modal = () => {
  const searchMovieId = useMatch(`/search/:movieId`)?.params.movieId;
  const movieId = useMatch(`/movie/:movieId`)?.params.movieId;
  const tvId = useMatch("tv/:tvShowId")?.params.tvShowId;
  const myFavMovieId = useMatch("/myFavorite/movie/:movieId")?.params.movieId;
  const myFavTvId = useMatch("myFavorite/tv/:tvShowId")?.params.tvShowId;

  const { data: detail, isLoading: detailIsLoading } = useQuery<IDetail>(
    ["detail", movieId, searchMovieId, myFavMovieId],
    () => getDetail("movie", movieId || searchMovieId || myFavMovieId)
  );

  const { data: detailTv, isLoading: detailTvIsLoading } = useQuery<IDetail>(
    ["detail", tvId, myFavTvId],
    () => getDetail("tv", tvId || myFavTvId)
  );

  const { data: collection, isLoading: collectionIsLoading } = useQuery<any>(
    ["details", `detail_collection`],
    () => getCollection(detail.belongs_to_collection.id),
    {
      enabled: Boolean(movieId) && Boolean(detail?.belongs_to_collection?.id),
    }
  );

  return (
    <>
      {(movieId || myFavMovieId || searchMovieId) && (
        <Detail
          movieId={movieId || myFavMovieId || searchMovieId}
          isLoading={detailIsLoading}
          data={detail}
          collection={collection}
          collectionIsLoading={collectionIsLoading}
        />
      )}
      {(tvId || myFavTvId) && (
        <Detail
          movieId={tvId || myFavTvId}
          isLoading={detailTvIsLoading}
          data={detailTv}
        />
      )}
    </>
  );
};

export default Modal;
