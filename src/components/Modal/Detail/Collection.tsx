import { useState } from "react";
import { ICollection, IDetail } from "../../../api/api";
import { makeImagePath } from "../../../utils/makeImagePath";
import InfoBox from "../../common/InfoBox";
import RateBox from "../../common/RateBox";
import styled from "styled-components";

interface PropsType {
  detail: IDetail;
  collection: ICollection;
}

const Collection = ({ detail, collection }: PropsType) => {
  const [openFolder, setOpenFolder] = useState(false);

  const openDetail = () => {
    setOpenFolder((prev) => !prev);
  };

  return (
    <>
      <Box>
        <BasicInfo $float="left">
          <img
            src={makeImagePath(detail?.belongs_to_collection?.poster_path)}
            alt="collection poster"
          />
          <div>
            <h6>{collection.name}</h6>
            <p>{collection.overview}</p>
          </div>
        </BasicInfo>
        <h5>Collections ({collection?.parts.length})</h5>
        <NameLists>
          {collection.parts?.map((item) => (
            <InfoBox key={item.id} info={item.title} />
          ))}
        </NameLists>
        <button onClick={openDetail}>More Details</button>
      </Box>
      {openFolder ? (
        <OpenDetailBox>
          {collection?.parts.map((item) => (
            <li key={item.id}>
              <BasicInfo $float="right">
                <img
                  src={makeImagePath(item.poster_path)}
                  alt="collection poster"
                />
                <div>
                  <h6 key={item.id}>{item.original_title}</h6>
                  <p>{item.overview}</p>
                </div>
              </BasicInfo>
              <ExtraInfo>
                <span>
                  Release Date: {item.release_date.split("-").join(".")}
                </span>
                <RateBox rate={item.vote_average} />
              </ExtraInfo>
            </li>
          ))}
        </OpenDetailBox>
      ) : (
        <></>
      )}
    </>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  margin: 20px 0 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.black.lighter};
  h5 {
    font-size: 16px;
    margin-top: 10px;
  }
  button {
    margin-top: 20px;
    align-self: end;
    color: #fff;
    text-decoration: underline;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;

const BasicInfo = styled.div<{ $float: string }>`
  img {
    width: 100px;
    height: 140px;
    float: ${(props) => props.$float};
    margin-right: ${(props) => (props.$float === "left" ? "10px" : "0")};
    margin-left: ${(props) => (props.$float === "right" ? "10px" : "0")};
  }
  > div {
    h6 {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 15px;
    }
    p {
      font-size: 16px;
      word-break: break-all;
    }
  }
`;

const NameLists = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const OpenDetailBox = styled.ul`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 5px;
  > li {
    display: flex;
    flex-direction: column;
    padding: 10px 0;
    margin: 0 10px;
    border-bottom: 1px solid #aaa;
    &:last-child {
      border-bottom: none;
    }
  }
`;

const ExtraInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  span {
    font-size: 16px;
  }
`;

export default Collection;
