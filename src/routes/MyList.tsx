import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { myListMovieState, myListTvState } from "../data/myListAtoms";
import device from "../theme/mediaQueries";
import styled from "styled-components";
import Overlay from "../components/common/Overlay";
import Modal from "../components/Modal";
import useDetailQuery from "../hook/query/useDetailQuery";
import MyListContents from "../components/MyListContents";
import Title from "../components/common/Title";

const MyList = () => {
  const myListMovies = useRecoilValue(myListMovieState);
  const myListTvs = useRecoilValue(myListTvState);
  const { movieDetail, tvDetail } = useDetailQuery();
  const navigate = useNavigate();

  return (
    <Container>
      <Title title="My Movies" />
      {myListMovies.length === 0 ? (
        <Empty>It's still empty.</Empty>
      ) : (
        <List>
          {myListMovies.map((myListMovie) => (
            <MyListContents
              key={myListMovie.id}
              category="movie"
              myList={myListMovie}
            />
          ))}
        </List>
      )}
      <Title title="My Tv Show" />
      {myListTvs.length === 0 ? (
        <Empty>It's still empty.</Empty>
      ) : (
        <List>
          {myListTvs.map((myListTv) => (
            <MyListContents
              key={myListTv.id}
              category="tv"
              myList={myListTv} //
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
  height: 150px;
  margin-bottom: 30px;
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
`;

export const Container = styled.main`
  padding: 60px 20px 0;
  min-height: 80vh;
  @media ${device.tablet} {
    padding: 80px 40px 0;
  }
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 3fr));
  grid-gap: 10px;
  margin-bottom: 40px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  @media ${device.tablet} {
    grid-template-columns: repeat(auto-fill, minmax(100px, 3fr));
  }
`;

export default MyList;
