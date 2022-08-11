import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { getCollection, getDetail, IDetail } from "../api/api";
import Detail from "./Detail";

const Modal = () => {
  const SearchMatch = useMatch(`/search/:movieId`)?.params.movieId;
  const ModalMovieMatch = useMatch(`/movie/:movieId`)?.params.movieId;
  const ModalTvShowMatch = useMatch("tv/:tvShowId")?.params.tvShowId;
  const myFavMovieMatch = useMatch("/myfavorite/movie/:movieId");
  const myFavTvMatch = useMatch("myfavorite/tv/tvShowId")?.params.tvShowId;

  console.log(myFavTvMatch);

  const { data: detail, isLoading: detailIsLoading } = useQuery<IDetail>(
    ["detail", `detail_${ModalMovieMatch || SearchMatch}`],
    () => getDetail("movie", ModalMovieMatch || SearchMatch)
  );

  const { data: detailTv, isLoading: detailTvIsLoading } = useQuery<IDetail>(
    ["detail", `detail_${ModalTvShowMatch}`],
    () => getDetail("tv", ModalTvShowMatch)
  );

  const { data: collection, isLoading: collectionIsLoading } = useQuery<any>(
    ["details", `detail_collection`],
    () => getCollection(detail.belongs_to_collection.id),
    {
      enabled:
        Boolean(ModalMovieMatch) && Boolean(detail?.belongs_to_collection?.id),
    }
  );

  return (
    <>
      {SearchMatch && (
        <Detail
          movieId={SearchMatch}
          isLoading={detailIsLoading}
          data={detail}
          collection={collection}
          collectionIsLoading={collectionIsLoading}
        />
      )}
      {ModalMovieMatch && (
        <Detail
          movieId={ModalMovieMatch}
          isLoading={detailIsLoading}
          data={detail}
          collection={collection}
          collectionIsLoading={collectionIsLoading}
        />
      )}
      {ModalTvShowMatch && (
        <Detail
          movieId={ModalTvShowMatch}
          isLoading={detailTvIsLoading}
          data={detailTv}
        />
      )}
    </>
  );
};

export default Modal;
