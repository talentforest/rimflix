import { IGuestStar } from "../../../api/api";
import { makeImagePath } from "../../../utils/makeImagePath";
import styled from "styled-components";
import { Person } from "@mui/icons-material";

interface PropsType {
  cast: IGuestStar[];
}

const Cast = ({ cast }: PropsType) => {
  return (
    <CastList>
      {cast?.slice(0, 10)?.map((item) => (
        <Actor key={item.id}>
          {item.profile_path ? (
            <img
              src={makeImagePath(item.profile_path)}
              alt={`${item.name} profile`}
            />
          ) : (
            <Person />
          )}
          <h6>{item.name}</h6>
          <span>{item.character}</span>
        </Actor>
      ))}
    </CastList>
  );
};

export const CastList = styled.ul`
  display: flex;
  gap: 0 10px;
  width: 100%;
  overflow: scroll;
`;

export const Actor = styled.li`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  width: 110px;
  font-size: 14px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  box-shadow: 1px 2px 5px rgba(155, 155, 155, 0.3);
  img {
    border-radius: 5px;
    width: auto;
    height: 140px;
    margin: 0 auto;
  }
  svg {
    width: 90px;
    height: 140px;
    margin: 0 auto;
  }
  h6 {
    font-size: 16px;
    font-weight: 700;
  }
  span {
    display: block;
    font-size: 13px;
  }
`;

export default Cast;
