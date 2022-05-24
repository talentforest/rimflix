import styled from "styled-components";

interface PropsType {
  title: string;
}

const RowTitle = ({ title }: PropsType) => {
  return <H1>{title}</H1>;
};

const H1 = styled.h1`
  padding: 40px 60px 20px;
  font-size: 26px;
  font-weight: 700;
`;

export default RowTitle;
