import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getAiringTodayTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  IGetMovieTvResult,
} from "../api/api";
import MovieBanner from "../components/Banner";
import MoviesRow from "../components/MoviesRow";
import RowTitle from "../components/RowTitle";

const Tv = () => {
  const { data: topTvShow, isLoading: topShowLoading } =
    useQuery<IGetMovieTvResult>(["tvs", "topTvShow"], getTopRatedTvShows);
  const { data: popularTvShow, isLoading: popularShowLoading } =
    useQuery<IGetMovieTvResult>(["tvs", "popularTvShow"], getPopularTvShows);
  const { data: onAirTvShow, isLoading: onAirShowLoading } =
    useQuery<IGetMovieTvResult>(["tvs", "onAirTvShow"], getAiringTodayTvShows);

  return (
    <Wrapper>
      <MovieBanner data={topTvShow} />
      <RowTitle title={"Top Ranked Tv Shows"} />
      <MoviesRow data={topTvShow} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow-x: hidden;
`;

export default Tv;
