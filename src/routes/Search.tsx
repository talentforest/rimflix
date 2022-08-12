import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getSearchMovie, IGetMovieTvResult } from "../api/api";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import Contents from "../components/Contents";
import Modal from "../components/Modal/Modal";
import device from "../theme/mediaQueries";

const Search = () => {
  const location = useLocation();
  const searchKeyword = location.search.split("=")[1];

  const { data: searchMovie, isLoading: searchMovieLoading } =
    useQuery<IGetMovieTvResult>(
      ["movies", searchKeyword],
      () => getSearchMovie(searchKeyword),
      {
        enabled: Boolean(searchKeyword),
      }
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
        <ul>
          {moviesWithPoster ? (
            moviesWithPoster?.map((contents) => (
              <Contents contents={contents} key={contents.id} />
            ))
          ) : (
            <></>
          )}
        </ul>
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
  margin-top: 100px;
  padding: 0 30px;
  width: 100%;
  min-height: 100vh;
  h1 {
    margin-left: 10px;
    font-size: 14px;
  }
  > ul {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    justify-items: center;
    gap: 10px;
    margin-top: 20px;
    > div {
      width: 200px;
    }
  }
  @media ${device.tablet} {
    > ul {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      > div {
        width: 180px;
      }
    }
  }
  @media ${device.mobile} {
    overflow: hidden;
    margin-top: 70px;
    > ul {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      > div {
        width: 120px;
      }
    }
  }
`;

export default Search;
