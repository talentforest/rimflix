import { AnimatePresence, motion } from "framer-motion";
import { IDetail } from "../api/api";
import { ArrowBackIosNew, ArrowForwardIos, Circle } from "@mui/icons-material";
import Modal from "./Modal/Modal";
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

  return (
    <>
      <RowTitle>{title}</RowTitle>
      <SliderContainer>
        <div>
          {slideNumArr.map((item: number) => (
            <Circle key={item} className={item === index + 1 ? "mark" : ""} />
          ))}
        </div>
        <ArrowBackIosNew onClick={decreaseIndex} />
        <Slider>
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
        <AnimatePresence>
          <Modal />
        </AnimatePresence>
        <ArrowForwardIos onClick={increaseIndex} />
      </SliderContainer>
    </>
  );
};

const RowTitle = styled.h2`
  font-weight: 700;
  margin: 0 calc(5vw + 10px) 10px;
  @media ${device.tablet} {
    font-size: 24px;
    margin: 0 calc(5vw + 5px) 10px;
  }
  @media ${device.desktop} {
    margin: 0 3vw 10px;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 40vw;
  margin-bottom: 30px;
  position: relative;
  > div:first-child {
    visibility: hidden;
    position: absolute;
    right: 7vw;
    top: -25px;
    display: flex;
    gap: 3px;
    svg {
      width: 10px;
      height: 10px;
      fill: ${(props) => props.theme.black.lighter};
      &.mark {
        fill: ${(props) => props.theme.white.darker};
      }
    }
  }
  > svg {
    visibility: hidden;
    z-index: 2;
    width: 5vw;
    height: 100%;
    cursor: pointer;
    &:last-child {
      right: 0;
    }
  }
  &:hover {
    > div:first-child,
    > svg {
      visibility: visible;
    }
  }
  @media ${device.tablet} {
    height: 26vw;
    width: 100%;
    > div:first-child {
      right: 50px;
      top: -30px;
      gap: 10px;
    }
  }
  @media ${device.desktop} {
    height: 20vw;
    svg {
      width: 3vw;
    }
  }
`;

const Slider = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  @media ${device.tablet} {
    box-sizing: border-box;
  }
`;

const Row = styled(motion.div)`
  position: absolute;
  display: grid;
  gap: 0 5px;
  padding: 0 10px;
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
