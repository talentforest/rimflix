import { useRecoilValue } from "recoil";
import { myFavoriteMovieState, myFavoriteTvState } from "../data/atoms";
import FavContents from "../components/FavContents";
import device from "../theme/mediaQueries";
import styled from "styled-components";

const MyFavorite = () => {
  const myFavoriteMovies = useRecoilValue(myFavoriteMovieState);
  const myFavoriteTvs = useRecoilValue(myFavoriteTvState);

  return (
    <Container>
      <h1>My Favorite Movies</h1>
      <div>
        {myFavoriteMovies.length === 0 ? (
          <Empty>It's still empty.</Empty>
        ) : (
          myFavoriteMovies.map((movieId) => (
            <FavContents key={movieId} movieId={movieId} />
          ))
        )}
      </div>
      <h1>My Favorite Tv Shows</h1>
      <div>
        {myFavoriteTvs.length === 0 ? (
          <Empty>It's still empty.</Empty>
        ) : (
          myFavoriteTvs.map((tvId) => <FavContents key={tvId} tvId={tvId} />)
        )}
      </div>
    </Container>
  );
};

const Empty = styled.div`
  width: 100%;
  height: 100px;
  margin-bottom: 50px;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  background-color: #202020;
`;

const Container = styled.div`
  margin-top: 100px;
  padding: 10px 80px;
  width: 100%;
  min-height: 100vh;
  > div {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    justify-items: center;
    gap: 0 20px;
  }
  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    &:nth-child(3) {
      margin-top: 50px;
    }
  }
  @media ${device.tablet} {
    padding: 10px 50px;
    > div {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
    h1 {
      font-size: 18px;
      margin-bottom: 15px;
    }
  }
  @media ${device.mobile} {
    padding: 10px 20px 20px;
    margin-top: 50px;
    > div {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    }
  }
`;

export default MyFavorite;
