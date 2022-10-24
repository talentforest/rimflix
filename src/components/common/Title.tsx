import styled from "styled-components";
import device from "../../theme/mediaQueries";

interface ITitle {
  title: string;
}

const Title = ({ title }: ITitle) => {
  return <TitleBox>{title}</TitleBox>;
};

const TitleBox = styled.h1`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 10px;
  @media ${device.tablet} {
    font-size: 22px;
    margin-bottom: 15px;
  }
`;

export default Title;
