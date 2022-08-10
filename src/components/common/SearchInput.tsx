import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import device from "../../theme/mediaQueries";
import Overlay from "./Overlay";

const SearchInput = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchName, setSearchName] = useState("");

  const navigate = useNavigate();
  const inputAnimation = useAnimation();

  const onOverlayClicked = () => {
    setSearchOpen((prev) => !prev);
    inputAnimation.start({ scaleX: 0 });
  };

  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({ scaleX: 1.0 });
    }
    setSearchOpen((prev) => !prev);
  };

  const onSearchWordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchName(event.currentTarget.value);
  };

  const handleSearchWordSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?keyword=${searchName}`);
    inputAnimation.start({ scaleX: 0 });
    setSearchOpen(false);
    setSearchName("");
  };

  return (
    <>
      {searchOpen ? <Overlay onOverlayClicked={onOverlayClicked} /> : <></>}
      <Box onSubmit={handleSearchWordSubmit}>
        <motion.svg
          onClick={toggleSearch}
          animate={{ x: searchOpen ? -230 : 0, scale: searchOpen ? 0.7 : 1 }}
          transition={{ type: "linear" }}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </motion.svg>
        <Input
          transition={{ type: "linear" }}
          animate={inputAnimation}
          initial={{ scaleX: 0 }}
          placeholder="Search for your movies..."
          value={searchName}
          onChange={onSearchWordChange}
        />
      </Box>
    </>
  );
};

const Box = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  svg {
    height: 26px;
    z-index: 2;
    cursor: pointer;
    margin-top: 2px;
  }
  @media ${device.mobile} {
    width: 20px;
    height: 20px;
  }
`;

const Input = styled(motion.input)`
  display: flex;
  align-items: center;
  transform-origin: right center;
  position: absolute;
  right: 0;
  padding: 5px 5px 5px 30px;
  z-index: 1;
  color: white;
  font-size: 16px;
  background-color: #000;
  border: 1px solid ${(props) => props.theme.white.lighter};
  border-radius: 3px;
  width: 260px;
  height: 40px;
  &::placeholder {
    font-size: 14px;
  }
  &:focus {
    outline: none;
  }
  @media ${device.mobile} {
    height: 30px;
  }
`;

export default SearchInput;
