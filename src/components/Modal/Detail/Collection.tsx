import { IDetail } from "../../../api/api";
import { makeImagePath } from "../../../utils/makeImagePath";
import { changeDateSeperator } from "../../../utils/changeDateSeperator";
import { useLocation, useNavigate } from "react-router-dom";
import RateBox from "../../common/RateBox";
import styled from "styled-components";

interface PropsType {
  parts: IDetail[];
  officailPoster: string;
}

const Collection = ({ parts, officailPoster }: PropsType) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavigateClick = (movieId: number) => {
    if (pathname.includes("myFavorite")) {
      navigate(`/myFavorite/movie/${movieId}`);
    } else {
      navigate(`/movie/${movieId}`);
    }
  };

  return (
    <CollectionList>
      {parts.map((item) => (
        <li key={item.id} onClick={() => handleNavigateClick(item.id)}>
          <img
            src={makeImagePath(item.poster_path || officailPoster)}
            alt="collection poster"
          />
          <div>
            <h6 key={item.id}>{item.original_title}</h6>
            <span>{changeDateSeperator(item.release_date)}</span>
            <RateBox rate={item.vote_average} />
          </div>
        </li>
      ))}
    </CollectionList>
  );
};

const CollectionList = styled.ul`
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 10px 0;
  overflow: scroll;
  > li {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    box-shadow: 1px 1px 4px rgba(255, 255, 255, 0.1);
    background-color: ${(props) => props.theme.black.lighter};
    cursor: pointer;
    &:hover {
      > div {
        background-color: rgba(0, 0, 0, 0.7);
        position: absolute;
        right: 0;
        left: 0;
        bottom: 0;
        top: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        padding: 5px;
        h6 {
          margin: 5px 0;
          text-align: center;
        }
        span {
          font-size: 14px;
        }
      }
    }
    img {
      border-radius: 5px;
      width: 100px;
      height: auto;
    }
    > div {
      display: none;
    }
  }
`;

export default Collection;
