import { motion, useViewportScroll } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getCollection, IDetail } from "../../api/api";
import { convertRunningTime } from "../../utils/convertRunningTime";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { searchState } from "../../data/atoms";
import { AccessTime } from "@mui/icons-material";
import styled from "styled-components";
import device from "../../theme/mediaQueries";
import VideoPlayer from "../common/VideoPlayer";
import InfoBox from "../common/InfoBox";
import FavoriteButton from "../common/FavoriteButton";
import Overlay from "../common/Overlay";
import Collection from "./Detail/Collection";
import Episodes from "./Detail/Episodes";
import LinkButton from "./Detail/LinkButton";
import Seasons from "./Detail/Seasons";
import RateBox from "../common/RateBox";

interface PropsType {
  detail: IDetail;
}

const Detail = ({ detail }: PropsType) => {
  const searchQuery = useRecoilValue(searchState);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { data: collection, isLoading: collectionIsLoading } = useQuery<any>(
    ["details", "collection"],
    () => getCollection(detail.belongs_to_collection.id),
    {
      enabled: Boolean(detail.belongs_to_collection?.id),
    }
  );

  const { scrollY } = useViewportScroll();

  const onOverlayClicked = () => {
    if (pathname.includes("search")) {
      return navigate(`/search/${searchQuery}`);
    }
    if (pathname.includes("myFavorite")) {
      return navigate("/myFavorite");
    }
    if (pathname.includes("movie")) {
      return navigate("/");
    }
    if (pathname.includes("tv")) {
      return navigate("/tv");
    }
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
    vote_average,
  } = detail;

  const exceptCurrentSeason = seasons?.filter(
    (season) => season.season_number !== detail.number_of_seasons
  );

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
          {genres?.length !== 0 && (
            <Info>
              <Genres>
                {genres?.map((item) => (
                  <InfoBox key={item.id} info={item.name} />
                ))}
              </Genres>
            </Info>
          )}
          <RateBox detail={true} rate={vote_average} />
          {(runtime || runtime === 0) && (
            <Info>
              {runtime ? (
                <>
                  <AccessTime />
                  <span>{`${convertRunningTime(runtime)}`}</span>
                </>
              ) : (
                <span>There is no informationsss</span>
              )}
            </Info>
          )}
          {episode_run_time && (
            <Info>
              {Boolean(episode_run_time?.length) ? (
                <>
                  <AccessTime />
                  <span>{`${convertRunningTime(episode_run_time[0])}`}</span>
                </>
              ) : (
                <span>There is no information</span>
              )}
            </Info>
          )}
          <Info $column="column">
            <h5>Overview</h5>
            <p>{overview || "There is no information"}</p>
            {number_of_seasons && (
              <Episodes
                seasonNumber={number_of_seasons}
                officialPosterPath={poster_path}
              />
            )}
          </Info>
          {exceptCurrentSeason && exceptCurrentSeason?.length !== 0 && (
            <Info $column="column">
              <h5>See Other Seasons</h5>
              <Seasons
                seasons={exceptCurrentSeason}
                officialPosterPath={poster_path}
              />
            </Info>
          )}
          {belongs_to_collection && !collectionIsLoading && (
            <Info $column="column">
              <Collection collection={collection} />
            </Info>
          )}
          {homepage && (
            <LinkButton
              homepage={detail.homepage}
              contents="Official Homepage"
            />
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
  background-color: ${(props) => props.theme.black.darker};
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
  margin-bottom: ${(props) => (props.$column ? "25px" : "15px")};
  align-items: ${(props) => (props.$column ? "flex-start" : "center")};
  > h5 {
    font-size: 16px;
    margin-bottom: ${(props) => (props.$column ? "5px" : "0")};
    margin-right: 5px;
    color: #ffcccc;
    width: max-content;
  }
  > p {
    font-size: 16px;
  }
  > img {
    width: 160px;
    height: 240px;
    margin: 10px 0;
  }
  > svg {
    width: 16px;
    height: 16px;
    margin-right: 3px;
  }
  @media ${device.mobile} {
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
