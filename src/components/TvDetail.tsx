import { IDetail } from "../api/api";
import { Info } from "./Modal";
import { useState } from "react";
import Episodes from "./modalDetail/Episodes";
import Cast from "./modalDetail/Cast";
import useTvDetailQuery from "../hook/query/useTvDetailQuery";
import AdditionalContents from "./modalDetail/AdditionalContents";
import Category from "./modalDetail/Category";
import Keywords from "./modalDetail/Keywords";

interface PropsType {
  detail: IDetail;
}

const TvDetail = ({ detail }: PropsType) => {
  const [category, setCategory] = useState(
    detail.seasons ? "Seasons" : "Similar"
  );
  const { seasons, number_of_seasons } = detail;
  const latestSeason = seasons[seasons.length - 1]?.season_number;
  const [seasonNumber, setSeasonNumber] = useState(latestSeason);

  const {
    recommendation,
    recommendationLoading,
    similar,
    similarLoading,
    seasonCrew,
    keyword,
  } = useTvDetailQuery(seasonNumber);

  return (
    <>
      {keyword?.results?.length !== 0 && (
        <Keywords keywords={keyword?.results} />
      )}
      {seasonCrew?.cast?.length !== 0 && <Cast cast={seasonCrew?.cast} />}
      {!recommendationLoading && !similarLoading && (
        <Info $column="column">
          <Category
            firstDataLength={Object.keys(seasons || {}).length}
            secondDataLength={similar?.results?.length}
            thirdDataLength={recommendation?.results?.length}
            category={category}
            setCategory={setCategory}
          />
          {category === "Seasons" && number_of_seasons && (
            <Episodes
              seasons={seasons}
              setSeasonNumber={setSeasonNumber}
              seasonNumber={seasonNumber}
            />
          )}
          {category === "Similar" && (
            <AdditionalContents data={similar.results.slice(0, 9)} />
          )}
          {category === "Recommended" && (
            <AdditionalContents data={recommendation.results.slice(0, 9)} />
          )}
        </Info>
      )}
    </>
  );
};

export default TvDetail;
