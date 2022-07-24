import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getSearchMovie, IGetMovieTvResult } from "../api/api";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import ContentsBox from "../components/ContentsBox";
import Modal from "../components/Modal";
import device from "../theme/mediaQueries";

const Search = () => {
  const location = useLocation();
  const searchKeyword = location.search.split("=")[1];

  const { data: searchMovie, isLoading: searchMovieLoading } =
    useQuery<IGetMovieTvResult>(["movies", searchKeyword], () =>
      getSearchMovie(searchKeyword)
    );

  const moviesWithPoster = searchMovie?.results.filter(
    (item) => !(item.backdrop_path === null && item.poster_path === null)
  );

  return (
    <Container>
      <h1>검색 결과 {moviesWithPoster?.length}건</h1>
      {searchMovieLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <div>
          {moviesWithPoster ? (
            moviesWithPoster?.map((contents) => (
              <ContentsBox contents={contents} key={contents.id} />
            ))
          ) : (
            <></>
          )}
        </div>
      )}
      <AnimatePresence>
        <Modal />
      </AnimatePresence>
    </Container>
  );
};

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  margin-top: 70px;
  padding: 0 30px;
  width: 100%;
  h1 {
    margin-left: 10px;
    font-size: 14px;
  }
  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 10px;
    margin-top: 20px;
    > div {
      width: 100px;
      margin-bottom: 30px;
    }
  }
  @media ${device.mobile} {
    overflow: hidden;
  }
`;

export default Search;
