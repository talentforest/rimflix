import styled from "styled-components";
import device from "../theme/mediaQueries";

interface PropsType {
  title: string;
}

const RowTitle = ({ title }: PropsType) => {
  return <H1>{title}</H1>;
};

const H1 = styled.h1`
  padding: 0 60px;
  font-size: 30px;
  font-weight: 700;
  @media ${device.tablet} {
    padding: 0px 50px 20px;
    font-size: 26px;
  }
  @media ${device.mobile} {
    padding: 10px 30px 10px;
    font-size: 18px;
  }
`;

export default RowTitle;
