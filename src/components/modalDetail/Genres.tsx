import styled from "styled-components";
import { IGenres } from "../../api/api";

interface IGenresProps {
  genres: IGenres[];
}

const Genres = ({ genres }: IGenresProps) => {
  return (
    <>
      {genres?.length !== 0 && (
        <Genre>
          {genres?.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </Genre>
      )}
    </>
  );
};

const Genre = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 10px;
  li {
    margin-left: 20px;
    list-style: square;
    &:first-child {
      margin: 0;
      list-style: none;
    }
  }
`;

export default Genres;
