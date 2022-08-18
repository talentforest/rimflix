import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const Loading = () => {
  return (
    <LoadingBox>
      <CircularProgress />
    </LoadingBox>
  );
};

const LoadingBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 70px 0 100px;
`;

export default Loading;
