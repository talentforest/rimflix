import { useContext } from 'react';
import { useQuery } from 'react-query';
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMovieTvResult,
} from '../../api/api';
import { LanguageContext } from '../../context/LanguageContext';
import useFindPath from '../useFindPath';

const useMovieListsQuery = () => {
  const { language } = useContext(LanguageContext);
  const { homePath } = useFindPath();

  const nowPlaying = useQuery<IGetMovieTvResult>(
    ['movies', 'nowPlaying', language],
    () => getNowPlayingMovies(language),
    {
      enabled: homePath,
    }
  );

  const topRated = useQuery<IGetMovieTvResult>(
    ['movies', 'topRated', language],
    () => getTopRatedMovies(language),
    {
      enabled: homePath,
    }
  );

  const upcoming = useQuery<IGetMovieTvResult>(
    ['movies', 'upcoming', language],
    () => getUpcomingMovies(language),
    {
      enabled: homePath,
    }
  );

  const popular = useQuery<IGetMovieTvResult>(
    ['movies', 'popular', language],
    () => getPopularMovies(language),
    {
      enabled: homePath,
    }
  );

  return {
    nowPlaying,
    topRated,
    upcoming,
    popular,
  };
};

export default useMovieListsQuery;
