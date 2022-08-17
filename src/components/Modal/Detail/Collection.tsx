import { ICollection } from "../../../api/api";
import { makeImagePath } from "../../../utils/makeImagePath";
import { changeDateSeperator } from "../../../utils/changeDateSeperator";
import { useLocation, useNavigate } from "react-router-dom";
import RateBox from "../../common/RateBox";
import styled from "styled-components";

interface PropsType {
  collection: ICollection;
}

const Collection = ({ collection }: PropsType) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigateClick = (movieId: number) => {
    if (pathname.includes("myFavorite")) {
      navigate(`/myFavorite/movie/${movieId}`);
    } else {
      navigate(`/movie/${movieId}`);
    }
  };

  const { name, parts } = collection;

  return (
    <>
      <h5>
        {name} ({parts.length})
      </h5>
      <CollectionList>
        {parts.map((item) => (
          <li key={item.id} onClick={() => handleNavigateClick(item.id)}>
            <img
              src={makeImagePath(item.poster_path)}
              alt="collection poster"
            />
            <h6 key={item.id}>{item.original_title}</h6>
            <div>
              <span>{changeDateSeperator(item.release_date)}</span>
              <RateBox rate={item.vote_average} />
            </div>
          </li>
        ))}
      </CollectionList>
    </>
  );
};

const CollectionList = styled.ul`
  display: flex;
  gap: 10px;
  overflow: scroll;
  width: 100%;
  > li {
    width: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.black.lighter};
    cursor: pointer;
    &:hover {
      background-color: #ffcccc;
      color: #333;
    }
    img {
      width: 100px;
      height: 140px;
    }
    h6 {
      font-weight: 700;
      font-size: 16px;
      text-align: center;
      margin: 5px 0 10px;
    }
    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0 5px;
    }
  }
`;

export default Collection;
