import { motion, useViewportScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { makeImagePath } from "../utils/makeImagePath";
import { ICollection, IDetail } from "../api/api";
import React, { useState } from "react";
import styled from "styled-components";
import device from "../theme/mediaQueries";
import VideoPlayer from "./VideoPlayer";
import RateBox from "./common/RateBox";
import InfoBox from "./common/InfoBox";
import FavoriteButton from "./common/FavoriteButton";
import Overlay from "./common/Overlay";

interface PropsType {
  movieId: string;
  isLoading: boolean;
  data: IDetail;
  collection?: ICollection;
  collectionIsLoading?: boolean;
}

const Detail = ({
  movieId,
  isLoading,
  data,
  collection,
  collectionIsLoading,
}: PropsType) => {
  const navigate = useNavigate();
  const [openFolder, setOpenFolder] = useState(false);
  const { scrollY } = useViewportScroll();

  const onOverlayClicked = () => {
    navigate(-1);
  };

  const openDetail = () => {
    setOpenFolder((prev) => !prev);
  };

  return (
    <>
      <Overlay onOverlayClicked={onOverlayClicked} />
      <ModalBox
        style={{ top: scrollY.get() + 100 }}
        layoutId={`${movieId}${uuidv4}`}
      >
        {!isLoading && !collectionIsLoading && data && (
          <>
            <VideoContainer>
              <VideoPlayer
                videoId={data.id}
                backdropPath={data.backdrop_path}
                posterPath={data.poster_path}
              />
            </VideoContainer>
            <DetailInfo>
              {data?.tagline ? <p>{data.tagline}</p> : <></>}
              <h3>{data?.title ? data.title : data?.name}</h3>
              <FavoriteButton />
              <Info>
                <h5>Genre :</h5>
                <Genres>
                  {data.genres.slice(0, 3).map((item) => (
                    <InfoBox key={item.id} info={item.name} />
                  ))}
                </Genres>
              </Info>
              <Info>
                <h5>
                  {data?.runtime ? "Running Time :" : "Episode Running Time : "}
                </h5>
                <InfoBox
                  info={`${
                    data?.runtime ? data.runtime : data?.episode_run_time[0]
                  } min`}
                />
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
                <SeasonInfo>
                  <h5>Movie Collection</h5>
                  <div>
                    <img
                      src={makeImagePath(
                        data?.belongs_to_collection?.poster_path
                      )}
                      alt="collection poster"
                    />
                    <div>
                      <h6>{collection.name}</h6>
                      <p>{collection.overview}</p>
                      {collection.parts.map((item) => (
                        <span key={item.id}>{item.title}</span>
                      ))}
                      <button onClick={openDetail}>More Details</button>
                    </div>
                  </div>
                </SeasonInfo>
              ) : null}
              {openFolder ? (
                <OpenDetails>
                  {collection?.parts.map((item) => (
                    <div key={item.id}>
                      <div>
                        <h6 key={item.id}>{item.original_title}</h6>
                        <p>{item.overview}</p>
                        <span>{item.release_date.split("-").join(".")}</span>
                        <RateBox rate={item.vote_average} />
                      </div>
                      <img
                        src={makeImagePath(item.poster_path)}
                        alt="collection poster"
                      />
                    </div>
                  ))}
                </OpenDetails>
              ) : (
                <></>
              )}
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
                          <p className="displayNone">{item.overview}</p>
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

const DetailInfo = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  h3 {
    color: ${(props) => props.theme.white.lighter};
    font-size: 40px;
    font-weight: 700;
    padding-bottom: 30px;
    display: block;
  }
  p {
    font-size: 20px;
    padding-bottom: 10px;
    color: ${(props) => props.theme.white.lighter};
  }
  @media ${device.tablet} {
    h3 {
      font-size: 32px;
    }
  }
  @media ${device.mobile} {
    top: -50px;
    h3 {
      font-size: 24px;
    }
    p {
      font-size: 14px;
    }
  }
`;

const OfficialPage = styled.a`
  padding: 10px 0;
  align-self: end;
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
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
  flex-wrap: wrap;
  gap: 5px;
`;

const SeasonInfo = styled.div`
  margin-top: 20px;
  h5 {
    font-size: 16px;
    color: #ffcccc;
    margin-bottom: 10px;
  }
  > div {
    margin-bottom: 10px;
    background-color: ${(props) => props.theme.black.lighter};
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: flex-start;
    > img {
      width: 100px;
      height: 140px;
      margin-right: 10px;
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h6 {
        font-size: 20px;
        margin-bottom: 15px;
      }
      p {
        font-size: 16px;
        margin-bottom: 10px;
      }
      span {
        font-size: 14px;
        color: #eee;
      }
      button {
        align-self: end;
        color: #fff;
        text-decoration: underline;
        background-color: transparent;
        border: none;
        cursor: pointer;
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
        h6 {
          font-size: 18px;
          margin-bottom: 10px;
          font-weight: 600;
        }
        p {
          font-size: 15px;
          &.displayNone {
            display: none;
          }
        }
        span {
          font-size: 16px;
          margin: 5px 0;
        }
      }
    }
  }
`;

const OpenDetails = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 5px;
  > div {
    display: flex;
    padding: 10px 0;
    margin: 0 10px;
    border-bottom: 1px solid #aaa;
    &:last-child {
      border-bottom: none;
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h6 {
        font-size: 18px;
        margin-bottom: 10px;
        font-weight: 600;
      }
      span {
        font-size: 16px;
      }
      p {
        font-size: 16px;
        margin-bottom: 10px;
      }
    }
    > img {
      width: 80px;
      height: 130px;
      margin-left: 10px;
    }
  }
`;

export default Detail;
