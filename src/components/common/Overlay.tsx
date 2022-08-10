import { motion } from "framer-motion";
import styled from "styled-components";

interface PropsType {
  onOverlayClicked: () => void;
}

const Overlay = ({ onOverlayClicked }: PropsType) => {
  return (
    <OverlayBox
      onClick={() => onOverlayClicked()}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    />
  );
};

const OverlayBox = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  cursor: pointer;
`;

export default Overlay;
