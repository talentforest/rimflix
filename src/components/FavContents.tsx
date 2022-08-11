import { useQuery } from "react-query";
import { getDetail, IDetail } from "../api/api";
import device from "../theme/mediaQueries";
import HoverBox from "./common/HoverBox";
import styled from "styled-components";

interface PropsType {
  movieId?: string;
  tvId?: string;
}

const FavContents = ({ movieId, tvId }: PropsType) => {
  const { data: detail, isLoading: detailIsLoading } = useQuery<IDetail>(
    ["detail", `detail_${movieId}`],
    () => getDetail("movie", movieId),
    {
      enabled: Boolean(movieId),
    }
  );

  const { data: tvDetail, isLoading: tvDetailIsLoading } = useQuery<IDetail>(
    ["detail", `detail_${tvId}`],
    () => getDetail("tv", tvId),
    {
      enabled: Boolean(tvId),
    }
  );

  return detailIsLoading && tvDetailIsLoading ? (
    <div>Loading...</div>
  ) : (
    <Box>
      {tvDetail && (
        <HoverBox
          tvId={true}
          id={tvDetail.id}
          poster={tvDetail.poster_path}
          backdrop={tvDetail.backdrop_path}
          title={tvDetail.name}
          firstDate={tvDetail.first_air_date}
          rate={tvDetail.vote_average}
          genreNames={tvDetail.genres.slice(0, 3)}
        />
      )}
      {detail && (
        <HoverBox
          movieId={true}
          id={detail?.id}
          poster={detail?.poster_path}
          backdrop={detail?.backdrop_path}
          title={detail?.title}
          firstDate={detail?.release_date}
          rate={detail?.vote_average}
          genreNames={detail.genres.slice(0, 3)}
        />
      )}
    </Box>
  );
};

const Box = styled.div`
  position: relative;
  width: 250px;
  height: 180px;
  margin-bottom: 30px;
  @media ${device.tablet} {
    width: 180px;
    height: 250px;
  }
  @media ${device.mobile} {
    width: 120px;
    height: 180px;
  }
`;

export default FavContents;
