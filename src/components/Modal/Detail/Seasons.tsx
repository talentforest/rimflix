import { getSeasonDetail, ISeason } from "../../../api/api";
import { makeImagePath } from "../../../utils/makeImagePath";
import { changeDateSeperator } from "../../../utils/changeDateSeperator";
import { useQueries } from "react-query";
import { useParams } from "react-router-dom";
import device from "../../../theme/mediaQueries";
import styled from "styled-components";
import SeasonsDetail from "./SeasonsDetail";

interface PropsType {
  seasons: ISeason[];
  officialPosterPath: string;
}

const Seasons = ({ seasons, officialPosterPath }: PropsType) => {
  const { id } = useParams();

  const seasonDetailResult = useQueries(
    seasons.map((item) => {
      return {
        queryKey: ["seasonNumber", item.season_number],
        queryFn: () => getSeasonDetail(+id, item.season_number),
      };
    })
  );

  return (
    <SeasonLists>
      {seasons?.map((detail) => (
        <li key={detail.id}>
          <Season>
            <img
              src={makeImagePath(detail.poster_path || officialPosterPath)}
              alt="season poster"
              loading="lazy"
            />
            <div>
              <h6>{detail.name}</h6>
              <span>Episodes: {detail.episode_count}</span>
              <span>
                {detail.air_date &&
                  `Air Date: ${changeDateSeperator(detail.air_date)}`}
              </span>
              {detail.overview && <p>{detail.overview}</p>}
            </div>
          </Season>
          <Episode>
            <SeasonsDetail
              key={detail.id}
              detail={seasonDetailResult[detail.season_number - 1].data}
            />
          </Episode>
        </li>
      ))}
    </SeasonLists>
  );
};

const SeasonLists = styled.ul`
  margin-top: 20px;
  width: 100%;
  > li {
    border: 1px solid red;
  }
`;

const Season = styled.div`
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

const Episode = styled.ul`
  min-height: 150px;
  margin-bottom: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  padding: 10px;
  border-radius: 5px;
`;

export default Seasons;
