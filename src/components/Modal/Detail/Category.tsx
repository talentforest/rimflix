import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import device from "../../../theme/mediaQueries";

interface ICategoryProps {
  firstDataLength?: number;
  secondDataLength: number;
  thirdDataLength: number;
  category: string;
  setCategory: (category: string) => void;
}

const Category = ({
  firstDataLength,
  secondDataLength,
  thirdDataLength,
  category,
  setCategory,
}: ICategoryProps) => {
  const { pathname } = useLocation();
  const moviePath = pathname.includes("/movie");
  const firstCategoryName = moviePath ? "Collection" : "Seasons";

  const onCategoryClick = (name: string) => {
    setCategory(name);
  };

  const animated = (name: string) => {
    return category === name ? { scale: 1.15, color: "#ffcccc" } : { scale: 1 };
  };

  return (
    <Categories>
      {!!firstDataLength && (
        <motion.li
          onClick={() => onCategoryClick(firstCategoryName)}
          animate={animated(firstCategoryName)}
        >
          <span>{firstCategoryName}</span>
        </motion.li>
      )}
      {!!secondDataLength && (
        <motion.li
          onClick={() => onCategoryClick("Similar")}
          animate={animated("Similar")}
        >
          <span>Similar</span>
        </motion.li>
      )}
      {!!thirdDataLength && (
        <motion.li
          onClick={() => onCategoryClick("Recommended")}
          animate={animated("Recommended")}
        >
          <span>How about this?</span>
        </motion.li>
      )}
    </Categories>
  );
};

const Categories = styled(motion.ul)`
  display: flex;
  gap: 20px;
  margin-left: 5px;
  li {
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    height: 30px;
    color: #888;
    cursor: pointer;
  }
  @media ${device.mobile} {
    li {
      font-size: 14px;
    }
  }
`;

export default Category;
