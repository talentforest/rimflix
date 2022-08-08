import styled from "styled-components";
import Modal from "./Modal";
import useSlide from "../hook/useSlide";
import ContentsBox from "./ContentsBox";
import device from "../theme/mediaQueries";
import { AnimatePresence, motion } from "framer-motion";
import { IDetail } from "../api/api";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

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
}

const RowSlider = ({ data }: PropsType) => {
  const { offset, back, index, toggleLeaving, increaseIndex, decreaseIndex } =
    useSlide(data);

  return (
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
            {data
              ?.slice(offset * index, offset * index + offset)
              .map((contents) => (
                <ContentsBox contents={contents} key={contents.id} />
              ))}
          </Row>
        </AnimatePresence>
      </Slider>
      <AnimatePresence>
        <Modal />
      </AnimatePresence>
      <ArrowForwardIos onClick={increaseIndex} />
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 420px;
  padding: 50px 0;
  margin-top: -30px;
  margin-bottom: 50px;
  > svg {
    padding: 0 10px;
    height: 100%;
    width: 50px;
    cursor: pointer;
  }
  @media ${device.tablet} {
    height: 320px;
    padding: 35px 0;
    margin-top: -40px;
    > svg {
      width: 35px;
      padding: 0 5px;
    }
  }
  @media ${device.mobile} {
    height: 280px;
    margin-top: -30px;
    margin-bottom: 10px;
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
