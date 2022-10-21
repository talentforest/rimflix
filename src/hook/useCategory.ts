import { useState } from "react";

const useCategory = (name: string) => {
  const [category, setCategory] = useState(name);

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
