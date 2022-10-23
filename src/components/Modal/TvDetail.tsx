import { IDetail } from "../../api/api";
import { Info } from "./Modal";
import { useState } from "react";
import Episodes from "./Detail/Episodes";
import Cast from "./Detail/Cast";
import useTvDetailQuery from "../../hook/useTvDetailQuery";
import AdditionalContents from "./Detail/AdditionalContents";
import Category from "./Detail/Category";
import Keywords from "./Detail/Keywords";

interface PropsType {
  detail: IDetail;
}

const TvDetail = ({ detail }: PropsType) => {
  const [category, setCategory] = useState(
    detail.seasons ? "Seasons" : "Similar"
  );
  const [seasonNumber, setSeasonNumber] = useState(detail.number_of_seasons);
  const { seasons, number_of_seasons } = detail;

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
      <Keywords keywords={keyword?.results} />
      <Cast cast={seasonCrew?.cast} />
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
