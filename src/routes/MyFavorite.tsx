import { useRecoilValue } from "recoil";
import styled from "styled-components";
import FavMovies from "../components/FavMovies";
import { myFavoriteMovieState, myFavoriteTvState } from "../data/atoms";
import device from "../theme/mediaQueries";

const MyFavorite = () => {
  const myFavoriteMovie = useRecoilValue(myFavoriteMovieState);
  const myFavoriteTv = useRecoilValue(myFavoriteTvState);

  return (
    <Container>
      <h1>My Favorite Movies</h1>
      <div>
        {myFavoriteMovie.length === 0 ? (
          <Empty>It's still empty.</Empty>
        ) : (
          myFavoriteMovie.map((movieId) => (
            <FavMovies key={movieId} movieId={movieId} />
          ))
        )}
      </div>
      <h1>My Favorite Tv Shows</h1>
      <div>
        {myFavoriteTv.length === 0 ? (
          <Empty>It's still empty.</Empty>
        ) : (
          myFavoriteTv.map((tvId) => <FavMovies key={tvId} tvId={tvId} />)
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
  padding: 10px 120px;
  width: 100%;
  min-height: 100vh;
  > div {
    display: flex;
    flex-wrap: wrap;
    gap: 0 20px;
  }
  h1 {
    margin-bottom: 10px;
    &:nth-child(3) {
      margin-top: 50px;
    }
  }

  @media ${device.tablet} {
    padding: 10px 50px;
  }
  @media ${device.mobile} {
    padding: 10px 20px 20px;
    margin-top: 50px;
  }
`;

export default MyFavorite;
