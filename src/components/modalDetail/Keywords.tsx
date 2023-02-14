import { useContext, useState } from 'react';
import { IKeyword, Language } from '../../api/api';
import { Info } from '../Modal';
import InfoBox from '../common/InfoBox';
import styled from 'styled-components';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { LanguageContext } from '../../context/LanguageContext';

interface IKeywordProps {
  keywords: IKeyword[];
}

const Keywords = ({ keywords }: IKeywordProps) => {
  const { language } = useContext(LanguageContext);
  const [showAllKeywords, setShowAllKeywords] = useState(false);

  const controlKeywords = keywords //
    ?.slice(0, showAllKeywords ? keywords?.length : 5);

  const onButtonClick = () => setShowAllKeywords((prev) => !prev);

  return (
    <Info $column='column'>
      <h5>{language === Language.ko ? '키워드' : 'Keywords'}</h5>
      <Keyword>
        {controlKeywords?.map((item) => (
          <InfoBox key={item.id} info={item.name} />
        ))}
        {keywords?.length > 5 && (
          <div role='button' onClick={onButtonClick}>
            {showAllKeywords ? <ArrowBackIosNew /> : <ArrowForwardIos />}
          </div>
        )}
      </Keyword>
    </Info>
  );
};

const Keyword = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    cursor: pointer;
    svg {
      fill: ${(props) => props.theme.pink};
      width: 12px;
      height: 18px;
    }
  }
`;

export default Keywords;
