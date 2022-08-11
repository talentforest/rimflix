import styled from "styled-components";

interface PropsType {
  rate: number;
}

const RateBox = ({ rate }: PropsType) => {
  const cuttedRate = rate?.toFixed(1);

  return <Box>{cuttedRate}</Box>;
};

const Box = styled.div`
  width: 24px;
  height: 22px;
  font-weight: 700;
  background-color: #9ed2ff;
  color: #313ef9;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export default RateBox;
