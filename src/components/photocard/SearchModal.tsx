import Overlay from '../common/Overlay';
import { v4 as uuidv4 } from 'uuid';
import { ModalBox } from '../Modal';
import { Search } from '@mui/icons-material';
import { posterSizes, sizeImagePath } from '../../utils/sizeImagePath';
import { FormEvent, useRef, useState } from 'react';
import useSearchQuery from '../../hook/query/useSearchQuery';
import { useViewportScroll } from 'framer-motion';
import styled from 'styled-components';

interface ISearchModal {
  toggleModal: () => void;
  onPosterChange: (poster: string, title: string) => void;
}

const SearchModal = ({ toggleModal, onPosterChange }: ISearchModal) => {
  const [keyword, setKeyword] = useState('');
  const { scrollY } = useViewportScroll();
  const { searchMovies, searchMoviesLoading } = useSearchQuery(keyword);
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeywordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword(inputRef.current.value);
  };

  return (
    <>
      <Overlay onCloseClick={toggleModal} />
      <ModalBox style={{ top: scrollY.get() + 85 }} layoutId={`${uuidv4}`}>
        <ModalTitle>Add Movie Poster</ModalTitle>
        <ModalDetail>
          <Form onSubmit={onKeywordSubmit}>
            <ModalInput
              ref={inputRef}
              type='text'
              placeholder='Find a movie poster'
            />
            <Search />
          </Form>
          <ListBox>
            <span>
              Result{' '}
              {!!searchMovies?.results?.length
                ? searchMovies?.results?.length
                : 0}
            </span>
            {!searchMoviesLoading && (
              <List>
                {searchMovies?.results?.map((movie) => (
                  <li
                    key={movie.id}
                    onClick={() =>
                      onPosterChange(movie.poster_path, movie.title)
                    }
                  >
                    <img
                      src={sizeImagePath(posterSizes.w500, movie.poster_path)}
                      alt={`${movie.title} poster`}
                    />
                  </li>
                ))}
              </List>
            )}
          </ListBox>
        </ModalDetail>
      </ModalBox>
    </>
  );
};

const ModalTitle = styled.h1`
  width: 100%;
  margin: 20px 0;
  text-align: center;
`;
const ModalDetail = styled.section`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px auto;
`;
const Form = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  svg {
    position: absolute;
    width: 40px;
    height: 40px;
    padding: 8px;
    fill: ${({ theme }) => theme.black.lighter};
    top: 0;
    bottom: 0;
    right: 0;
    cursor: pointer;
  }
`;
const ModalInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border-radius: 5px;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;
const ListBox = styled.div`
  margin-top: 10px;
  span {
    font-size: 14px;
  }
`;
const List = styled.ul`
  width: 100%;
  min-height: 50vh;
  margin: 10px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  li {
    font-size: 12px;
    color: white;
    width: 100%;
    border-radius: 5px;
    cursor: pointer;
    img {
      border-radius: 5px;
      width: 100%;
    }
  }
`;

export default SearchModal;
