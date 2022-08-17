import { ISeason } from "../../../api/api";
import { makeImagePath } from "../../../utils/makeImagePath";
import styled from "styled-components";

interface PropsType {
  seasons?: ISeason[];
  officialPosterPath: string;
}

const Seasons = ({ seasons, officialPosterPath }: PropsType) => {
  return (
    <SeasonLists>
      {seasons?.map((season) => (
        <Season key={season.id}>
          <img
            src={makeImagePath(season.poster_path || officialPosterPath)}
            alt="season poster"
            loading="lazy"
          />
          <h6>{season.name}</h6>
        </Season>
      ))}
    </SeasonLists>
  );
};

const SeasonLists = styled.ul`
  display: flex;
  gap: 10px;
  width: 100%;
  overflow: scroll;
  -ms-overflow-style: none;
`;

const Season = styled.li`
  position: relative;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  cursor: pointer;
  > img {
    width: 95px;
    height: 130px;
    margin-bottom: 5px;
  }
  h6 {
    width: 90px;
    text-align: center;
    font-size: 16px;
  }
  > div {
    position: absolute;
    display: flex;
    align-items: center;
    bottom: 40px;
    right: 10px;
    span {
      font-size: 12px;
    }
    svg {
      width: 14px;
      height: 14px;
      fill: #eee;
    }
  }
`;

export default Seasons;
