import { CircularProgress } from '@mui/material';
import styled from 'styled-components';
interface PropsType {
  height: number;
}

const Loading = ({ height }: PropsType) => {
  return (
    <LoadingBox $height={height}>
      <CircularProgress />
    </LoadingBox>
  );
};

const LoadingBox = styled.div<{ $height: number }>`
  width: 100%;
  min-height: ${(props) => `${props.$height}vh`};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 70px 0 100px;
`;

export default Loading;
