import { motion, useViewportScroll } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { IDetail, Language } from '../api/api';
import { Theaters } from '@mui/icons-material';
import { changeDateSeperator } from '../utils/changeDateSeperator';
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import styled from 'styled-components';
import device from '../theme/mediaQueries';
import VideoPlayer from './common/VideoPlayer';
import MovieDetail from './MovieDetail';
import TvDetail from './TvDetail';
import MyListButton from './common/MyListButton';
import RunTime from './modalDetail/RunTime';
import Genres from './modalDetail/Genres';
import Rate from './common/Rate';
import useFindPath from '../hook/useFindPath';
import Keywords from './modalDetail/Keywords';
import useMovieDetailQuery from '../hook/query/useMovieDetailQuery';

interface PropsType {
  detail: IDetail;
}

const Modal = ({ detail }: PropsType) => {
  const { language } = useContext(LanguageContext);
  const { scrollY } = useViewportScroll();
  const { moviePath, tvPath } = useFindPath();
  const { keyword } = useMovieDetailQuery(detail);
  const {
    id,
    poster_path,
    release_date,
    first_air_date,
    backdrop_path,
    tagline,
    overview,
    name,
    title,
    genres,
    homepage,
    vote_average,
    runtime,
    episode_run_time,
  } = detail;

  const contentInfo = {
    category: name ? 'tv' : 'movie',
    id,
    imgPath: poster_path,
  };

  return (
    <ModalBox style={{ top: scrollY.get() + 85 }} layoutId={`${id}${uuidv4}`}>
      <VideoContainer>
        <VideoPlayer
          videoId={id}
          backdropPath={backdrop_path}
          title={title || name}
        />
      </VideoContainer>
      <DetailContainer>
        <p>{tagline}</p>
        <h3>{title || name}</h3>
        <Genres genres={genres} />
        <MyListButton contentInfo={contentInfo} />
        <ReleaseDate>
          <Theaters />
          <span>{changeDateSeperator(release_date || first_air_date)}</span>
        </ReleaseDate>
        <RateTime>
          <Rate rate={vote_average} />
          <RunTime runtime={runtime || episode_run_time[0]} />
        </RateTime>
        {keyword?.keywords?.length !== 0 && (
          <Keywords keywords={keyword?.keywords} />
        )}
        <Info $column='column'>
          <h5>{language === Language.ko ? '줄거리' : 'Overview'}</h5>
          <p>
            {overview ||
              (language === Language.ko
                ? '제공된 정보가 없습니다.'
                : 'There is no information')}
          </p>
        </Info>
        {homepage && (
          <HomePage href={`${homepage}`} target='_blank' rel='noreferrer'>
            {language === Language.ko ? '공식 홈페이지' : 'Official Pages'}
          </HomePage>
        )}
        {moviePath && <MovieDetail detail={detail} />}
        {tvPath && <TvDetail detail={detail} />}
      </DetailContainer>
    </ModalBox>
  );
};

export const ModalBox = styled(motion.div)`
  box-shadow: 1px 2px 10px rgba(235, 235, 235, 0.3);
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 88vw;
  height: 70vh;
  margin: 0 auto;
  border-radius: 15px;
  overflow: scroll;
  -ms-overflow-style: none;
  background-color: ${(props) => props.theme.black.darker};
  @media ${device.tablet} {
    width: 70vw;
  }
  @media ${device.desktop} {
    width: 60vw;
  }
  @media ${device.desktopXl} {
    width: 50vw;
  }
`;

const VideoContainer = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30vh;
  svg {
    width: 30px;
    height: 30px;
  }
  @media ${device.tablet} {
    height: 40vh;
  }
  @media ${device.desktop} {
    height: 45vh;
    svg {
      width: 40px;
      height: 40px;
    }
  }
`;
const DetailContainer = styled.section`
  padding: 20px;
  display: flex;
  flex-direction: column;
  > p {
    padding-bottom: 10px;
    color: ${(props) => props.theme.white.lighter};
  }
  > h3 {
    color: ${(props) => props.theme.white.lighter};
    font-size: 22px;
    font-weight: 700;
    padding-bottom: 10px;
    display: block;
  }
  @media ${device.desktop} {
    > p {
      font-size: 16px;
    }
    > h3 {
      font-size: 34px;
    }
  }
`;

const ReleaseDate = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 5px;
  svg {
    width: 16px;
    height: 16px;
    fill: ${(props) => props.theme.yellow};
  }
`;

const RateTime = styled.div`
  display: flex;
  gap: 0 15px;
  align-items: center;
  margin-bottom: 15px;
`;

export const Info = styled.section<{ $column?: string }>`
  display: flex;
  width: 100%;
  overflow: scroll;
  flex-wrap: wrap;
  gap: 5px;
  flex-direction: ${(props) => (props.$column ? 'column' : 'row')};
  margin-bottom: ${(props) => (props.$column ? '25px' : '15px')};
  align-items: ${(props) => (props.$column ? 'flex-start' : 'center')};
  > h5 {
    font-size: 16px;
    font-weight: 700;
    margin-right: 5px;
    margin-bottom: 5px;
    color: ${(props) => props.theme.pink};
    width: max-content;
  }
  > p {
    font-size: 16px;
    line-height: 1.4;
  }
  > img {
    width: 160px;
    height: auto;
    margin: 10px 0;
  }
`;

const HomePage = styled.a`
  padding: 10px 0;
  align-self: flex-end;
  -webkit-align-self: flex-end;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
`;

export default Modal;
