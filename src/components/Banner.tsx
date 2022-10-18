import { Link, useLocation } from "react-router-dom";
import { IDetail } from "../api/api";
import {
  backdropSizes,
  posterSizes,
  sizeImagePath,
} from "../utils/sizeImagePath";
import { Info } from "@mui/icons-material";
import device from "../theme/mediaQueries";
import styled from "styled-components";
import useGenresQuery from "../hook/useGenresQuery";
import FavoriteButton from "./common/FavoriteButton";
import { Button } from "../theme/buttonStyle";

interface PropsType {
  data: IDetail;
}

const Banner = ({ data }: PropsType) => {
  const { pathname } = useLocation();
  const correctPathModal =
    pathname === "/tv" ? `/tv/${data?.id}` : `/movie/${data?.id}`;

  const genreList = useGenresQuery().data?.genres;
  const contentsGenres = genreList
    ?.filter((item) => data.genre_ids.includes(item.id))
    .slice(0, 3);

  return (
    data && (
      <Container>
        <Poster>
          <source
            srcSet={sizeImagePath(backdropSizes.original, data.backdrop_path)}
            media="(min-width: 1024px)"
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
          <Btns>
            <FavoriteButton contentsId={data.id} />
            <Button as={Link} to={correctPathModal}>
              More Info <Info />
            </Button>
          </Btns>
        </PosterInfo>
      </Container>
    )
  );
};

const Container = styled.section`
  height: 80vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  h1 {
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  p {
    display: none;
  }
  @media ${device.tablet} {
    h1 {
      font-size: 40px;
      margin-bottom: 15px;
    }
    p {
      display: block;
      width: 70%;
      font-size: 18px;
      line-height: 1.3;
      text-align: center;
    }
  }
  @media ${device.desktop} {
    align-items: flex-start;
    padding-left: 50px;
    margin-top: 10px;
    p {
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
