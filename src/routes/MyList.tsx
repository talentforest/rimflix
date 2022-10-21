import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { myListMovieState, myListTvState } from "../data/myListAtoms";
import FavContents from "../components/FavContents";
import device from "../theme/mediaQueries";
import styled from "styled-components";
import Overlay from "../components/Modal/Overlay";
import Modal from "../components/Modal/Modal";
import useMovieDetailQuery from "../hook/useMovieDetailQuery";
import useTvDetailQuery from "../hook/useTvDetailQuery";

const MyList = () => {
  const myListMovies = useRecoilValue(myListMovieState);
  const myListTvs = useRecoilValue(myListTvState);
  const { movieDetail } = useMovieDetailQuery();
  const { tvDetail } = useTvDetailQuery();
  const navigate = useNavigate();

  return (
    <Container>
      <h1>My Favorite Movies</h1>
      {myListMovies.length === 0 ? (
        <Empty>It's still empty.</Empty>
      ) : (
        <section>
          {myListMovies.map((favMovieId) => (
            <FavContents key={favMovieId} favMovieId={favMovieId} />
          ))}
        </section>
      )}
      <h1>My Favorite Tv Shows</h1>
      {myListTvs.length === 0 ? (
        <Empty>It's still empty.</Empty>
      ) : (
        <section>
          {myListTvs.map((favTvId) => (
            <FavContents key={favTvId} favTvId={favTvId} />
          ))}
        </section>
      )}
      {(movieDetail || tvDetail) && (
        <>
          <Overlay
            onOverlayClicked={() => {
              return navigate("/myList");
            }}
          />
          <Modal detail={movieDetail ? movieDetail : tvDetail} />
        </>
      )}
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

export default MyList;
