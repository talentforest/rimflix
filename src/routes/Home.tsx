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
import Loading from "../components/common/Loading";

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
    <>
      {nowPlayingLoading &&
      topRatedMovieLoading &&
      upcomingMovieLoading &&
      popularMovieLoading &&
      !bannerData ? (
        <Loading screenSize="entire" />
      ) : (
        <>
          <Banner data={bannerData} />
          <RowSlider title={"Now Playing"} data={exceptBannerData} />
          <RowSlider title={"Popular Now"} data={popularMovie?.results} />
          <RowSlider title={"Top Rated Movies"} data={topRatedMovie?.results} />
          <RowSlider title={"Upcoming Movies"} data={upcomingMovie?.results} />
        </>
      )}
    </>
  );
};

export default Home;
