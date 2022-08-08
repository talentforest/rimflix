import styled from "styled-components";
import { useQuery } from "react-query";
import {
  getMovies,
  getTopRatedMovie,
  getUpcomingMovie,
  IGetMovieTvResult,
} from "../api/api";
import RowTitle from "../components/RowTitle";
import Banner from "../components/Banner";
import RowSlider from "../components/RowSlider";

const Home = () => {
  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMovieTvResult>(["movies", "nowPlaying"], getMovies);
  const { data: topRatedMovie, isLoading: topRatedMovieLoading } =
    useQuery<IGetMovieTvResult>(["movies", "topRatedMovie"], getTopRatedMovie);
  const { data: upcomingMovie, isLoading: upcomingMovieLoading } =
    useQuery<IGetMovieTvResult>(["movies", "upcomingMovie"], getUpcomingMovie);

  const bannerData = nowPlaying?.results[0];
  const removeBannerData = nowPlaying?.results.slice(1);
  const topRatedData = topRatedMovie?.results;
  const upcomingData = upcomingMovie?.results;

  return (
    <Wrapper>
      {nowPlayingLoading && topRatedMovieLoading && upcomingMovieLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={bannerData} />
          <RowTitle title={"Now Playing"} />
          <RowSlider data={removeBannerData} />
          <RowTitle title={"Top Rated Movies"} />
          <RowSlider data={topRatedData} />
          <RowTitle title={"Upcoming Movies"} />
          <RowSlider data={upcomingData} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Home;
