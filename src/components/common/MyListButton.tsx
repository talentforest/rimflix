import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Button } from '../../theme/buttonStyle';
import { IMyList } from '../../data/myListAtoms';
import useAddMyList from '../../hook/useAddMyList';
import styled from 'styled-components';

interface PropsType {
  contentInfo: IMyList;
  simpleBtn?: boolean;
}

const MyListButton = ({ contentInfo, simpleBtn }: PropsType) => {
  const { like, onAddClick, onDeleteClick } = useAddMyList({
    contentInfo,
  });

  return like ? (
    <MyFavarite onClick={onDeleteClick}>
      {!simpleBtn && 'My List'}
      <Favorite />
    </MyFavarite>
  ) : (
    <MyFavarite onClick={onAddClick}>
      {!simpleBtn && 'Add My List'}
      <FavoriteBorder />
    </MyFavarite>
  );
};

const MyFavarite = styled(Button)`
  background-color: #ffaa9f;
  border: none;
  border: 1px solid red;
  > svg {
    height: 18px;
    width: 18px;
    fill: #ff0000;
  }
`;

export default MyListButton;
