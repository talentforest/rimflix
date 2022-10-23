import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { myListMovieState, myListTvState } from "../data/myListAtoms";
import device from "../theme/mediaQueries";
import styled from "styled-components";
import Overlay from "../components/Modal/Overlay";
import Modal from "../components/Modal/Modal";
import useDetailQuery from "../hook/useDetailQuery";
import MyListContents from "../components/MyListContents";

const MyList = () => {
  const myListMovies = useRecoilValue(myListMovieState);
  const myListTvs = useRecoilValue(myListTvState);
  const { movieDetail, tvDetail } = useDetailQuery();
  const navigate = useNavigate();

  return (
    <Container>
      <h1>My Movies</h1>
      {myListMovies.length === 0 ? (
        <Empty>It's still empty.</Empty>
      ) : (
        <List>
          {myListMovies.map((myListMovie) => (
            <MyListContents
              key={myListMovie.contentsId}
              category="movie"
              myList={myListMovie}
            />
          ))}
        </List>
      )}
      <h1>My Tv Shows</h1>
      {myListTvs.length === 0 ? (
        <Empty>It's still empty.</Empty>
      ) : (
        <List>
          {myListTvs.map((myListTv) => (
            <MyListContents
              key={myListTv.contentsId}
              category="tv"
              myList={myListTv}
            />
          ))}
        </List>
      )}
      {(movieDetail || tvDetail) && (
        <Overlay
          onOverlayClicked={() => {
            return navigate("/myList");
          }}
        />
      )}
      {movieDetail && <Modal detail={movieDetail} />}
      {tvDetail && <Modal detail={tvDetail} />}
    </Container>
  );
};

const Empty = styled.div`
  height: 140px;
  margin-bottom: 30px;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  background-color: #202020;
`;

const Container = styled.main`
  padding: 60px 20px 0;
  min-height: 80vh;
  h1 {
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  @media ${device.tablet} {
    padding: 60px 40px 0;
    h1 {
      font-size: 18px;
      margin-bottom: 15px;
    }
  }
  @media ${device.desktop} {
    padding: 60px 40px;
  }
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 3fr));
  grid-gap: 10px;
  margin-bottom: 40px;
  @media ${device.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(100px, 6fr));
  }
`;

export default MyList;
