import styled from "styled-components";
import { useQuery } from "react-query";
import {
  getMovies,
  getTopRatedMovie,
  getUpcomingMovie,
  IGetMovieTvResult,
} from "../api/api";
import RowTitle from "../components/RowTitle";
import MovieBanner from "../components/Banner";
import RowSlider from "../components/RowSlider";

const Home = () => {
  const { data: nowPlaying, isLoading: nowPlayingLoading } =
    useQuery<IGetMovieTvResult>(["movies", "nowPlaying"], getMovies);
  const { data: topRatedMovie, isLoading: topRatedMovieLoading } =
    useQuery<IGetMovieTvResult>(["movies", "topRatedMovie"], getTopRatedMovie);
  const { data: upcomingMovie, isLoading: upcomingMovieLoading } =
    useQuery<IGetMovieTvResult>(["movies", "upcomingMovie"], getUpcomingMovie);

  return (
    <Wrapper>
      {nowPlayingLoading && topRatedMovieLoading && upcomingMovieLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MovieBanner data={nowPlaying} />
          <RowTitle title={"Now Playing"} />
          <RowSlider
            sliceData={nowPlaying}
            type="nowPlaying"
            category="movie"
          />
          <RowTitle title={"Top Rated Movies"} />
          <RowSlider
            wholeData={topRatedMovie}
            type="topRatedMovie"
            category="movie"
          />
          <RowTitle title={"Upcoming Movies"} />
          <RowSlider
            wholeData={upcomingMovie}
            type="upcomingMovie"
            category="movie"
          />
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
