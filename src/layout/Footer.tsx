import styled from "styled-components";

const Footer = () => {
  return (
    <Foot>
      Rimflix Korea <span>Search a movie you want to see</span>
      <span>Copyright &copy; rimflix All right reserved</span>
    </Foot>
  );
};

const Foot = styled.footer`
  width: 100%;
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.darker};
  font-size: 10px;
  padding: 20px 45px;
  margin-top: 50px;
  span {
    display: block;
    margin-top: 10px;
  }
`;

export default Footer;
