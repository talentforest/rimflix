import { useState } from "react";
import { IKeyword } from "../../../api/api";
import { Info } from "../Modal";
import InfoBox from "../../common/InfoBox";
import styled from "styled-components";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

interface IKeywordProps {
  keywords: IKeyword[];
}

const Keywords = ({ keywords }: IKeywordProps) => {
  const [showAllKeywords, setShowAllKeywords] = useState(false);

  const keywordLength: number = keywords?.length;
  const controlKeywords = keywords //
    ?.slice(0, showAllKeywords ? keywordLength : 5);
  const onButtonClick = () => {
    setShowAllKeywords((prev) => !prev);
  };

  return (
    keywordLength !== 0 && (
      <Info $column="column">
        <h5>Keywords</h5>
        <Keyword>
          {controlKeywords?.map((item) => (
            <InfoBox key={item.id} info={item.name} />
          ))}
          {keywordLength > 5 && (
            <div role="button" onClick={onButtonClick}>
              {showAllKeywords ? <ArrowBackIosNew /> : <ArrowForwardIos />}
            </div>
          )}
        </Keyword>
      </Info>
    )
  );
};

const Keyword = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    cursor: pointer;
    svg {
      fill: ${(props) => props.theme.pink};
      width: 12px;
      height: 18px;
    }
  }
`;

export default Keywords;
