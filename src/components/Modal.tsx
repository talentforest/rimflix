import { useQuery } from "react-query";
import { useMatch } from "react-router-dom";
import { getDetail, IDetail } from "../api/api";
import Detail from "./Detail";

const Modal = () => {
  const ModalMovieMatch = useMatch(`/movie/:movieId`);
  const ModalTvShowMatch = useMatch("tv/:tvShowId");

  const { data: detail, isLoading: detailIsLoading } = useQuery<IDetail>(
    ["detail", `detail_${ModalMovieMatch?.params.movieId}`],
    () => getDetail("movie", ModalMovieMatch?.params.movieId)
  );

  const { data: detailTv, isLoading: detailTvIsLoading } = useQuery<IDetail>(
    ["detail", `detail_${ModalTvShowMatch?.params.tvShowId}`],
    () => getDetail("tv", ModalTvShowMatch?.params.tvShowId)
  );

  return (
    <>
      {ModalMovieMatch ? (
        <Detail
          movieId={ModalMovieMatch?.params.movieId}
          isLoading={detailIsLoading}
          data={detail}
        />
      ) : null}
      {ModalTvShowMatch ? (
        <Detail
          movieId={ModalTvShowMatch?.params.tvShowId}
          isLoading={detailTvIsLoading}
          data={detailTv}
        />
      ) : null}
    </>
  );
};

export default Modal;
