import { useQuery } from "react-query";
import styled from "styled-components";
import {
  getAiringTodayTvShows,
  getOnAirTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  IGetMovieTvResult,
} from "../api/api";
import Banner from "../components/Banner";
import RowSlider from "../components/RowSlider";

const Tv = () => {
  const { data: topTvShow, isLoading: topTvShowLoading } =
    useQuery<IGetMovieTvResult>(["tvs", "top"], getTopRatedTvShows);

  const { data: popularTvShow, isLoading: popularTvShowLoading } =
    useQuery<IGetMovieTvResult>(["tvs", "popular"], getPopularTvShows);

  const { data: airingTodayTvShow, isLoading: airingTodayTvShowLoading } =
    useQuery<IGetMovieTvResult>(["tvs", "airingToday"], getAiringTodayTvShows);

  const { data: onAirTvShow, isLoading: onAirTvShowLoading } =
    useQuery<IGetMovieTvResult>(["tvs", "onAir"], getOnAirTvShows);

  const bannerData = topTvShow?.results[0];
  const exceptBannerData = topTvShow?.results.slice(1);

  return (
    <Wrapper>
      {topTvShowLoading &&
      popularTvShowLoading &&
      onAirTvShowLoading &&
      airingTodayTvShowLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner data={bannerData} />
          <RowSlider title={"Top Ranked Tv Shows"} data={exceptBannerData} />
          <RowSlider
            title={"Airing Today Tv Shows"}
            data={airingTodayTvShow?.results}
          />
          <RowSlider title={"On Air Tv Shows"} data={onAirTvShow?.results} />
          <RowSlider title={"Popular Tv Shows"} data={popularTvShow?.results} />
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.main`
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Tv;
