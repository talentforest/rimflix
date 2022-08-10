import { motion, useViewportScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { makeImagePath } from "../utils/makeImagePath";
import { IDetail } from "../api/api";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { myFavoriteMovieState, myFavoriteTvState } from "../data/atoms";
import styled from "styled-components";
import device from "../theme/mediaQueries";
import VideoPlayer from "./VideoPlayer";

interface PropsType {
  movieId: string;
  isLoading: boolean;
  data: IDetail;
}

const Detail = ({ movieId, isLoading, data }: PropsType) => {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [myFavoriteMovie, setMyFavoriteMovie] =
    useRecoilState(myFavoriteMovieState);
  const [myFavoriteTv, setMyFavoriteTv] = useRecoilState(myFavoriteTvState);
  const { scrollY } = useViewportScroll();

  const movieIdMatch = useMatch(`/movie/:movieId`)?.params.movieId;
  const searchIdMatch = useMatch(`/search/:movieId`)?.params.movieId;
  const tvIdMatch = useMatch(`/tv/:tvShowId`)?.params.tvShowId;

  useEffect(() => {
    if (myFavoriteMovie.includes(movieIdMatch)) return setLike(true);
    if (myFavoriteMovie.includes(searchIdMatch)) return setLike(true);
    if (myFavoriteTv.includes(tvIdMatch)) return setLike(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOverlayClicked = () => {
    navigate(-1);
  };

  const onAddClick = () => {
    setLike((prev) => !prev);
    if (movieIdMatch)
      return setMyFavoriteMovie((prev) => [...prev, movieIdMatch]);
    if (searchIdMatch)
      return setMyFavoriteMovie((prev) => [...prev, searchIdMatch]);
    if (tvIdMatch) return setMyFavoriteTv((prev) => [...prev, tvIdMatch]);
  };

  const onDeleteClick = () => {
    setLike((prev) => !prev);
    if (movieIdMatch) {
      setMyFavoriteMovie((prev) =>
        prev.filter((item) => item !== movieIdMatch)
      );
    }
    if (searchIdMatch) {
      setMyFavoriteMovie((prev) =>
        prev.filter((item) => item !== searchIdMatch)
      );
    }
    if (tvIdMatch)
      return setMyFavoriteTv((prev) =>
        prev.filter((item) => item !== tvIdMatch)
      );
  };

  return (
    <>
      <Overlay
        onClick={() => onOverlayClicked()}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <Modal
        style={{ top: scrollY.get() + 100 }}
        layoutId={`${movieId}${uuidv4}`}
      >
        {!isLoading && data && (
          <>
            <VideoContainer>
              <VideoPlayer
                videoId={data.id}
                mute={true}
                backdropPath={data.backdrop_path}
              />
            </VideoContainer>
            <DetailInfo>
              {data?.tagline ? <Tagline>{data?.tagline}</Tagline> : <></>}
              <BigTitle>{data?.title ? data.title : data?.name}</BigTitle>
              {like ? (
                <MyFavarite onClick={onDeleteClick}>
                  <span>My Favorite</span>
                  <Favorite />
                </MyFavarite>
              ) : (
                <MyFavarite onClick={onAddClick}>
                  <span>Add My Favorite</span>
                  <FavoriteBorder />
                </MyFavarite>
              )}
              <Info>
                <h5>Genre :</h5>
                <Genres>
                  {data.genres.slice(0, 3).map((item) => (
                    <span key={item.id}>{item.name}</span>
                  ))}
                </Genres>
              </Info>
              <Info>
                <h5>
                  {data?.runtime ? "Running Time :" : "Episode Running Time : "}
                </h5>
                <span>
                  {data?.runtime ? data?.runtime : data?.episode_run_time[0]}
                  min
                </span>
              </Info>
              <Info $column="column">
                <h5>Overview</h5>
                <p>{data?.overview}</p>
              </Info>
              {data.homepage ? (
                <OfficialPage
                  href={`${data.homepage}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Go Official Page
                </OfficialPage>
              ) : (
                <></>
              )}
              {data?.belongs_to_collection ? (
                <Info $column="column">
                  <h5>Movie Collection</h5>
                  <img
                    src={makeImagePath(
                      data?.belongs_to_collection?.poster_path
                    )}
                    alt="collection poster"
                  />
                </Info>
              ) : null}
              {data?.number_of_seasons ? (
                <SeasonInfo>
                  {data?.seasons.map((item) => (
                    <React.Fragment key={item.id}>
                      <h5>{item.name}</h5>
                      <div>
                        {item.poster_path ? (
                          <img
                            src={makeImagePath(item.poster_path)}
                            alt="season poster"
                          />
                        ) : (
                          <img
                            src={makeImagePath(data.poster_path)}
                            alt="season poster"
                          />
                        )}
                        <div>
                          <p>{item.overview}</p>
                          <span>Episodes: {item.episode_count}</span>
                          <span>
                            Air Date: {item.air_date?.split("-").join(".")}
                          </span>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </SeasonInfo>
              ) : (
                <></>
              )}
            </DetailInfo>
          </>
        )}
      </Modal>
    </>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  z-index: 2;
`;

const Modal = styled(motion.div)`
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

const VideoContainer = styled.div`
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

const MyFavarite = styled(motion.button)`
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 5px;
  border: 1px solid #aaa;
  color: #333;
  background-color: #ffaa9f;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 4px 8px;
  font-weight: 700;
  > svg {
    height: 20px;
    width: 20px;
    margin-left: 5px;
    fill: #ff0000;
  }
`;

const DetailInfo = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  @media ${device.mobile} {
    top: -50px;
  }
`;

const OfficialPage = styled.a`
  padding: 10px 0;
  align-self: end;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 40px;
  font-weight: 700;
  padding-bottom: 30px;
  display: block;
  @media ${device.tablet} {
    font-size: 32px;
  }
  @media ${device.mobile} {
    font-size: 24px;
  }
`;

const Tagline = styled.p`
  font-size: 20px;
  padding-bottom: 10px;
  color: ${(props) => props.theme.white.lighter};
  @media ${device.mobile} {
    font-size: 14px;
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
  > span {
    border: 1px solid #aaa;
    font-size: 14px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.black.lighter};
    padding: 5px 8px;
  }
  > p {
    margin-top: 5px;
  }
  > img {
    width: 160px;
    height: 240px;
    margin: 10px 0;
  }
  @media ${device.mobile} {
    > img {
      width: 120px;
      height: 180px;
      margin: 10px 0;
    }
  }
`;

const Genres = styled.div`
  display: flex;
  gap: 5px;
  span {
    border: 1px solid #aaa;
    font-size: 14px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.black.lighter};
    padding: 5px 8px;
    color: #fff;
  }
`;

const SeasonInfo = styled.div`
  margin-top: 20px;
  h5 {
    font-size: 20px;
    margin-bottom: 10px;
  }
  > div {
    margin-bottom: 30px;
    background-color: ${(props) => props.theme.black.lighter};
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    > img {
      width: 100px;
      height: 140px;
      margin-right: 10px;
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        font-size: 16px;
        margin-bottom: 10px;
      }
      span {
        font-size: 14px;
        color: #eee;
      }
    }
  }
  @media ${device.mobile} {
    > div {
      align-items: flex-start;
      > img {
        width: 80px;
        height: 120px;
      }
      > div {
        p {
          display: none;
        }
        span {
          font-size: 16px;
          margin: 5px 0;
        }
      }
    }
  }
`;

export default Detail;
