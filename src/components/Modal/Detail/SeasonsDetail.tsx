import styled from "styled-components";
import { ISeasonDetail } from "../../../api/api";
import { makeImagePath } from "../../../utils/makeImagePath";

interface PropsType {
  detail: ISeasonDetail;
}

const SeasonsDetail = ({ detail }: PropsType) => {
  return (
    <>
      {detail.episodes.map((item) => (
        <DetailBox>
          <h6>{item.name}</h6>
          <img src={makeImagePath(item.still_path)} alt="still" />
        </DetailBox>
      ))}
    </>
  );
};

const DetailBox = styled.li`
  img {
    width: 90px;
    height: 130px;
    margin-right: 10px;
    float: left;
  }
`;

export default SeasonsDetail;
