import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import device from "../theme/mediaQueries";

const logoVariants = {
  start: { pathLength: 0, fill: "rgba(255, 255, 255, 0)" },
  end: {
    fill: "#ff0000",
    pathLength: 1,
  },
};

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
          <Logo
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 276.742"
            fill="transparent"
          >
            <motion.path
              variants={logoVariants}
              initial="start"
              animate="end"
              strokeWidth={4}
              transition={{
                default: { duration: 5 },
                fill: { duration: 1, delay: 1.5 },
              }}
              d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
            />
          </Logo>
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

const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 100px;
  height: 35px;
  cursor: pointer;
  path {
    stroke: white;
  }
  @media ${device.mobile} {
    width: 70px;
    height: 15px;
    margin-right: 10px;
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
