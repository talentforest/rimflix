import styled from "styled-components";

interface PropsType {
  genre: string;
}

const GenreBox = ({ genre }: PropsType) => {
  return <Box>{genre}</Box>;
};

const Box = styled.div`
  border: 1px solid #aaa;
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  padding: 2px 3px;
  color: #fff;
`;

export default GenreBox;
