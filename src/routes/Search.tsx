import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import {
  getSearchMovie,
  getSearchTvShows,
  IGetMovieTvResult,
} from "../api/api";
import { AnimatePresence } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { searchState } from "../data/atoms";
import Contents from "../components/Contents";
import Modal from "../components/Modal/Modal";
import device from "../theme/mediaQueries";
import styled from "styled-components";

const Search = () => {
  const setSearchQuery = useSetRecoilState(searchState);
  const { search } = useLocation();

  useEffect(() => {
    handleSearchQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const searchKeyword = search?.split("/")[0]?.split("=")[1];

  const handleSearchQuery = () => {
    setSearchQuery(search);
  };

  const { data: searchMovies, isLoading: searchMoviesLoading } =
    useQuery<IGetMovieTvResult>(["search", "movies", searchKeyword], () =>
      getSearchMovie(searchKeyword)
    );

  const { data: searchTvShows, isLoading: searchTvShowsLoading } =
    useQuery<IGetMovieTvResult>(["search", "tv", searchKeyword], () =>
      getSearchTvShows(searchKeyword)
    );

  return (
    <>
      {searchMoviesLoading && searchTvShowsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <Container>
          <section>
            <h1>Movies Result ({searchMovies?.results?.length})</h1>
            <ul>
              {searchMovies?.results?.map((contents) => (
                <Contents
                  key={contents.id}
                  contents={contents}
                  searchMovieId={contents.id}
                />
              ))}
            </ul>
          </section>
          <section>
            <h1>Tv Shows Result ({searchTvShows?.results?.length})</h1>
            <ul>
              {searchTvShows?.results?.map((contents) => (
                <Contents
                  key={contents.id}
                  contents={contents}
                  searchTvId={contents.id}
                />
              ))}
            </ul>
          </section>
          <AnimatePresence>
            <Modal />
          </AnimatePresence>
        </Container>
      )}
    </>
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
  > section {
    margin-bottom: 50px;
    h1 {
      margin-left: 10px;
      font-size: 20px;
      font-weight: 700;
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
  }

  @media ${device.tablet} {
    > section {
      > ul {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        > div {
          width: 180px;
        }
      }
    }
  }
  @media ${device.mobile} {
    overflow: hidden;
    margin-top: 70px;
    > section {
      > ul {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        > div {
          width: 120px;
        }
      }
    }
  }
`;

export default Search;
