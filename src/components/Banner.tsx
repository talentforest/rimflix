import { Link } from "react-router-dom";
import { IDetail } from "../api/api";
import {
  backdropSizes,
  posterSizes,
  sizeImagePath,
} from "../utils/sizeImagePath";
import { Clear, Info, PlayCircle } from "@mui/icons-material";
import { Button } from "../theme/buttonStyle";
import device from "../theme/mediaQueries";
import styled from "styled-components";
import useGenresQuery from "../hook/query/useGenresQuery";
import { useState } from "react";
import VideoPlayer from "./common/VideoPlayer";

interface PropsType {
  data: IDetail;
}

const Banner = ({ data }: PropsType) => {
  const [play, setPlay] = useState(false);
  const { allGenres } = useGenresQuery(data?.name ? "tv" : "movie");
  const contentsGenres = allGenres?.genres
    ?.filter((item) => data?.genre_ids?.includes(item.id))
    .slice(0, 3);

  const onPlayClick = () => {
    setPlay((prev) => !prev);
  };

  return (
    data && (
      <Container>
        {!play ? (
          <>
            <Poster>
              <source
                srcSet={sizeImagePath(
                  backdropSizes.original,
                  data.backdrop_path
                )}
                media="(min-width: 768px)"
              />
              <img
                src={sizeImagePath(posterSizes.original, data.poster_path)}
                alt={`${data.title || data.name}poster`}
              />
            </Poster>
            <PosterInfo>
              <h1>{data.title || data.name}</h1>
              <Genres>
                {contentsGenres?.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </Genres>
              <p>{data.overview}</p>
              <>
                <Btns>
                  <Button onClick={onPlayClick} $color="pink">
                    Play Trailer <PlayCircle />
                  </Button>
                  <Button
                    as={Link}
                    to={data?.name ? `/tv/${data?.id}` : `/movie/${data?.id}`}
                  >
                    More Info <Info />
                  </Button>
                </Btns>
              </>
            </PosterInfo>
          </>
        ) : (
          <Video>
            <Clear onClick={onPlayClick} />
            <VideoPlayer
              videoId={data?.id}
              backdropPath={data?.backdrop_path}
              title={data?.title || data?.name}
            />
          </Video>
        )}
      </Container>
    )
  );
};

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 80vh;
  @media ${device.tablet} {
    height: 85vh;
  }
`;

const Video = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 50px 0 90px;
  > svg {
    cursor: pointer;
    z-index: 5;
    width: 30px;
    height: 30px;
    position: absolute;
    right: 20px;
    &:first-child {
      top: 16vh;
      border: 1px solid #aaa;
      border-radius: 50%;
      background-color: #333;
      padding: 2px;
    }
    &:last-child {
      top: 22vh;
    }
  }
  @media ${device.tablet} {
    > svg {
      width: 40px;
      height: 40px;
    }
  }
  @media ${device.desktop} {
    > svg {
      &:last-child {
        top: 25vh;
      }
    }
  }
`;

const Poster = styled.picture`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
`;

const PosterInfo = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    display: block;
    font-size: 30px;
    font-weight: 700;
    margin: 0 20px 10px;
    text-align: center;
  }
  p {
    display: none;
  }
  @media ${device.tablet} {
    padding-left: 3vw;
    h1 {
      font-size: 40px;
      margin-bottom: 15px;
    }
    p {
      display: block;
      font-size: 18px;
      line-height: 1.3;
      width: 70%;
      text-align: center;
    }
  }
  @media ${device.desktop} {
    align-items: flex-start;
    p {
      width: 60%;
      text-align: left;
    }
  }
`;

const Genres = styled.ul`
  display: flex;
  gap: 12px;
  @media ${device.tablet} {
    margin-bottom: 10px;
    font-size: 20px;
  }
`;

const Btns = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 30px;
`;

export default Banner;
