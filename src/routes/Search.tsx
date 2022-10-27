import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchState } from "../data/searchAtom";
import { Container } from "./MyList";
import device from "../theme/mediaQueries";
import styled from "styled-components";
import Loading from "../components/common/Loading";
import Overlay from "../components/common/Overlay";
import Modal from "../components/Modal";
import useDetailQuery from "../hook/query/useDetailQuery";
import useFindPath from "../hook/useFindPath";
import useSearchQuery from "../hook/query/useSearchQuery";
import Title from "../components/common/Title";
import ContentsBox from "../components/common/ContentsBox";
import useGenresQuery from "../hook/query/useGenresQuery";

const Search = () => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchState);
  const { movieDetail, tvDetail } = useDetailQuery();
  const { findGenres } = useGenresQuery(tvDetail ? "tv" : "movie");
  const { moviePath, tvPath } = useFindPath();
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchKeyword = search?.split("=")[1];

  const {
    searchMovies,
    searchMoviesLoading,
    searchTvShows,
    searchTvShowsLoading,
  } = useSearchQuery(searchKeyword);

  useEffect(() => {
    handleSearchQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSearchQuery = () => {
    setSearchQuery(search);
  };

  const onCloseClick = () => {
    return navigate(`/search/${searchQuery}`);
  };

  const moviesWithPoster = searchMovies?.results?.filter(
    (item) => item.poster_path
  );
  const tvsWithPoster = searchTvShows?.results?.filter(
    (item) => item.poster_path
  );

  return searchMoviesLoading && searchTvShowsLoading ? (
    <Loading screenSize="part" />
  ) : (
    <Container>
      <Title title={`Movies Result (${moviesWithPoster?.length})`} />
      <ResultBox>
        {moviesWithPoster?.length !== 0 ? (
          <div>
            {moviesWithPoster?.map((contents) => (
              <ContentsBox
                key={contents.id}
                contents={contents}
                genres={findGenres(contents.genre_ids)}
              />
            ))}
          </div>
        ) : (
          <span>No Search results found</span>
        )}
      </ResultBox>
      <Title title={`Tv Result (${tvsWithPoster?.length})`} />
      <ResultBox>
        {tvsWithPoster?.length !== 0 ? (
          <div>
            {tvsWithPoster?.map((contents) => (
              <ContentsBox
                key={contents.id}
                contents={contents}
                genres={findGenres(contents.genre_ids)}
              />
            ))}
          </div>
        ) : (
          <span>No Search results found</span>
        )}
      </ResultBox>
      {(movieDetail || tvDetail) && <Overlay onCloseClick={onCloseClick} />}
      {moviePath && movieDetail && (
        <Modal detail={movieDetail} onCloseClick={onCloseClick} />
      )}
      {tvPath && tvDetail && (
        <Modal detail={tvDetail} onCloseClick={onCloseClick} />
      )}
    </Container>
  );
};

const ResultBox = styled.ul`
  margin: 15px 0 30px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  min-height: 150px;
  > div {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  @media ${device.tablet} {
    padding: 15px;
    border-radius: 10px;
    margin: 15px 0 40px;
    > div {
      grid-template-columns: repeat(5, 1fr);
    }
  }
  @media ${device.desktop} {
    > div {
      grid-template-columns: repeat(7, 1fr);
    }
  }
`;

export default Search;
