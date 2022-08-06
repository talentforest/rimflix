import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getAiringTodayTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  IGetMovieTvResult,
} from "../api/api";
import MovieBanner from "../components/MovieBanner";
import RowSlider from "../components/RowSlider";
import RowTitle from "../components/RowTitle";

const Tv = () => {
  const { data: topTvShow, isLoading: topShowLoading } =
    useQuery<IGetMovieTvResult>(["tvs", "topTvShow"], getTopRatedTvShows);
  const { data: popularTvShow, isLoading: popularShowLoading } =
    useQuery<IGetMovieTvResult>(["tvs", "popularTvShow"], getPopularTvShows);
  const { data: onAirTvShow, isLoading: onAirShowLoading } =
    useQuery<IGetMovieTvResult>(["tvs", "onAirTvShow"], getAiringTodayTvShows);

  const bannerData = topTvShow?.results[0];
  const sliceBannerData = topTvShow?.results.slice(1);
  const popularData = popularTvShow?.results;
  const onAirData = onAirTvShow?.results;

  return (
    <Wrapper>
      {topShowLoading && popularShowLoading && onAirShowLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MovieBanner data={bannerData} />
          <RowTitle title={"On Air Tv Shows"} />
          <RowSlider data={sliceBannerData} />
          <RowTitle title={"Top Ranked Tv Shows"} />
          <RowSlider data={popularData} />
          <RowTitle title={"Popular Tv Shows"} />
          <RowSlider data={onAirData} />
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
