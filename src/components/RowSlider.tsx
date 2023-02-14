import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IDetail } from '../api/api';
import { ArrowBackIosNew, ArrowForwardIos, Circle } from '@mui/icons-material';
import useSlide from '../hook/useSlide';
import device from '../theme/mediaQueries';
import styled from 'styled-components';
import useGenresQuery from '../hook/query/useGenresQuery';
import useFindPath from '../hook/useFindPath';
import ContentsBox from './common/ContentsBox';

const value =
  window.innerWidth < 650
    ? 40
    : window.innerWidth < 1023
    ? 160 //
    : window.innerWidth < 1280
    ? 70
    : 0;
const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.outerWidth + value : window.outerWidth - value,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth - value : -window.outerWidth + value,
  }),
};

interface PropsType {
  data?: IDetail[];
  title: string;
}

const RowSlider = ({ title, data }: PropsType) => {
  const backRef = useRef(null);
  const forwardRef = useRef(null);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const { tvPath } = useFindPath();
  const { allGenresLoading, findGenres } = useGenresQuery(
    tvPath ? 'tv' : 'movie'
  );

  const {
    offset,
    back,
    index,
    toggleLeaving,
    increaseIndex,
    decreaseIndex,
    slideNumArr,
  } = useSlide(data);

  const slidesCutToOffset = data?.slice(
    offset * index,
    offset * index + offset
  );

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchPosition({
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY,
    });

    backRef.current.style.visibility = 'visible';
    forwardRef.current.style.visibility = 'visible';
  };

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const distanceX = Math.abs(touchPosition.x - event.changedTouches[0].pageX);
    const distanceY = Math.abs(touchPosition.y - event.changedTouches[0].pageY);

    if (distanceY + distanceX < 350 && distanceX > distanceY) {
      if (touchPosition.x - event.changedTouches[0].pageX < 0) {
        decreaseIndex();
      } else if (touchPosition.x - event.changedTouches[0].pageX > 0) {
        increaseIndex();
      }
    }
    backRef.current.style.visibility = 'hidden';
    forwardRef.current.style.visibility = 'hidden';
  };

  return (
    <Section>
      <Header>
        <h2>{title}</h2>
        <SlideMark>
          {slideNumArr.map((slideNum: number) => (
            <Circle
              key={slideNum}
              className={slideNum === index + 1 ? 'mark' : ''}
            />
          ))}
        </SlideMark>
      </Header>
      <Sliders>
        <ArrowBackIosNew ref={backRef} onClick={decreaseIndex} />
        <Slider onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <AnimatePresence
            custom={back}
            initial={false}
            onExitComplete={toggleLeaving}
          >
            <Row
              variants={rowVariants}
              initial='hidden'
              animate='visible'
              exit='exit'
              transition={{ type: 'tween', duration: 1 }}
              key={index}
              custom={back}
            >
              {slidesCutToOffset?.map(
                (contents) =>
                  !allGenresLoading && (
                    <ContentsBox
                      key={contents.id}
                      contents={contents}
                      genres={findGenres(contents.genre_ids)}
                    />
                  )
              )}
            </Row>
          </AnimatePresence>
        </Slider>
        <ArrowForwardIos ref={forwardRef} onClick={increaseIndex} />
      </Sliders>
    </Section>
  );
};

const Section = styled.section`
  > div {
    visibility: visible;
  }
  @media ${device.tablet} {
    > header {
      > div {
        visibility: hidden;
      }
    }
    &:hover {
      > header {
        > div {
          visibility: visible;
        }
      }
      > div {
        > svg {
          visibility: visible;
        }
      }
    }
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 0 calc(5vw + 10px) 10px;
  font-weight: 700;
  @media ${device.tablet} {
    font-size: 18px;
    margin: 0 calc(5vw + 5px) 10px;
  }
  @media ${device.desktop} {
    font-size: 20px;
    margin: 0 3vw 10px;
  }
`;

const Sliders = styled.div`
  overflow: hidden;
  position: relative;
  display: flex;
  width: 100%;
  height: 43vw;
  margin-bottom: 40px;
  > svg {
    visibility: hidden;
    z-index: 2;
    width: 6vw;
    height: 100%;
    cursor: pointer;
    &:last-child {
      right: 0;
    }
  }
  @media ${device.tablet} {
    overflow: visible;
    height: 26vw;
  }
  @media ${device.desktop} {
    height: 20vw;
    margin-bottom: 80px;
    svg {
      width: 3vw;
    }
  }
`;

const SlideMark = styled.div`
  visibility: hidden;
  display: flex;
  align-items: center;
  gap: 3px;
  svg {
    width: 10px;
    height: 10px;
    fill: ${(props) => props.theme.black.lighter};
    &.mark {
      fill: ${(props) => props.theme.white.darker};
    }
  }
  @media ${device.tablet} {
    right: 50px;
    top: -30px;
    gap: 10px;
  }
`;

const Slider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  gap: 0 8px;
  padding: 0 5px;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  @media ${device.tablet} {
    gap: 0 10px;
    padding: 0;
    grid-template-columns: repeat(5, 1fr);
  }
  @media ${device.desktop} {
    grid-template-columns: repeat(6, 1fr);
  }
  @media ${device.desktopXl} {
    grid-template-columns: repeat(7, 1fr);
  }
`;

export default RowSlider;
