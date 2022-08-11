import { Star } from "@mui/icons-material";
import styled from "styled-components";

interface PropsType {
  rate: number;
}

const RateBox = ({ rate }: PropsType) => {
  const cuttedRate = rate?.toFixed(1);

  return (
    <Box>
      <Star />
      {cuttedRate}
    </Box>
  );
};

const Box = styled.div`
  width: fit-content;
  font-weight: 700;
  background-color: #9ed2ff;
  color: #313ef9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 2px;
  svg {
    path {
      stroke: #919191;
    }
    color: #ffd700;
    width: 15px;
    height: 15px;
  }
`;

export default RateBox;
