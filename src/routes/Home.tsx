import styled from "styled-components";
import { useQuery } from "react-query";
import {
  getNowPlayingMovies,
  getTopRatedMovie,
  getUpcomingMovie,
  IGetMovieTvResult,
} from "../api/api";
import Banner from "../components/Banner";
import RowSlider from "../components/RowSlider";

const Home = () => {
  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMovieTvResult>(["movies", "nowPlaying"], getNowPlayingMovies);
  const { data: topRatedMovie, isLoading: topRatedMovieLoading } =
    useQuery<IGetMovieTvResult>(["movies", "topRatedMovie"], getTopRatedMovie);
  const { data: upcomingMovie, isLoading: upcomingMovieLoading } =
    useQuery<IGetMovieTvResult>(["movies", "upcomingMovie"], getUpcomingMovie);

  const bannerData = nowPlaying?.results[0];
  const exceptBannerData = nowPlaying?.results.slice(1);
  const topRatedData = topRatedMovie?.results;
  const upcomingData = upcomingMovie?.results;

  return (
    <Wrapper>
      {nowPlayingLoading && topRatedMovieLoading && upcomingMovieLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={bannerData} />
          <RowSlider title={"Now Playing"} data={exceptBannerData} />
          <RowSlider title={"Top Rated Movies"} data={topRatedData} />
          <RowSlider title={"Upcoming Movies"} data={upcomingData} />
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
