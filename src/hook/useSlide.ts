import { useState } from "react";
import { IDetail } from "../api/api";
import useWindowSize from "./useWindowSize";

const useSlide = (data: IDetail[]) => {
  const [back, setBack] = useState(false);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const { windowSize } = useWindowSize();

  let offset = 6;

  if (windowSize.width <= 500) {
    offset = 3;
  } else if (windowSize.width <= 1023) {
    offset = 4;
  }

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setBack(false);
      toggleLeaving();
      const totalMovies = data.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      setBack(true);
      toggleLeaving();
      const totalMovies = data.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  return {
    offset,
    back,
    setBack,
    index,
    setIndex,
    toggleLeaving,
    increaseIndex,
    decreaseIndex,
  };
};

export default useSlide;
