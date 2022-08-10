import { Close, Info, PlayCircle } from "@mui/icons-material";
import styled from "styled-components";
import device from "../../theme/mediaQueries";

interface PropsType {
  link?: boolean;
  dataId?: number;
  buttonName: string;
  handlePlayClick?: () => void;
  infoIcon?: boolean;
  playIcon?: boolean;
  closeIcon?: boolean;
}

const ButtonBox = ({
  handlePlayClick,
  buttonName,
  infoIcon,
  playIcon,
  closeIcon,
}: PropsType) => {
  return (
    <Box
      role="button"
      onClick={handlePlayClick}
      className={`${playIcon ? "play" : ""} ${closeIcon ? "close" : ""}`}
    >
      <span>{buttonName}</span>
      {playIcon && <PlayCircle />}
      {infoIcon && <Info />}
      {closeIcon && <Close />}
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 50px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  border: 1px solid #eaeaea;
  cursor: pointer;
  &.play,
  &.close {
    background-color: ${(props) => props.theme.black.darker};
    color: #fff;
  }
  &.close {
    position: absolute;
    right: 20px;
    top: -50px;
    width: 140px;
    height: 40px;
    svg {
      width: 30px;
      height: 30px;
    }
  }
  @media ${device.tablet} {
    font-weight: 700;
    width: 130px;
    height: 50px;
  }
  @media ${device.mobile} {
    font-size: 14px;
    width: 110px;
    height: 40px;
    font-weight: 700;
    &.close {
      width: 100px;
      height: 30px;
      top: -40px;
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export default ButtonBox;
