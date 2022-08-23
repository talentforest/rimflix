import { useRecoilValue } from "recoil";
import { myFavoriteMovieState, myFavoriteTvState } from "../data/atoms";
import { AnimatePresence } from "framer-motion";
import Modal from "../components/Modal/Modal";
import FavContents from "../components/FavContents";
import device from "../theme/mediaQueries";
import styled from "styled-components";

const MyFavorite = () => {
  const myFavoriteMovies = useRecoilValue(myFavoriteMovieState);
  const myFavoriteTvs = useRecoilValue(myFavoriteTvState);

  return (
    <Container>
      <h1>My Favorite Movies</h1>
      {myFavoriteMovies.length === 0 ? (
        <Empty>It's still empty.</Empty>
      ) : (
        <section>
          {myFavoriteMovies.map((favMovieId) => (
            <FavContents key={favMovieId} favMovieId={favMovieId} />
          ))}
        </section>
      )}
      <h1>My Favorite Tv Shows</h1>
      {myFavoriteTvs.length === 0 ? (
        <Empty>It's still empty.</Empty>
      ) : (
        <section>
          {myFavoriteTvs.map((favTvId) => (
            <FavContents key={favTvId} favTvId={favTvId} />
          ))}
        </section>
      )}
      <AnimatePresence>
        <Modal />
      </AnimatePresence>
    </Container>
  );
};

const Empty = styled.div`
  height: 100px;
  margin-bottom: 50px;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  background-color: #202020;
`;

const Container = styled.main`
  padding: 100px 40px;
  min-height: 85vh;
  > section {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, auto));
    gap: 15px;
    justify-content: center;
    margin: 0 auto;
  }
  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
    &:nth-child(3) {
      margin-top: 50px;
    }
  }
  @media ${device.tablet} {
    padding: 80px 40px;
    > section {
      grid-template-columns: repeat(auto-fill, minmax(120px, auto));
      gap: 10px;
    }
    h1 {
      font-size: 18px;
      margin-bottom: 15px;
    }
  }
  @media ${device.mobile} {
    padding: 50px 20px;
    > section {
      grid-template-columns: repeat(auto-fill, minmax(100px, auto));
    }
  }
`;

export default MyFavorite;
