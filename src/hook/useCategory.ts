import { useState } from "react";

const useCategory = (categoryName: string) => {
  const [category, setCategory] = useState(categoryName);

  const onCategoryClick = (name: string) => {
    setCategory(name);
  };

  const animate = (name: string) => {
    return category === name ? { scale: 1.15, color: "#ffcccc" } : { scale: 1 };
  };

  return {
    category,
    setCategory,
    onCategoryClick,
    animate,
  };
};

export default useCategory;
