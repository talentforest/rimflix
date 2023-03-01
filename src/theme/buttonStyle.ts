import styled from 'styled-components';

export const Button = styled.button<{ $color?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: 40px;
  gap: 5px;
  padding: 0 10px;
  font-size: 14px;
  font-weight: 700;
  color: #333;
  background-color: ${(props) => (props.$color ? props.theme.pink : '#fff')};
  border-radius: 5px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
