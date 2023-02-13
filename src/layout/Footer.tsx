import { useContext } from 'react';
import styled from 'styled-components';
import { Language } from '../api/api';
import LanguageBtns from '../components/common/LanguageBtns';
import { LanguageContext } from '../context/LanguageContext';

const Footer = () => {
  const { language } = useContext(LanguageContext);

  return (
    <FooterBox>
      <LanguageBtns />
      <Detail>
        <span>
          {language === Language.ko
            ? '림플릭스 코리아 | 보고싶은 영화를 찾아보세요.'
            : 'Rimflix | Find a movie you want to watch.'}
        </span>
        <span>Copyright &copy; rimflix All right reserved</span>
      </Detail>
    </FooterBox>
  );
};

const FooterBox = styled.footer`
  width: 100%;
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.darker};
  font-size: 10px;
  padding: 40px 45px 100px;
  margin-top: 50px;
`;
const Detail = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  > span {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

export default Footer;
