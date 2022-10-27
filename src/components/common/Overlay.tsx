import { motion } from "framer-motion";
import styled from "styled-components";

interface PropsType {
  onCloseClick: () => void;
}

const Overlay = ({ onCloseClick }: PropsType) => {
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
