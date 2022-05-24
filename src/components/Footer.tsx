import styled from "styled-components";

const Footer = () => {
  return <Foot>림플릭스 대한민국</Foot>;
};

const Foot = styled.footer`
  width: 100%;
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.darker};
  font-size: 10px;
  padding: 30px 45px 0px;
  height: 200px;
  margin-top: 80px;
`;

export default Footer;
