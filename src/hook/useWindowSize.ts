import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth });

  const throttle = (func: () => void, delay: number) => {
    let inProgress = false;
    return () => {
      if (inProgress) return;
      inProgress = true;
      setTimeout(() => {
        func();
        inProgress = false;
      }, delay);
    };
  };

  useEffect(() => {
    const handleResize = throttle(() => {
      setWindowSize({ width: window.innerWidth });
    }, 2000);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    windowSize,
  };
};

export default useWindowSize;
