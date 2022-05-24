import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getAiringTodayTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  IGetMovieTvResult,
} from "../api/api";
import MovieBanner from "../components/Banner";
import RowSlider from "../components/RowSlider";
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
      {topShowLoading && popularShowLoading && onAirShowLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MovieBanner data={topTvShow} />
          <RowTitle title={"Top Ranked Tv Shows"} />
          <RowSlider data={topTvShow} />
          <RowTitle title={"Popular Tv Shows"} />
          <RowSlider data={popularTvShow} />
          <RowTitle title={"On Air Tv Shows"} />
          <RowSlider data={onAirTvShow} />
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

export default Tv;
