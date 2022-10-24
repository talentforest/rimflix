import { Search } from "@mui/icons-material";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import device from "../../theme/mediaQueries";
import Overlay from "../Modal/Overlay";

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
      {searchOpen && <Overlay onOverlayClicked={onOverlayClicked} />}
      <Box onSubmit={handleSearchWordSubmit}>
        <Search
          component={motion.svg}
          onClick={toggleSearch}
          animate={{ x: searchOpen ? -235 : 0, scale: searchOpen ? 0.7 : 1 }}
          transition={{ type: "linear" }}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        />
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
  width: 20px;
  height: 20px;
  svg {
    height: 26px;
    z-index: 3;
    cursor: pointer;
    margin-bottom: 2px;
  }
`;

const Input = styled(motion.input)`
  display: flex;
  align-items: center;
  transform-origin: right center;
  position: absolute;
  right: 0;
  padding: 5px 5px 5px 30px;
  z-index: 2;
  color: white;
  font-size: 16px;
  background-color: #000;
  border: 1px solid ${(props) => props.theme.white.lighter};
  border-radius: 3px;
  width: 260px;
  height: 30px;
  &::placeholder {
    font-size: 14px;
  }
  &:focus {
    outline: none;
  }
  @media ${device.tablet} {
    height: 40px;
  }
`;

export default SearchInput;
