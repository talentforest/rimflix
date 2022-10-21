import { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getSearch, IGetMovieTvResult } from "../api/api";
import { useRecoilState } from "recoil";
import { searchState } from "../data/searchAtom";
import Contents from "../components/Contents";
import device from "../theme/mediaQueries";
import styled from "styled-components";
import Loading from "../components/common/Loading";
import Overlay from "../components/Modal/Overlay";
import Modal from "../components/Modal/Modal";
import useMovieDetailQuery from "../hook/useMovieDetailQuery";
import useTvDetailQuery from "../hook/useTvDetailQuery";

const Search = () => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchState);
  const { movieDetail } = useMovieDetailQuery();
  const { tvDetail } = useTvDetailQuery();
  const { search } = useLocation();
  const navigate = useNavigate();

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
      getSearch("movie", searchKeyword)
    );

  const { data: searchTvShows, isLoading: searchTvShowsLoading } =
    useQuery<IGetMovieTvResult>(["search", "tv", searchKeyword], () =>
      getSearch("tv", searchKeyword)
    );

  return (
    <>
      {searchMoviesLoading && searchTvShowsLoading ? (
        <Loading screenSize="part" />
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
          {(movieDetail || tvDetail) && (
            <>
              <Overlay
                onOverlayClicked={() => {
                  return navigate(`/search/${searchQuery}`);
                }}
              />
              <Modal detail={movieDetail ? movieDetail : tvDetail} />
            </>
          )}
        </Container>
      )}
    </>
  );
};

const Container = styled.main`
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
      grid-template-columns: repeat(6, 1fr);
      justify-items: center;
      gap: 15px;
      margin-top: 20px;
    }
  }
  @media ${device.tablet} {
    > section {
      > ul {
        grid-template-columns: repeat(5, 1fr);
      }
    }
  }
  @media ${device.mobile} {
    overflow: hidden;
    margin-top: 70px;
    > section {
      > ul {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
`;

export default Search;
