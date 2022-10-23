import { useLocation } from "react-router-dom";

const useCategory = () => {
  const { pathname } = useLocation();

  const homePath = pathname === "/";
  const moviePath = pathname.includes("/movie");
  const tvPath = pathname.includes("/tv");
  const myListPath = pathname === "/myList";
  const searchPath = pathname.includes("search");

  return {
    homePath,
    moviePath,
    tvPath,
    myListPath,
    searchPath,
  };
};

export default useCategory;
