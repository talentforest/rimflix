import { Star } from "@mui/icons-material";
import styled from "styled-components";

interface PropsType {
  rate: number;
  detail?: boolean;
}

const RateBox = ({ rate, detail }: PropsType) => {
  const cuttedRate = rate?.toFixed(1);

  return (
    <Box className={detail ? "detail" : "contents"}>
      <Star />
      {cuttedRate}
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  &.contents {
    font-size: 14px;
    font-weight: 700;
    background-color: #9ed2ff;
    color: #313ef9;
    border-radius: 5px;
    padding: 2px;
    svg {
      margin: 0;
      padding: 0;
      path {
        stroke: #919191;
      }
      color: #ffd700;
      width: 15px;
      height: 15px;
    }
  }
  &.detail {
    color: #fff;
    font-weight: 400;
    background-color: transparent;
    padding: 0;
    svg {
      color: #ffd700;
      width: 16px;
      height: 16px;
      margin-right: 3px;
    }
  }
`;

export default RateBox;
