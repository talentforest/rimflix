import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IDetail } from "../api/api";
import { ArrowBackIosNew, ArrowForwardIos, Circle } from "@mui/icons-material";
import useSlide from "../hook/useSlide";
import Contents from "./Contents";
import device from "../theme/mediaQueries";
import styled from "styled-components";

const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.outerWidth + 50 : window.outerWidth - 50,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth - 50 : -window.outerWidth + 50,
  }),
};

interface PropsType {
  data?: IDetail[];
  title: string;
}

const RowSlider = ({ title, data }: PropsType) => {
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const {
    offset,
    back,
    index,
    totalSlideNum,
    toggleLeaving,
    increaseIndex,
    decreaseIndex,
  } = useSlide(data);

  const sliceSlideNum = data?.slice(offset * index, offset * index + offset);

  const slideNumArr = Array.from(
    { length: totalSlideNum },
    (_, index) => index + 1
  );

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchPosition({
      x: event.changedTouches[0].pageX,
      y: event.changedTouches[0].pageY,
    });
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
  };

  return (
    <Container>
      <Header>
        <h2>{title}</h2>
        <SlideMark>
          {slideNumArr.map((slideNum: number) => (
            <Circle
              key={slideNum}
              className={slideNum === index + 1 ? "mark" : ""}
            />
          ))}
        </SlideMark>
      </Header>
      <Sliders>
        {<ArrowBackIosNew onClick={decreaseIndex} />}
        <Slider onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <AnimatePresence
            custom={back}
            initial={false}
            onExitComplete={toggleLeaving}
          >
            <Row
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", duration: 1 }}
              key={index}
              custom={back}
            >
              {sliceSlideNum?.map((contents) => (
                <Contents contents={contents} key={contents.id} />
              ))}
            </Row>
          </AnimatePresence>
        </Slider>
        {<ArrowForwardIos onClick={increaseIndex} />}
      </Sliders>
    </Container>
  );
};

const Container = styled.section`
  > header {
    > div {
      visibility: visible;
    }
  }
  &:hover {
    > div {
      > svg {
        visibility: visible;
      }
    }
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
    font-size: 24px;
    margin: 0 calc(5vw + 5px) 10px;
  }
  @media ${device.desktop} {
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
    width: 100%;
  }
  @media ${device.desktop} {
    height: 20vw;
    margin-bottom: 60px;
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
  gap: 0 5px;
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
`;

export default RowSlider;
