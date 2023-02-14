import { Suspense, lazy, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import Banner from '../components/Banner';
import RowSlider from '../components/RowSlider';
import Loading from '../components/common/Loading';
import useMovieListsQuery from '../hook/query/useMovieListsQuery';
import styled from 'styled-components';
import useDetailQuery from '../hook/query/useDetailQuery';
import { Language } from '../api/api';
import { useNavigate } from 'react-router-dom';
import Overlay from '../components/common/Overlay';
const Modal = lazy(() => import('../components/Modal'));

const Home = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const { nowPlaying, topRated, upcoming, popular } = useMovieListsQuery();
  const { movieDetail } = useDetailQuery();

  const bannerData = nowPlaying?.data?.results[2];
  const exceptBannerData = nowPlaying?.data?.results?.slice(1);

  const onCloseClick = () => navigate('/');

  return (
    <>
      {nowPlaying.isLoading &&
      topRated.isLoading &&
      upcoming.isLoading &&
      popular.isLoading &&
      !bannerData ? (
        <Loading height={100} />
      ) : (
        <>
          <Banner data={bannerData} />
          <Sliders>
            <RowSlider
              title={
                language === Language.ko ? '현재 상영중인 영화' : 'Now Playing'
              }
              data={exceptBannerData} //
            />
            <RowSlider
              title={
                language === Language.ko ? '지금 있기있는 영화' : 'Popular Now'
              }
              data={popular.data?.results} //
            />
            <RowSlider
              title={
                language === Language.ko
                  ? '높은 평점을 받은 영화'
                  : 'Top Rated Movies'
              }
              data={topRated.data?.results}
            />
            <RowSlider
              title={
                language === Language.ko
                  ? '개봉 예정인 영화'
                  : 'Upcoming Movies'
              }
              data={upcoming.data?.results}
            />
          </Sliders>
          {movieDetail && (
            <>
              <Overlay onCloseClick={onCloseClick} />
              <Suspense fallback={<Loading height={20} />}>
                <Modal detail={movieDetail} />
              </Suspense>
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
