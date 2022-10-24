import { useLocation } from "react-router-dom";

const useFindPath = () => {
  const { pathname } = useLocation();

  const homePath = pathname === "/";
  const moviePath = pathname.includes("/movie"); // 영화 콘텐츠 모달
  const tvPath = pathname.includes("/tv"); // tv 콘텐츠 모달
  const myListPath = pathname.includes("/myList");
  const searchPath = pathname.includes("search");

  return {
    homePath,
    moviePath,
    tvPath,
    myListPath,
    searchPath,
  };
};

export default useFindPath;
