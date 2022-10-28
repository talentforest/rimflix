import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import Banner from "../components/Banner";
import RowSlider from "../components/RowSlider";
import Loading from "../components/common/Loading";
import useMovieListsQuery from "../hook/query/useMovieListsQuery";
import Overlay from "../components/common/Overlay";
import Modal from "../components/Modal";
import styled from "styled-components";
import useDetailQuery from "../hook/query/useDetailQuery";
import { Language } from "../api/api";

const Home = () => {
  const { language } = useContext(LanguageContext);
  const { nowPlaying, topRated, upcoming, popular } = useMovieListsQuery();
  const { movieDetail } = useDetailQuery();
  const navigate = useNavigate();

  const bannerData = nowPlaying?.data?.results[0];
  const exceptBannerData = nowPlaying?.data?.results?.slice(1);

  const onCloseClick = () => {
    return navigate("/");
  };

  return (
    <>
      {nowPlaying.isLoading &&
      topRated.isLoading &&
      upcoming.isLoading &&
      popular.isLoading &&
      !bannerData ? (
        <Loading screenSize="entire" />
      ) : (
        <>
          <Banner data={bannerData} />
          <Sliders>
            <RowSlider
              title={
                language === Language.ko ? "현재 상영중인 영화" : "Now Playing"
              }
              data={exceptBannerData} //
            />
            <RowSlider
              title={
                language === Language.ko ? "지금 있기있는 영화" : "Popular Now"
              }
              data={popular.data?.results} //
            />
            <RowSlider
              title={
                language === Language.ko
                  ? "높은 평점을 받은 영화"
                  : "Top Rated Movies"
              }
              data={topRated.data?.results}
            />
            <RowSlider
              title={
                language === Language.ko
                  ? "개봉 예정인 영화"
                  : "Upcoming Movies"
              }
              data={upcoming.data?.results}
            />
          </Sliders>
          {movieDetail && (
            <>
              <Overlay onCloseClick={onCloseClick} />
              <Modal detail={movieDetail} onCloseClick={onCloseClick} />
            </>
          )}
        </>
      )}
    </>
  );
};

export const Sliders = styled.section`
  position: relative;
  margin-top: -10vh;
`;

export default Home;
