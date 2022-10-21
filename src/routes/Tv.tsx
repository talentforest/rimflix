import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import Loading from "../components/common/Loading";
import Overlay from "../components/Modal/Overlay";
import Modal from "../components/Modal/Modal";
import RowSlider from "../components/RowSlider";
import useTvListsQuery from "../hook/useTvListsQuery";
import { Sliders } from "./Home";
import useTvDetailQuery from "../hook/useTvDetailQuery";

const Tv = () => {
  const { top, popular, onAir, airingToday } = useTvListsQuery();
  const { tvDetail } = useTvDetailQuery();
  const navigate = useNavigate();

  const bannerData = top?.data?.results[0];
  const exceptBannerData = top?.data?.results.slice(1);

  return (
    <>
      {top.isLoading &&
      popular.isLoading &&
      onAir.isLoading &&
      airingToday.isLoading &&
      !bannerData ? (
        <Loading screenSize="part" />
      ) : (
        <>
          <Banner data={bannerData} />
          <Sliders>
            <RowSlider title={"Top Ranked Tv Shows"} data={exceptBannerData} />
            <RowSlider
              title={"Airing Today Tv Shows"}
              data={airingToday?.data?.results}
            />
            <RowSlider title={"On Air Tv Shows"} data={onAir?.data?.results} />
            <RowSlider
              title={"Popular Tv Shows"}
              data={popular?.data?.results}
            />
          </Sliders>
          {tvDetail && (
            <>
              <Overlay
                onOverlayClicked={() => {
                  return navigate("/tv");
                }}
              />
              <Modal detail={tvDetail} />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Tv;
