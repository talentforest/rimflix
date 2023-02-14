import { AccessTime } from '@mui/icons-material';
import { useContext } from 'react';
import styled from 'styled-components';
import { LanguageContext } from '../../context/LanguageContext';
import { convertRunningTime } from '../../utils/convertRunningTime';

interface IRuntimeProps {
  runtime: number;
}

const RunTime = ({ runtime }: IRuntimeProps) => {
  const { language } = useContext(LanguageContext);

  return (
    !!runtime && (
      <Time>
        <AccessTime />
        <span>{`${convertRunningTime(runtime, language)}`}</span>
      </Time>
    )
  );
};

const Time = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: auto;
    height: 18px;
    margin-right: 5px;
  }
`;

export default RunTime;
