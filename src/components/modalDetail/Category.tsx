import { motion } from "framer-motion";
import styled from "styled-components";
import useFindPath from "../../hook/useFindPath";

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
  const { moviePath } = useFindPath();

  const firstCategoryName = moviePath ? "Collection" : "Seasons";

  const onCategoryClick = (name: string) => {
    setCategory(name);
  };

  const animated = (name: string) => {
    return category === name ? { scale: 1.15 } : { scale: 1 };
  };

  return (
    <Categories>
      {!!firstDataLength && (
        <CategoryBtn
          onClick={() => onCategoryClick(firstCategoryName)}
          animate={animated(firstCategoryName)}
          $selected={category === firstCategoryName}
        >
          <span>{firstCategoryName}</span>
        </CategoryBtn>
      )}
      {!!secondDataLength && (
        <CategoryBtn
          onClick={() => onCategoryClick("Similar")}
          animate={animated("Similar")}
          $selected={category === "Similar"}
        >
          <span>Similar</span>
        </CategoryBtn>
      )}
      {!!thirdDataLength && (
        <CategoryBtn
          onClick={() => onCategoryClick("Recommended")}
          animate={animated("Recommended")}
          $selected={category === "Recommended"}
        >
          <span>How about this?</span>
        </CategoryBtn>
      )}
    </Categories>
  );
};

const CategoryBtn = styled(motion.li)<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 700;
  height: 30px;
  cursor: pointer;
  color: ${(props) => (props.$selected ? props.theme.pink : "#888")};
`;

const Categories = styled(motion.ul)`
  display: flex;
  gap: 20px;
  margin-left: 5px;
`;

export default Category;
