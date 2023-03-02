import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { ISetting } from '../../routes/PhotoCard';
import device from '../../theme/mediaQueries';
import { colors } from '../../utils/variants';

interface ICanvasSetting {
  setting: ISetting;
  setSetting: (setting: ISetting) => void;
}

const CanvasSetting = ({ setting, setSetting }: ICanvasSetting) => {
  const onColorClick = (color: string) => {
    setSetting({ ...setting, color });
  };

  const onColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const color = event.currentTarget.value;
    setSetting({ ...setting, color });
  };

  const onRangeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const range = +event.currentTarget.value;
    setSetting({ ...setting, range });
  };

  return (
    <SettingBox>
      <h5>Line Width</h5>
      <input
        type='range'
        min='1'
        max='10'
        value={setting.range}
        step='0.5'
        onChange={onRangeChange}
      />
      <h5>Palette</h5>
      <ColorSet>
        <Palette>
          {colors.map((color) => (
            <Color
              key={color}
              $color={color}
              onClick={() => onColorClick(color)}
            />
          ))}
        </Palette>
        <Swatch $color={setting.color}>
          <h6>Selected Color</h6>
          <input type='color' value={setting.color} onChange={onColorChange} />
        </Swatch>
      </ColorSet>
    </SettingBox>
  );
};

const SettingBox = styled.div`
  width: 90%;
  margin: 30px auto 0;
  > h5 {
    margin: 20px 0 10px;
    &:first-child {
      margin-top: 10px;
    }
  }
  @media ${device.desktop} {
    margin: 0;
    width: 40%;
  }
`;
const ColorSet = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  @media ${device.desktop} {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;
const Palette = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  width: 100%;
`;
const Color = styled.button<{ $color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: inset 3px 2px 8px rgba(0, 0, 0, 0.2);
  border: none;
  background-color: ${({ $color }) => $color};
`;

const Swatch = styled.div<{ $color: string }>`
  position: relative;
  width: 300px;
  background-color: white;
  box-shadow: 3px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0;
  h6 {
    color: ${({ $color }) => $color};
    text-transform: uppercase;
    font-size: 12px;
    margin-left: 10px;
  }
  input[type='color'] {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: none;
    border: 0;
    cursor: pointer;
    height: 50px;
    padding: 0;
    margin: 0;
    width: 50px;
    &::-webkit-color-swatch-wrapper {
      padding: 0;
    }
    &::-webkit-color-swatch {
      border: 0;
      border-radius: 0;
    }
    &::-moz-color-swatch,
    &::-moz-focus-inner {
      border: 0;
    }
    &::-moz-focus-inner {
      padding: 0;
    }
  }
`;

export default CanvasSetting;
