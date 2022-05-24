import { Link } from "react-router-dom";
import styled from "styled-components";
import { IGetMovieTvResult } from "../api/api";
import { makeImagePath } from "../utils/makeImagePath";

interface PropsType {
  data?: IGetMovieTvResult;
}

const Banner = ({ data }: PropsType) => {
  return (
    <>
      {data ? (
        <Container
          $bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}
        >
          {data.results[0].title ? (
            <Title>{data?.results[0].title}</Title>
          ) : (
            <Title>{data?.results[0].name}</Title>
          )}
          <Overview>{data?.results[0].overview}</Overview>
          {/* <Link to={`${data?.results[0].id}`}> */}
          <InfoButton>More Info</InfoButton>
          {/* </Link> */}
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div<{ $bgPhoto: string }>`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 60px 0px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
  color: #fff;
  > a {
    margin-top: 20px;
    width: fit-content;
    height: fit-content;
  }
`;

const InfoButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  width: fit-content;
  height: 35px;
  font-size: 18px;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
  width: 55%;
`;

export default Banner;
