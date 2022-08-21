import { AnimatePresence, motion } from "framer-motion";
import { IDetail } from "../api/api";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import Modal from "./Modal/Modal";
import useSlide from "../hook/useSlide";
import Contents from "./Contents";
import device from "../theme/mediaQueries";
import styled from "styled-components";

const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.outerWidth + 5 : window.outerWidth - 5,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth - 5 : -window.outerWidth + 5,
  }),
};

interface PropsType {
  data?: IDetail[];
  title: string;
}

const RowSlider = ({ title, data }: PropsType) => {
  const { offset, back, index, toggleLeaving, increaseIndex, decreaseIndex } =
    useSlide(data);

  const sliceSlideNum = data?.slice(offset * index, offset * index + offset);

  return (
    <>
      <RowTitle>{title}</RowTitle>
      <SliderContainer>
        <ArrowBackIos onClick={decreaseIndex} />
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
  padding: 20px 60px;
  font-size: 30px;
  font-weight: 700;
  @media ${device.tablet} {
    padding: 20px 50px;
    font-size: 26px;
  }
  @media ${device.mobile} {
    padding: 20px 30px;
    font-size: 18px;
  }
`;

const SliderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
  > svg {
    padding: 0 10px;
    height: 100%;
    width: 50px;
    cursor: pointer;
  }
  @media ${device.tablet} {
    height: 300px;
    > svg {
      width: 35px;
      padding: 0 5px;
    }
  }
  @media ${device.mobile} {
    height: 280px;
    margin-top: -30px;
    > svg {
      width: 30px;
    }
  }
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const Row = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: grid;
  gap: 0 15px;
  grid-template-columns: repeat(5, 1fr);
  @media ${device.tablet} {
    grid-template-columns: repeat(4, 1fr);
    gap: 0 10px;
  }
  @media ${device.mobile} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default RowSlider;
