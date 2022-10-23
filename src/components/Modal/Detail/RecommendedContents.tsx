import { useNavigate } from "react-router-dom";
import { IDetail } from "../../../api/api";
import { motion } from "framer-motion";
import { changeDateSeperator } from "../../../utils/changeDateSeperator";
import { posterSizes, sizeImagePath } from "../../../utils/sizeImagePath";
// import { Contents } from "../TvDetail";
import Rate from "../../common/Rate";
import styled from "styled-components";
import useCategory from "../../../hook/useCategory";

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
  recommendation: IDetail[];
}

const RecommendedContents = ({ recommendation }: PropsType) => {
  const navigate = useNavigate();
  const { moviePath } = useCategory();

  return (
    <>
      {/* {recommendation?.map(
        (item) =>
          item.poster_path && (
            <Contents
              onClick={() => {
                navigate(moviePath ? `/movie/${item.id}` : `/tv/${item.id}`);
              }}
              key={item.id}
              variants={boxVariants}
              whileHover="hover"
              initial="normal"
              transition={{ type: "tween" }}
            >
              <img
                src={sizeImagePath(posterSizes.w342, item.poster_path)}
                alt={`${item.name || item.title} poster`}
                loading="lazy"
              />
              <ContentsInfo variants={infoVariants}>
                <h5>{item.name || item.title}</h5>
                <Rate detail={true} rate={item.vote_average} />
                <span>
                  {changeDateSeperator(
                    item.first_air_date || item.release_date
                  )}
                </span>
              </ContentsInfo>
            </Contents>
          )
      )} */}
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
export default RecommendedContents;
