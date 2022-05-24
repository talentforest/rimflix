import styled from "styled-components";
import device from "../theme/mediaQueries";

interface PropsType {
  title: string;
}

const RowTitle = ({ title }: PropsType) => {
  return <H1>{title}</H1>;
};

const H1 = styled.h1`
  padding: 50px 60px 20px;
  font-size: 26px;
  font-weight: 700;
  @media ${device.tablet} {
    font-size: 22px;
    padding: 0px 50px 10px;
  }
  @media ${device.mobile} {
    font-size: 18px;
    padding: 10px 30px 10px;
  }
`;

export default RowTitle;
