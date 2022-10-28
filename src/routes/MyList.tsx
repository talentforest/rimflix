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
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { Language } from "../api/api";

const MyList = () => {
  const { language } = useContext(LanguageContext);
  const myListMovies = useRecoilValue(myListMovieState);
  const myListTvs = useRecoilValue(myListTvState);
  const { movieDetail, tvDetail } = useDetailQuery();
  const navigate = useNavigate();

  const onCloseClick = () => {
    return navigate("/myList");
  };

  return (
    <Container>
      <Title title={language === Language.ko ? "나의 영화" : "My Movies"} />
      {myListMovies.length === 0 ? (
        <Empty>
          {language === Language.ko
            ? "저장된 영화가 없습니다."
            : "It's still empty."}
        </Empty>
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
      <Title
        title={language === Language.ko ? "나의 TV 프로그램" : "My Tv Show"}
      />
      {myListTvs.length === 0 ? (
        <Empty>
          {language === Language.ko
            ? "저장된 TV 프로그램이 없습니다."
            : "It's still empty."}
        </Empty>
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
      {(movieDetail || tvDetail) && <Overlay onCloseClick={onCloseClick} />}
      {movieDetail && (
        <Modal detail={movieDetail} onCloseClick={onCloseClick} />
      )}
      {tvDetail && <Modal detail={tvDetail} onCloseClick={onCloseClick} />}
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
