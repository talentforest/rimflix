import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { getDetail, IDetail } from "../api/api";
import Detail from "./Detail";

const Modal = () => {
  const SearchMatch = useMatch(`/search/:movieId`)?.params.movieId;
  const ModalMovieMatch = useMatch(`/movie/:movieId`)?.params.movieId;
  const ModalTvShowMatch = useMatch("tv/:tvShowId")?.params.tvShowId;

  const { data: detail, isLoading: detailIsLoading } = useQuery<IDetail>(
    ["detail", `detail_${ModalMovieMatch || SearchMatch}`],
    () => getDetail("movie", ModalMovieMatch || SearchMatch)
  );

  const { data: detailTv, isLoading: detailTvIsLoading } = useQuery<IDetail>(
    ["detail", `detail_${ModalTvShowMatch}`],
    () => getDetail("tv", ModalTvShowMatch)
  );

  return (
    <>
      {SearchMatch ? (
        <Detail
          movieId={SearchMatch}
          isLoading={detailIsLoading}
          data={detail}
        />
      ) : null}
      {ModalMovieMatch ? (
        <Detail
          movieId={ModalMovieMatch}
          isLoading={detailIsLoading}
          data={detail}
        />
      ) : null}
      {ModalTvShowMatch ? (
        <Detail
          movieId={ModalTvShowMatch}
          isLoading={detailTvIsLoading}
          data={detailTv}
        />
      ) : null}
    </>
  );
};

export default Modal;
