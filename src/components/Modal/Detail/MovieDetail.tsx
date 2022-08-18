import { getCollection, ICollection, IDetail } from "../../../api/api";
import { useQuery } from "react-query";
import { convertRunningTime } from "../../../utils/convertRunningTime";
import { AccessTime } from "@mui/icons-material";
import { Genres, Info, RateTime } from "./TvDetail";
import FavoriteButton from "../../common/FavoriteButton";
import InfoBox from "../../common/InfoBox";
import RateBox from "../../common/RateBox";
import LinkButton from "./LinkButton";
import Collection from "./Collection";

interface PropsType {
  detail: IDetail;
}

const MovieDetail = ({ detail }: PropsType) => {
  const { data: collection, isLoading: collectionIsLoading } =
    useQuery<ICollection>(
      ["details", "collection"],
      () => getCollection(detail.belongs_to_collection.id),
      {
        enabled: Boolean(detail?.belongs_to_collection?.id),
      }
    );

  const {
    id,
    poster_path,
    title,
    tagline,
    overview,
    genres,
    runtime,
    homepage,
    belongs_to_collection,
    vote_average,
  } = detail;

  return (
    <>
      {!collectionIsLoading && (
        <>
          <p>{tagline}</p>
          <h3>{title}</h3>
          {genres?.length !== 0 && (
            <Info>
              <Genres>
                {genres?.map((item) => (
                  <InfoBox key={item.id} info={item.name} />
                ))}
              </Genres>
            </Info>
          )}
          <FavoriteButton contentsId={id} />
          <RateTime>
            <RateBox detail={true} rate={vote_average} />
            {(runtime || runtime === 0) && (
              <>
                {runtime ? (
                  <div>
                    <AccessTime />
                    <span>{`${convertRunningTime(runtime)}`}</span>
                  </div>
                ) : (
                  <span>There is no informationsss</span>
                )}
              </>
            )}
          </RateTime>
          <Info $column="column">
            <h5>Overview</h5>
            <p>{overview || "There is no information"}</p>
          </Info>
          {belongs_to_collection && (
            <Info $column="column">
              <Collection
                collection={collection}
                officailPoster={poster_path}
              />
            </Info>
          )}
          {homepage && (
            <LinkButton
              homepage={detail.homepage}
              contents="Official Homepage"
            />
          )}
        </>
      )}
    </>
  );
};

export default MovieDetail;
