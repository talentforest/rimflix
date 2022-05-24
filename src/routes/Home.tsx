import styled from "styled-components";
import { useQuery } from "react-query";
import {
  getLatestMovie,
  getMovies,
  getTopRatedMovie,
  getUpcomingMovie,
  IGetMovieTvResult,
} from "../api/api";
import RowTitle from "../components/RowTitle";
import MoviesRow from "../components/MoviesRow";
import MovieBanner from "../components/Banner";

const Home = () => {
  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMovieTvResult>(["movies", "nowPlaying"], getMovies);
  const { data: latestMovie, isLoading: latestMovieLoading } =
    useQuery<IGetMovieTvResult>(["movies", "latestMovie"], getLatestMovie);
  const { data: topRatedMovie, isLoading: topRatedMovieLoading } =
    useQuery<IGetMovieTvResult>(["movies", "topRatedMovie"], getTopRatedMovie);
  const { data: upcomingMovie, isLoading: upcomingMovieLoading } =
    useQuery<IGetMovieTvResult>(["movies", "upcomingMovie"], getUpcomingMovie);

  return (
    <Wrapper>
      {nowPlayingLoading &&
      latestMovieLoading &&
      topRatedMovieLoading &&
      upcomingMovieLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MovieBanner data={nowPlaying} />
          <>
            <RowTitle title={"Now Playing"} />
            <MoviesRow data={nowPlaying} />
            <RowTitle title={"Top Rated Movies"} />
            <MoviesRow data={topRatedMovie} />
            <RowTitle title={"Upcoming Movies"} />
            <MoviesRow data={upcomingMovie} />
          </>
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
