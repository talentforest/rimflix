import { useContext } from "react";
import styled from "styled-components";
import { Language } from "../api/api";
import { LanguageContext } from "../context/LanguageContext";
import Languages from "./Languages";

const Footer = () => {
  const { language } = useContext(LanguageContext);
  return (
    <Foot>
      {language === Language.ko ? "림플릭스 코리아" : "Rimflix Korea"}
      <span>
        {language === Language.ko
          ? "보고싶은 영화를 찾아보세요."
          : "Find a movie you want to watch."}
      </span>
      <span>Copyright &copy; rimflix All right reserved</span>
      <Languages />
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
  > span {
    display: block;
    margin-top: 10px;
  }
`;

export default Footer;
