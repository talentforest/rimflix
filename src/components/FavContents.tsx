import { useQuery } from "react-query";
import { getDetail, IDetail } from "../api/api";
import device from "../theme/mediaQueries";
import HoverBox from "./common/HoverBox";
import styled from "styled-components";
import Loading from "./common/Loading";

interface PropsType {
  favMovieId?: number;
  favTvId?: number;
}

const FavContents = ({ favMovieId, favTvId }: PropsType) => {
  const { data: detail, isLoading: detailIsLoading } = useQuery<IDetail>(
    ["detail", "movie", favMovieId],
    () => getDetail("movie", favMovieId),
    {
      enabled: Boolean(favMovieId),
    }
  );

  const { data: tvDetail, isLoading: tvDetailIsLoading } = useQuery<IDetail>(
    ["detail", "tv", favTvId],
    () => getDetail("tv", favTvId),
    {
      enabled: Boolean(favTvId),
    }
  );

  return detailIsLoading && tvDetailIsLoading ? (
    <Loading screenSize="part" />
  ) : (
    <Box>
      {tvDetail && (
        <HoverBox
          favTvId={true}
          contents={tvDetail}
          genres={tvDetail.genres.slice(0, 3)}
        />
      )}
      {detail && (
        <HoverBox
          favMovieId={true}
          contents={detail}
          genres={detail.genres.slice(0, 3)}
        />
      )}
    </Box>
  );
};

const Box = styled.div`
  position: relative;
  width: 140px;
  height: 200px;
  margin: 0 auto 30px;
  @media ${device.tablet} {
    width: 120px;
    height: 180px;
  }
  @media ${device.mobile} {
    width: 100px;
    height: 140px;
  }
`;

export default FavContents;
