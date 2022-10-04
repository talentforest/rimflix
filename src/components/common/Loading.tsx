import { CircularProgress } from "@mui/material";
import styled from "styled-components";
interface PropsType {
  screenSize: string;
}

const Loading = ({ screenSize }: PropsType) => {
  return (
    <LoadingBox $screenSize={screenSize}>
      <CircularProgress />
    </LoadingBox>
  );
};

const LoadingBox = styled.div<{ $screenSize: string }>`
  width: 100%;
  min-height: ${(props) => (props.$screenSize === "entire" ? "80vh" : "100%")};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 70px 0 100px;
`;

export default Loading;
