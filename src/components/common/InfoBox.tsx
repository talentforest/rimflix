import styled from "styled-components";
import device from "../../theme/mediaQueries";

interface PropsType {
  info: string;
}

const InfoBox = ({ info }: PropsType) => {
  return <Box>{info}</Box>;
};

const Box = styled.div`
  border: 1px solid #aaa;
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  padding: 5px;
  color: #fff;
  @media ${device.mobile} {
    font-size: 14px;
  }
`;

export default InfoBox;
