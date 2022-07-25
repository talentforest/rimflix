import styled from "styled-components";
import Modal from "./Modal";
import useSlide from "../hook/useSlide";
import ContentsBox from "./ContentsBox";
import device from "../theme/mediaQueries";
import { AnimatePresence, motion } from "framer-motion";
import { IGetMovieTvResult } from "../api/api";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.outerWidth + 40 : window.outerWidth - 40,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth - 40 : -window.outerWidth + 40,
  }),
};

interface PropsType {
  sliceData?: IGetMovieTvResult;
  wholeData?: IGetMovieTvResult;
  upcomingData?: IGetMovieTvResult;
  type?: string;
  category?: string;
}

const RowSlider = ({ sliceData, wholeData, type, category }: PropsType) => {
  const { offset, back, index, toggleLeaving, increaseIndex, decreaseIndex } =
    useSlide(sliceData || wholeData);

  return (
    <Container>
      <ArrowBackIos sx={{ width: "3%" }} onClick={decreaseIndex} />
      <SliderContainer>
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
              {sliceData ? (
                sliceData?.results
                  ?.slice(1) // 배너에 사용한 영화 제외
                  .slice(offset * index, offset * index + offset)
                  .map((contents) => (
                    <ContentsBox
                      contents={contents}
                      key={contents.id}
                      type={type}
                      category={category}
                    />
                  ))
              ) : (
                <></>
              )}
              {wholeData ? (
                wholeData?.results
                  .slice(offset * index, offset * index + offset)
                  .map((contents) => (
                    <ContentsBox
                      contents={contents}
                      key={contents.id}
                      type={type}
                      category={category}
                    />
                  ))
              ) : (
                <></>
              )}
            </Row>
          </AnimatePresence>
        </Slider>
        <AnimatePresence>
          <Modal />
        </AnimatePresence>
      </SliderContainer>
      <ArrowForwardIos onClick={increaseIndex} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 280px;
  padding: 0 10px;
  box-sizing: border-box;
  > svg {
    margin: 0 10px;
    height: 220px;
    width: 30px;
    cursor: pointer;
  }
  @media ${device.tablet} {
    height: 280px;
    > svg {
      width: 20px;
      height: 220px;
    }
  }
  @media ${device.mobile} {
    padding: 0;
    height: 240px;
    > svg {
      width: 10px;
      height: 180px;
    }
  }
`;

const SliderContainer = styled.div`
  overflow: hidden;
  width: 100%;
  margin: -80px auto 0;
  display: flex;
  padding: 80px 0 140px;
  > svg {
    padding-bottom: 10px;
  }
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto 50px;
`;

const Row = styled(motion.div)`
  position: absolute;
  top: 5px;
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  @media ${device.tablet} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${device.mobile} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default RowSlider;
