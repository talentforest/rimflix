import { IDetail } from "../api/api";
import HoverBox from "./common/HoverBox";
import useGenresQuery from "../hook/Query/useGenresQuery";

interface PropsType {
  contents: IDetail;
  searchId?: number;
}

const Contents = ({ contents, searchId }: PropsType) => {
  const { genre_ids, name } = contents;
  const { allGenres, allGenresLoading } = useGenresQuery(name ? "tv" : "movie");

  const contentsGenres = allGenres?.genres
    .filter((item) => genre_ids.includes(item.id))
    .slice(0, 3);

  return (
    !allGenresLoading && (
      <HoverBox
        contents={contents}
        genres={contentsGenres}
        searchId={searchId}
      />
    )
  );
};

export default Contents;
