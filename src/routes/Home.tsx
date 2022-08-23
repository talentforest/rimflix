import { useQuery } from "react-query";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovie,
  getUpcomingMovie,
  IGetMovieTvResult,
} from "../api/api";
import Banner from "../components/Banner";
import RowSlider from "../components/RowSlider";
import styled from "styled-components";

const Home = () => {
  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMovieTvResult>(["movies", "nowPlaying"], getNowPlayingMovies);

  const { data: topRatedMovie, isLoading: topRatedMovieLoading } =
    useQuery<IGetMovieTvResult>(["movies", "topRated"], getTopRatedMovie);

  const { data: upcomingMovie, isLoading: upcomingMovieLoading } =
    useQuery<IGetMovieTvResult>(["movies", "upcoming"], getUpcomingMovie);

  const { data: popularMovie, isLoading: popularMovieLoading } =
    useQuery<IGetMovieTvResult>(["movies", "popular"], getPopularMovies);

  const bannerData = nowPlaying?.results[0];
  const exceptBannerData = nowPlaying?.results?.slice(1);

  return (
    <Wrapper>
      {nowPlayingLoading &&
      topRatedMovieLoading &&
      upcomingMovieLoading &&
      popularMovieLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={bannerData} />
          <RowSlider title={"Now Playing"} data={exceptBannerData} />
          <RowSlider title={"Popular Now"} data={popularMovie?.results} />
          <RowSlider title={"Top Rated Movies"} data={topRatedMovie?.results} />
          <RowSlider title={"Upcoming Movies"} data={upcomingMovie?.results} />
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
