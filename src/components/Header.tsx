import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import device from "../theme/mediaQueries";
import LogoBox from "./LogoBox";

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [movieName, setMovieName] = useState("");
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const tvMatch = useMatch("/tv/*");
  const favoriteMatch = useMatch("/myFavorite/*");
  const homeMovieMatch = location === "/" || location.includes("movie");

  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useViewportScroll();

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

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMovieName(event.currentTarget.value);
  };

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start("scroll");
      } else {
        navAnimation.start("top");
      }
    });
  }, [scrollY, navAnimation]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?keyword=${movieName}`);
    inputAnimation.start({ scaleX: 0 });
    setSearchOpen(false);
    setMovieName("");
  };

  return (
    <Nav variants={navVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Link to="/">
          <LogoBox />
        </Link>
        <Items>
          <Link to="/">
            <Item>Movies {homeMovieMatch && <Circle layoutId="circle" />}</Item>
          </Link>
          <Link to="/tv ">
            <Item>Tv Shows {tvMatch && <Circle layoutId="circle" />}</Item>
          </Link>
          <Link to="/myFavorite">
            <Item>
              My Favorite {favoriteMatch && <Circle layoutId="circle" />}
            </Item>
          </Link>
        </Items>
      </Col>
      {searchOpen ? (
        <Overlay
          onClick={() => onOverlayClicked()}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      ) : (
        <></>
      )}
      <Col>
        <Search onSubmit={onSubmit}>
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
            value={movieName}
            onChange={onChange}
          />
        </Search>
      </Col>
    </Nav>
  );
}

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  cursor: pointer;
`;

const Nav = styled(motion.nav)`
  overflow-x: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100vw;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px 60px;
  color: white;
  z-index: 99;
  @media ${device.mobile} {
    padding: 15px 20px 12px;
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 18px;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  @media ${device.mobile} {
    font-size: 14px;
  }
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  bottom: -8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`;

const Search = styled.form`
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

export default Header;
