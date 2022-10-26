import { Info } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IMyList } from "../data/myListAtoms";
import { posterSizes, sizeImagePath } from "../utils/sizeImagePath";
import MyListButton from "./common/MyListButton";
import styled from "styled-components";
import { infoVariants, smallVariants } from "../utils/variants";
import device, { deviceSizes } from "../theme/mediaQueries";
import useWindowSize from "../hook/useWindowSize";

interface IMyListContents {
  category: string;
  myList: IMyList;
}

const MyListContents = ({ category, myList }: IMyListContents) => {
  const {
    windowSize: { width },
  } = useWindowSize();
  const navigate = useNavigate();

  const onNavigateClick = (category: string, id: number) => {
    navigate(`${category}/${id}`);
  };

  const contentInfo = {
    category: category,
    id: myList.id,
    imgPath: myList.imgPath,
  };

  return (
    <Contents
      key={myList.id}
      variants={smallVariants}
      whileHover="hover"
      initial="normal"
    >
      <img src={sizeImagePath(posterSizes.w342, myList.imgPath)} alt="poster" />
      {width >= +deviceSizes.tablet ? (
        <InfoBox variants={infoVariants}>
          <button>
            <Info onClick={() => onNavigateClick(category, myList.id)} />
          </button>
          <MyListButton contentInfo={contentInfo} simpleBtn={true} />
          <div>
            <span>Date Added</span>
            <span>{myList.date}</span>
          </div>
        </InfoBox>
      ) : (
        <NavigateBtn
          onClick={() => onNavigateClick(category, myList.id)}
        ></NavigateBtn>
      )}
    </Contents>
  );
};

const NavigateBtn = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border: none;
  background-color: transparent;
`;

const Contents = styled(motion.div)`
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;

const InfoBox = styled(motion.div)`
  display: none;
  @media ${device.tablet} {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    > button {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 2px solid ${(props) => props.theme.black.lighter};
      background-color: ${(props) => props.theme.black.darker};
      svg {
        fill: ${(props) => props.theme.white.lighter};
      }
      &:first-child {
        svg {
          fill: ${(props) => props.theme.red};
        }
      }
    }
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        font-size: 14px;
        &:first-child {
          color: ${(props) => props.theme.white.darker};
          font-size: 12px;
        }
      }
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
  }
`;

export default MyListContents;
