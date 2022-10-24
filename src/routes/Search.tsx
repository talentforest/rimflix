import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { searchState } from "../data/searchAtom";
import { IDetail } from "../api/api";
import Contents from "../components/Contents";
import device from "../theme/mediaQueries";
import styled from "styled-components";
import Loading from "../components/common/Loading";
import Overlay from "../components/Modal/Overlay";
import Modal from "../components/Modal/Modal";
import useDetailQuery from "../hook/Query/useDetailQuery";
import useCategory from "../hook/useCategory";
import useSearchQuery from "../hook/Query/useSearchQuery";
import Title from "../components/common/Title";

const Search = () => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchState);
  const { movieDetail, tvDetail } = useDetailQuery();
  const { moviePath, tvPath } = useCategory();
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchKeyword = search?.split("/")[0]?.split("=")[1];

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

  const cutWithoutPoster = (contents: IDetail[]) => {
    return contents?.filter((item) => item.poster_path);
  };

  return (
    <>
      {searchMoviesLoading && searchTvShowsLoading ? (
        <Loading screenSize="part" />
      ) : (
        <Container>
          <section>
            <Title
              title={`Movies Result (${
                cutWithoutPoster(searchMovies?.results)?.length
              })`}
            />
            <ResultBox>
              {cutWithoutPoster(searchMovies?.results)?.map((contents) => (
                <Contents
                  key={contents.id}
                  contents={contents}
                  searchMovieId={contents.id}
                />
              ))}
            </ResultBox>
          </section>
          <section>
            <Title
              title={`Tv Result (${
                cutWithoutPoster(searchTvShows?.results)?.length
              })`}
            />
            <ResultBox>
              {cutWithoutPoster(searchTvShows?.results)?.map((contents) => (
                <Contents
                  key={contents.id}
                  contents={contents}
                  searchTvId={contents.id}
                />
              ))}
            </ResultBox>
          </section>
          <>
            {(movieDetail || tvDetail) && (
              <Overlay
                onOverlayClicked={() => {
                  return navigate(`/search/${searchQuery}`);
                }}
              />
            )}
            {moviePath && movieDetail && <Modal detail={movieDetail} />}
            {tvPath && tvDetail && <Modal detail={tvDetail} />}
          </>
        </Container>
      )}
    </>
  );
};

const Container = styled.main`
  margin-top: 60px;
  padding: 0 20px;
  width: 100%;
  min-height: 100vh;
  > section {
    margin-bottom: 50px;
  }
  @media ${device.tablet} {
    padding: 0 50px;
    overflow: hidden;
    margin-top: 70px;
  }
`;

const ResultBox = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  @media ${device.tablet} {
    grid-template-columns: repeat(5, 1fr);
    padding: 15px;
    border-radius: 10px;
  }
  @media ${device.desktop} {
    grid-template-columns: repeat(7, 1fr);
  }
`;

export default Search;
