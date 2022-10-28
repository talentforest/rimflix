import { motion } from "framer-motion";
import { useEffect } from "react";
import styled from "styled-components";

interface PropsType {
  onCloseClick: () => void;
}

const Overlay = ({ onCloseClick }: PropsType) => {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;
    `;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <OverlayBox
      onClick={onCloseClick}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  );
};

const OverlayBox = styled(motion.div)`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  cursor: pointer;
`;

export default Overlay;
