import { Language } from "../api/api";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import styled from "styled-components";

const Languages = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const onLanguageClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.currentTarget.name === Language.ko)
      return setLanguage(Language.ko);
    if (event.currentTarget.name === Language.en)
      return setLanguage(Language.en);
  };

  return (
    <Buttons>
      <span>언어설정: </span>
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

const Buttons = styled.div`
  margin-top: 10px;
  padding: 0;
  display: flex;
  align-items: center;
  font-size: 12px;
  > span {
    padding-right: 5px;
  }
`;

const Button = styled.button<{ $selected: boolean }>`
  margin-right: 3px;
  border: none;
  background-color: transparent;
  color: ${(props) =>
    props.$selected ? props.theme.pink : props.theme.white.lighter};
`;

export default Languages;
