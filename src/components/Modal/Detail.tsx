import { motion, useViewportScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getCollection, IDetail } from "../../api/api";
import { convertRunningTime } from "../../utils/convertRunningTime";
import { useQuery } from "react-query";
import styled from "styled-components";
import device from "../../theme/mediaQueries";
import VideoPlayer from "../common/VideoPlayer";
import InfoBox from "../common/InfoBox";
import FavoriteButton from "../common/FavoriteButton";
import Overlay from "../common/Overlay";
import Collection from "./Detail/Collection";
import Seasons from "./Detail/Seasons";
import LinkButton from "./Detail/LinkButton";

interface PropsType {
  detail: IDetail;
}

const Detail = ({ detail }: PropsType) => {
  const { data: collection, isLoading: collectionIsLoading } = useQuery<any>(
    ["details", "collection"],
    () => getCollection(detail.belongs_to_collection.id),
    {
      enabled: Boolean(detail.belongs_to_collection?.id),
    }
  );

  const navigate = useNavigate();
  const { scrollY } = useViewportScroll();

  const onOverlayClicked = () => {
    navigate(-1);
  };

  const {
    id,
    backdrop_path,
    poster_path,
    title,
    name,
    tagline,
    overview,
    genres,
    episode_run_time,
    runtime,
    homepage,
    number_of_seasons,
    seasons,
    belongs_to_collection,
  } = detail;

  return (
    <>
      <Overlay onOverlayClicked={onOverlayClicked} />
      <ModalBox
        style={{ top: scrollY.get() + 100 }}
        layoutId={`${detail?.id}${uuidv4}`}
      >
        <VideoContainer>
          <VideoPlayer
            videoId={id}
            backdropPath={backdrop_path}
            posterPath={poster_path}
          />
        </VideoContainer>
        <AllDetail>
          <p>{tagline}</p>
          <h3>{title || name}</h3>
          <FavoriteButton contentsId={id} />
          <Info>
            <h5>Genre :</h5>
            <Genres>
              {genres.length !== 0 ? (
                genres
                  .slice(0, 3)
                  .map((item) => <InfoBox key={item.id} info={item.name} />)
              ) : (
                <p>There is no information.</p>
              )}
            </Genres>
          </Info>
          <Info>
            {(runtime || runtime === 0) && (
              <>
                <h5>Running Time : </h5>
                {runtime ? (
                  <InfoBox info={`${convertRunningTime(runtime)}`} />
                ) : (
                  <span>There is no information</span>
                )}
              </>
            )}
            {episode_run_time && (
              <>
                <h5>Episode Running Time : </h5>
                {Boolean(episode_run_time.length) ? (
                  <InfoBox
                    info={`${convertRunningTime(episode_run_time[0])}`}
                  />
                ) : (
                  <span>There is no information</span>
                )}
              </>
            )}
          </Info>
          <Info $column="column">
            <h5>Overview</h5>
            <p>{overview || "There is no information"}</p>
          </Info>
          {homepage && (
            <LinkButton
              homepage={detail.homepage}
              contents="Official Homepage"
            />
          )}
          {number_of_seasons && (
            <Info $column="column">
              <h5>{seasons.length > 1 ? "Seasons" : "Season"}</h5>
              <Seasons seasons={seasons} officialPosterPath={poster_path} />
            </Info>
          )}
          {belongs_to_collection && !collectionIsLoading && (
            <Info $column="column">
              <h5>Movie Collection</h5>
              <Collection
                officialPoster={detail.poster_path || detail.backdrop_path}
                posterPath={detail.belongs_to_collection.poster_path}
                collection={collection}
              />
            </Info>
          )}
        </AllDetail>
      </ModalBox>
    </>
  );
};

const ModalBox = styled(motion.div)`
  z-index: 3;
  width: 50vw;
  position: absolute;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  background-color: ${(props) => props.theme.black.darker};
  &::-webkit-scrollbar {
    display: none;
  }
  @media ${device.tablet} {
    width: 70vw;
  }
  @media ${device.mobile} {
    width: 90vw;
  }
`;

const VideoContainer = styled.section`
  position: relative;
  width: 100%;
  height: 330px;
  svg {
    width: 40px;
    height: 40px;
  }
  @media ${device.mobile} {
    height: 230px;
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

const AllDetail = styled.section`
  padding: 20px;
  display: flex;
  flex-direction: column;
  > h3 {
    color: ${(props) => props.theme.white.lighter};
    font-size: 40px;
    font-weight: 700;
    padding-bottom: 30px;
    display: block;
  }
  > p {
    font-size: 20px;
    padding-bottom: 10px;
    color: ${(props) => props.theme.white.lighter};
  }
  @media ${device.tablet} {
    > h3 {
      font-size: 32px;
    }
  }
  @media ${device.mobile} {
    top: -50px;
    > h3 {
      font-size: 24px;
    }
    > p {
      font-size: 14px;
    }
  }
`;

const Info = styled.div<{ $column?: string }>`
  display: flex;
  flex-direction: ${(props) => (props.$column ? "column" : "row")};
  margin-bottom: 10px;
  align-items: ${(props) => (props.$column ? "flex-start" : "center")};
  > h5 {
    font-size: 16px;
    margin-right: 5px;
    color: #ffcccc;
    width: max-content;
  }
  > p {
    margin-top: 5px;
    font-size: 16px;
  }
  > img {
    width: 160px;
    height: 240px;
    margin: 10px 0;
  }
  @media ${device.mobile} {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 16px;
    > h5 {
      margin-bottom: 5px;
    }
    > p {
      margin-top: 0;
    }
    > img {
      width: 120px;
      height: 180px;
      margin: 10px 0;
    }
  }
`;

const Genres = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

export default Detail;