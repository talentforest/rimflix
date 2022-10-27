import { useNavigate } from "react-router-dom";
import { Sliders } from "./Home";
import Banner from "../components/Banner";
import Loading from "../components/common/Loading";
import Overlay from "../components/common/Overlay";
import Modal from "../components/Modal";
import RowSlider from "../components/RowSlider";
import useTvListsQuery from "../hook/query/useTvListsQuery";
import useDetailQuery from "../hook/query/useDetailQuery";

const Tv = () => {
  const { top, popular, onAir, airingToday } = useTvListsQuery();
  const { tvDetail } = useDetailQuery();
  const navigate = useNavigate();
  const bannerData = top.data?.results[0];
  const exceptBannerData = top.data?.results.slice(1);

  const onCloseClick = () => {
    return navigate("/tv");
  };

  return (
    <>
      {top.isLoading &&
      popular.isLoading &&
      onAir.isLoading &&
      airingToday.isLoading &&
      !bannerData ? (
        <Loading screenSize="entire" />
      ) : (
        <>
          <Banner data={bannerData} />
          <Sliders>
            <RowSlider
              title={"Top Ranked Tv Shows"}
              data={exceptBannerData} //
            />
            <RowSlider
              title={"Airing Today Tv Shows"}
              data={airingToday.data?.results}
            />
            <RowSlider
              title={"On Air Tv Shows"}
              data={onAir.data?.results} //
            />
            <RowSlider
              title={"Popular Tv Shows"}
              data={popular.data?.results}
            />
          </Sliders>
          {tvDetail && (
            <>
              <Overlay onCloseClick={onCloseClick} />
              <Modal detail={tvDetail} onCloseClick={onCloseClick} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Tv;
