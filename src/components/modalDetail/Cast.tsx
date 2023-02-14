import { IGuestStar, Language } from '../../api/api';
import { profileSizes, sizeImagePath } from '../../utils/sizeImagePath';
import { Person } from '@mui/icons-material';
import { Info } from '../Modal';
import { useContext } from 'react';
import { LanguageContext } from '../../context/LanguageContext';
import styled from 'styled-components';

interface PropsType {
  cast: IGuestStar[];
}

const Cast = ({ cast }: PropsType) => {
  const { language } = useContext(LanguageContext);
  return (
    <Info $column='column'>
      <h5>{language === Language.ko ? '출연진' : 'Cast'}</h5>
      <CastList>
        {cast?.slice(0, 10)?.map((item) => (
          <Actor key={item.id}>
            {item.profile_path ? (
              <img
                src={sizeImagePath(profileSizes.w185, item.profile_path)}
                alt={`${item.name} profile`}
              />
            ) : (
              <Person />
            )}
            <h6>{item.name}</h6>
            <span>{item.character}</span>
          </Actor>
        ))}
      </CastList>
    </Info>
  );
};

export const CastList = styled.ul`
  display: flex;
  gap: 0 10px;
  overflow: scroll;
`;

export const Actor = styled.li`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  width: 120px;
  font-size: 14px;
  border-radius: 2px;
  background-color: ${(props) => props.theme.black.lighter};
  img {
    border-radius: 5px;
    width: auto;
    height: 140px;
    margin: 0 auto;
  }
  svg {
    width: 90px;
    height: 140px;
    margin: 0 auto;
  }
  h6 {
    font-size: 16px;
    font-weight: 700;
  }
  span {
    display: block;
    font-size: 13px;
  }
`;

export default Cast;
