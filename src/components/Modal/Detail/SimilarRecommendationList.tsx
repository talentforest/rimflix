import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IDetail } from "../../../api/api";
import { changeDateSeperator } from "../../../utils/changeDateSeperator";
import { makeImagePath } from "../../../utils/makeImagePath";
import { Contents, OtherContents } from "./TvDetail";
import RateBox from "../../common/RateBox";
import styled from "styled-components";

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.15,
    y: -10,
    zIndex: 1,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween",
    },
  },
};
const infoVariants = {
  normal: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    zIndex: 1,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween",
    },
  },
};

interface PropsType {
  route: string;
  category: string;
  similar: IDetail[];
  recommendation: IDetail[];
}

const SimilarRecommendationList = ({
  route,
  category,
  similar,
  recommendation,
}: PropsType) => {
  const navigate = useNavigate();

  return (
    <>
      {category === "similar" && (
        <OtherContents>
          {similar?.map(
            (item) =>
              item.poster_path && (
                <Contents
                  onClick={() => {
                    navigate(`/${route}/${item.id}`);
                  }}
                  key={item.id}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: "tween" }}
                >
                  <img
                    src={makeImagePath(item.poster_path)}
                    alt={`${item.name || item.title} poster`}
                    loading="lazy"
                  />
                  <ContentsInfo variants={infoVariants}>
                    <h5>{item.name || item.title}</h5>
                    <RateBox detail={true} rate={item.vote_average} />
                    <span>
                      {changeDateSeperator(
                        item.first_air_date || item.release_date
                      )}
                    </span>
                  </ContentsInfo>
                </Contents>
              )
          )}
        </OtherContents>
      )}
      {category === "recommendation" && (
        <OtherContents>
          {recommendation?.map(
            (item) =>
              item.poster_path && (
                <Contents
                  onClick={() => {
                    navigate(`/${route}/${item.id}`);
                  }}
                  key={item.id}
                  variants={boxVariants}
                  whileHover="hover"
                  initial="normal"
                  transition={{ type: "tween" }}
                >
                  <img
                    src={makeImagePath(item.poster_path)}
                    alt={`${item.name || item.title} poster`}
                    loading="lazy"
                  />
                  <ContentsInfo variants={infoVariants}>
                    <h5>{item.name || item.title}</h5>
                    <RateBox detail={true} rate={item.vote_average} />
                    <span>
                      {changeDateSeperator(
                        item.first_air_date || item.release_date
                      )}
                    </span>
                  </ContentsInfo>
                </Contents>
              )
          )}
        </OtherContents>
      )}
    </>
  );
};

const ContentsInfo = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  height: 100%;
  width: 100%;
  padding: 15px 5px;
  background-color: rgba(0, 0, 0, 0.8);
  h5 {
    font-size: 15px;
    text-align: center;
  }
  span {
    font-size: 12px;
  }
`;

export default SimilarRecommendationList;
