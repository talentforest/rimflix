import { Language } from "../api/api";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { motion } from "framer-motion";
import styled from "styled-components";

const spring = {
  type: "tween",
  stiffness: 700,
  damping: 30,
  duration: 0.3,
};

const Languages = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const onLanguageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.name === Language.ko)
      return setLanguage(Language.ko);
    if (event.currentTarget.name === Language.en)
      return setLanguage(Language.en);
  };

  return (
    <Buttons $language={language}>
      <motion.div layout transition={spring} />
      <Button
        name={Language.ko}
        onClick={(event) => onLanguageClick(event)}
        $selected={language === Language.ko}
      >
        한국어
      </Button>
      <Button
        name={Language.en}
        onClick={(event) => onLanguageClick(event)}
        $selected={language === Language.en}
      >
        English
      </Button>
    </Buttons>
  );
};

const Buttons = styled.div<{ $language: string }>`
  position: relative;
  width: 150px;
  padding: 3px;
  border-radius: 20px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
  background-color: ${(props) => props.theme.white.lighter};
  > div {
    position: absolute;
    left: ${(props) => (props.$language === Language.ko ? "0" : "auto")};
    right: ${(props) => (props.$language === Language.en ? "0" : "auto")};
    width: 48%;
    height: 80%;
    margin: 3px;
    border-radius: 20px;
    background-color: ${(props) => props.theme.black.lighter};
  }
`;

const Button = styled.button<{ $selected: boolean }>`
  z-index: 1;
  width: 50%;
  padding: 4px 0;
  border-radius: 20px;
  border: none;
  background-color: transparent;
  font-weight: 700;
  color: ${(props) => (props.$selected ? props.theme.white.lighter : "#aaa")};
`;

export default Languages;