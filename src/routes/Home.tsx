import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import RowSlider from "../components/RowSlider";
import Loading from "../components/common/Loading";
import useMovieListsQuery from "../hook/query/useMovieListsQuery";
import Overlay from "../components/common/Overlay";
import Modal from "../components/Modal";
import styled from "styled-components";
import useDetailQuery from "../hook/query/useDetailQuery";

const Home = () => {
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
              title={"Now Playing"}
              data={exceptBannerData} //
            />
            <RowSlider
              title={"Popular Now"}
              data={popular.data?.results} //
            />
            <RowSlider
              title={"Top Rated Movies"}
              data={topRated.data?.results}
            />
            <RowSlider
              title={"Upcoming Movies"}
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
