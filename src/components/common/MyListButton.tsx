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
    <FavBtn onClick={onDeleteClick}>
      {!simpleBtn && 'My List'}
      <Favorite />
    </FavBtn>
  ) : (
    <FavBtn onClick={onAddClick}>
      {!simpleBtn && 'Add My List'}
      <FavoriteBorder />
    </FavBtn>
  );
};

const FavBtn = styled(Button)`
  background-color: #ffaa9f;
  border: none;
  width: fit-content;
  height: 40px;
  margin: 10px 0;
  > svg {
    height: 18px;
    width: 18px;
    fill: #ff0000;
  }
`;

export default MyListButton;
