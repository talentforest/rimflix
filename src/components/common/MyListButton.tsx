import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button } from "../../theme/buttonStyle";
import styled from "styled-components";
import useAddMyList from "../../hook/useAddMyList";
import { IMyList } from "../../data/myListAtoms";
import useCategory from "../../hook/useCategory";

interface PropsType {
  contentInfo: IMyList;
}

const MyListButton = ({ contentInfo }: PropsType) => {
  const { like, onAddClick, onDeleteClick } = useAddMyList(contentInfo);
  const { homePath, moviePath, tvPath, myListPath } = useCategory();

  return (
    <>
      {(homePath || moviePath || tvPath) &&
        (like ? (
          <MyFavarite onClick={onDeleteClick}>
            My List <Favorite />
          </MyFavarite>
        ) : (
          <MyFavarite onClick={onAddClick}>
            Add My List <FavoriteBorder />
          </MyFavarite>
        ))}
      {myListPath &&
        (like ? (
          <button onClick={onDeleteClick}>
            <Favorite />
          </button>
        ) : (
          <button onClick={onAddClick}>
            <FavoriteBorder />
          </button>
        ))}
    </>
  );
};

const MyFavarite = styled(Button)`
  background-color: #ffaa9f;
  border: none;
  > svg {
    height: 18px;
    width: 18px;
    fill: #ff0000;
  }
`;

export default MyListButton;
