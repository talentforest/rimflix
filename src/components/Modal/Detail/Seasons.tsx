import { ISeason } from "../../../api/api";
import { makeImagePath } from "../../../utils/makeImagePath";
import device from "../../../theme/mediaQueries";
import styled from "styled-components";
import { changeDateSeperator } from "../../../utils/changeDateSeperator";

interface PropsType {
  seasons: ISeason[];
  officialPosterPath: string;
}

const Seasons = ({ seasons, officialPosterPath }: PropsType) => {
  return (
    <SeasonLists>
      {seasons?.map((item) => (
        <li key={item.id}>
          {
            <img
              src={makeImagePath(item.poster_path || officialPosterPath)}
              alt="season poster"
            />
          }
          <BasicInfo>
            <h6>{item.name}</h6>
            <span>Episodes: {item.episode_count}</span>
            <span>
              {item.air_date &&
                `Air Date: ${changeDateSeperator(item.air_date)}`}
            </span>
            {item.overview && <p>{item.overview}</p>}
          </BasicInfo>
        </li>
      ))}
    </SeasonLists>
  );
};

const SeasonLists = styled.ul`
  margin-top: 20px;
  width: 100%;
  > li {
    min-height: 150px;
    margin-bottom: 10px;
    background-color: ${(props) => props.theme.black.lighter};
    padding: 10px;
    border-radius: 5px;
    > img {
      width: 90px;
      height: 130px;
      margin-right: 10px;
      float: left;
    }
  }
`;

const BasicInfo = styled.div`
  h6 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  span {
    display: block;
    font-size: 14px;
    color: #eee;
    margin-top: 5px;
  }
  p {
    margin-top: 10px;
    font-size: 16px;
  }
  @media ${device.mobile} {
    h6 {
      font-size: 18px;
      margin-bottom: 10px;
      font-weight: 600;
    }
    p {
      font-size: 15px;
    }
    span {
      font-size: 16px;
    }
  }
`;

export default Seasons;
