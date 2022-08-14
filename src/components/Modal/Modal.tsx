import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import { getDetail, IDetail } from "../../api/api";
import Detail from "./Detail";

const Modal = () => {
  const { pathname } = useLocation();

  const { id } = useParams();

  const { data: detail } = useQuery<IDetail>(
    ["detail", "movie", +id],
    () => getDetail("movie", +id),
    {
      enabled: pathname.includes("/movie"),
    }
  );

  const { data: tvDetail } = useQuery<IDetail>(
    ["detail", "tv", +id],
    () => getDetail("tv", +id),
    {
      enabled: pathname.includes("/tv"),
    }
  );

  return (
    <>
      {detail && <Detail detail={detail} />}
      {tvDetail && <Detail detail={tvDetail} />}
    </>
  );
};

export default Modal;
