import { useNavigate } from "react-router-dom";
import { Sliders } from "./Home";
import Banner from "../components/Banner";
import Loading from "../components/common/Loading";
import Overlay from "../components/common/Overlay";
import Modal from "../components/Modal";
import RowSlider from "../components/RowSlider";
import useTvListsQuery from "../hook/query/useTvListsQuery";
import useDetailQuery from "../hook/query/useDetailQuery";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Language } from "../api/api";

const Tv = () => {
  const { language } = useContext(LanguageContext);
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
              title={
                language === Language.ko
                  ? "높은 평점을 받은 TV 프로그램"
                  : "Top Ranked Tv Shows"
              }
              data={exceptBannerData} //
            />
            <RowSlider
              title={
                language === Language.ko
                  ? "최근 방영을 시작한 TV 프로그램"
                  : "Airing Today Tv Shows"
              }
              data={airingToday.data?.results}
            />
            <RowSlider
              title={
                language === Language.ko
                  ? "방영중인 TV 프로그램"
                  : "On Air Tv Shows"
              }
              data={onAir.data?.results} //
            />
            <RowSlider
              title={
                language === Language.ko
                  ? "인기있는 TV 프로그램"
                  : "Popular Tv Shows"
              }
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
