import { IDetail } from '../api/api';
import { Info } from './Modal';
import { useState } from 'react';
import Cast from './modalDetail/Cast';
import useMovieDetailQuery from '../hook/query/useMovieDetailQuery';
import AdditionalContents from './modalDetail/AdditionalContents';
import Category from './modalDetail/Category';
import styled from 'styled-components';

interface PropsType {
  detail: IDetail;
}

const MovieDetail = ({ detail }: PropsType) => {
  const { belongs_to_collection } = detail;
  const [category, setCategory] = useState(
    belongs_to_collection ? 'Collection' : 'Similar'
  );

  const {
    collection,
    collectionIsLoading,
    recommendation,
    recommendationLoading,
    similar,
    similarLoading,
    crew,
  } = useMovieDetailQuery(detail);

  return (
    <>
      {crew?.cast?.length !== 0 && <Cast cast={crew?.cast} />}
      {!recommendationLoading && !similarLoading && !collectionIsLoading && (
        <Info $column='column'>
          <Category
            firstDataLength={Object.keys(belongs_to_collection ?? {})?.length}
            secondDataLength={similar?.results?.length ?? 0}
            thirdDataLength={recommendation?.results?.length ?? 0}
            category={category}
            setCategory={setCategory}
          />
          <List>
            {category === 'Collection' && belongs_to_collection && (
              <AdditionalContents data={collection.parts} />
            )}
            {category === 'Similar' && similar && (
              <AdditionalContents data={similar.results.slice(0, 9)} />
            )}
            {category === 'Recommended' && recommendation && (
              <AdditionalContents data={recommendation.results.slice(0, 9)} />
            )}
          </List>
        </Info>
      )}
    </>
  );
};

const List = styled.div`
  min-height: 20vh;
  width: 100%;
`;

export default MovieDetail;
