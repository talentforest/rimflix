import Banner from "../components/Banner";
import Loading from "../components/common/Loading";
import RowSlider from "../components/RowSlider";
import useTvListsQuery from "../hook/useTvListsQuery";
import styled from "styled-components";

const Tv = () => {
  const { top, popular, onAir, airingToday } = useTvListsQuery();
  const bannerData = top?.data?.results[0];
  const exceptBannerData = top?.data?.results.slice(1);

  return (
    <>
      {top.isLoading &&
      popular.isLoading &&
      onAir.isLoading &&
      airingToday.isLoading &&
      !bannerData ? (
        <Loading screenSize="part" />
      ) : (
        <>
          <Banner data={bannerData} />
          <Sliders>
            <RowSlider title={"Top Ranked Tv Shows"} data={exceptBannerData} />
            <RowSlider
              title={"Airing Today Tv Shows"}
              data={airingToday?.data?.results}
            />
            <RowSlider title={"On Air Tv Shows"} data={onAir?.data?.results} />
            <RowSlider
              title={"Popular Tv Shows"}
              data={popular?.data?.results}
            />
          </Sliders>
        </>
      )}
    </>
  );
};

const Sliders = styled.section`
  position: relative;
  margin-top: -100px;
`;

export default Tv;
