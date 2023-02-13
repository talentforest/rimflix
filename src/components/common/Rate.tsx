import { Star } from '@mui/icons-material';
import styled from 'styled-components';

interface PropsType {
  rate: number;
  detail?: boolean;
}

const Rate = ({ rate }: PropsType) => {
  const cuttedRate = rate?.toFixed(1);

  return (
    <Box>
      <Star />
      {cuttedRate}
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 400;
  background-color: transparent;
  svg {
    color: ${(props) => props.theme.yellow};
    width: 12px;
    height: 12px;
    margin-right: 2px;
  }
`;

export default Rate;
