import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IDetail } from "../../api/api";
import { changeDateSeperator } from "../../utils/changeDateSeperator";
import { posterSizes, sizeImagePath } from "../../utils/sizeImagePath";
import Rate from "../common/Rate";
import styled from "styled-components";
import device from "../../theme/mediaQueries";
import useFindPath from "../../hook/useFindPath";
import { infoVariants, smallVariants } from "../../utils/variants";

interface PropsType {
  data: IDetail[];
}

const AdditionalContents = ({ data }: PropsType) => {
  const navigate = useNavigate();
  const { moviePath, myListPath, tvPath } = useFindPath();

  const onNavigateClick = (id: number) => {
    if (myListPath && moviePath) return navigate(`/myList/movie/${id}`);
    if (myListPath && tvPath) return navigate(`/myList/tv/${id}`);
    if (moviePath) return navigate(`/movie/${id}`);
    navigate(`/tv/${id}`);
  };

  return (
    <List>
      {data?.map(
        (item) =>
          item.poster_path && (
            <Contents
              onClick={() => onNavigateClick(item.id)}
              key={item.id}
              variants={smallVariants}
              whileHover="hover"
              initial="normal"
              transition={{ type: "tween" }}
            >
              <img
                src={sizeImagePath(posterSizes.w342, item.poster_path)}
                alt={`${item.name || item.title} poster`}
                loading="lazy"
              />
              <ContentsInfo variants={infoVariants}>
                <div>
                  <h5>{item.name || item.title}</h5>
                  <Rate detail={true} rate={item.vote_average} />
                  <span>
                    {changeDateSeperator(
                      item.first_air_date || item.release_date
                    )}
                  </span>
                </div>
              </ContentsInfo>
            </Contents>
          )
      )}
    </List>
  );
};

const List = styled.ul`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  margin-top: 5px;
  min-height: 10vh;
  @media ${device.tablet} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${device.desktop} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const Contents = styled(motion.li)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  width: 100%;
  cursor: pointer;
  &:hover {
    background-color: #444;
    border-radius: 5px;
  }
  img {
    border-radius: 5px;
    width: 100%;
    height: 100%;
  }
`;

const ContentsInfo = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  > div {
    padding: 10px 5px;
    min-height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    h5 {
      font-size: 14px;
      text-align: center;
    }
    span {
      font-size: 12px;
    }
  }

  @media ${device.tablet} {
    > div {
      padding: 15px 5px;
    }
    h5 {
      font-size: 18px;
    }
    span {
      font-size: 16px;
    }
  }
`;

export default AdditionalContents;
