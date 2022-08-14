import { Link, useMatch } from "react-router-dom";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import LogoBox from "./LogoBox";
import SearchInput from "./common/SearchInput";
import styled from "styled-components";
import device from "../theme/mediaQueries";

const navBoxVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

function Header() {
  const { scrollY } = useViewportScroll();
  const navBoxAnimation = useAnimation();

  const homeMatch = useMatch("/");
  const movieMatch = useMatch("/movie/*");
  const tvMatch = useMatch("/tv/*");
  const favoriteMatch = useMatch("/myFavorite/*");

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navBoxAnimation.start("scroll");
      } else {
        navBoxAnimation.start("top");
      }
    });
  }, [scrollY, navBoxAnimation]);

  return (
    <Nav variants={navBoxVariants} animate={navBoxAnimation} initial={"top"}>
      <Col>
        <Link to="/">
          <LogoBox />
        </Link>
        <Items>
          <Link to="/">
            <Item>
              Movies {(homeMatch || movieMatch) && <Circle layoutId="circle" />}
            </Item>
          </Link>
          <Link to="/tv ">
            <Item>Tv Shows {tvMatch && <Circle layoutId="circle" />}</Item>
          </Link>
          <Link to="/myFavorite">
            <Item>
              Favorite {favoriteMatch && <Circle layoutId="circle" />}
            </Item>
          </Link>
        </Items>
      </Col>
      <Col>
        <SearchInput />
      </Col>
    </Nav>
  );
}

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: black;
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
    margin-right: 15px;
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

export default Header;
