import { Gesture, RestartAlt, SaveAlt, Title } from '@mui/icons-material';
import { ChangeEvent, MouseEvent } from 'react';
import styled from 'styled-components';
import { ISetting, mode } from '../../routes/PhotoCard';

interface IModeBtns {
  mode: mode;
  setting: ISetting;
  setSetting: (setting: ISetting) => void;
  onModeClick: (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    mode: mode
  ) => void;
}

const ModeBtns = ({ mode, setting, setSetting, onModeClick }: IModeBtns) => {
  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSetting({ ...setting, text });
  };

  const setSVG = (btnName: mode) => {
    switch (btnName) {
      case 'reset':
        return <RestartAlt />;
      case 'draw':
        return <Gesture />;
      case 'text':
        return <Title />;
      case 'save':
        return <SaveAlt />;
      default:
        break;
    }
  };

  return (
    <>
      <Btns>
        {['reset', 'draw', 'text', 'save'].map((btnName) => (
          <Btn
            key={btnName}
            as={btnName === 'save' ? 'a' : 'button'}
            $selected={mode === btnName}
            onClick={(
              event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
            ) => onModeClick(event, btnName as mode)}
          >
            {setSVG(btnName as mode)}
            <span>{btnName.toUpperCase()}</span>
          </Btn>
        ))}
      </Btns>
      {mode === 'text' && (
        <TextInput
          type='text'
          placeholder='Write and DoubleClick!'
          value={setting.text}
          onChange={onTextChange}
        />
      )}
    </>
  );
};

const Btns = styled.div`
  display: flex;
  gap: 5px;
`;
const Btn = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  border: none;
  color: ${({ $selected }) => ($selected ? '#000' : '#666')};
  background-color: ${({ $selected }) => ($selected ? '#fff' : '#aaa')};
  font-size: 14px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
const TextInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  width: 200px;
  margin-top: 10px;
`;

export default ModeBtns;
