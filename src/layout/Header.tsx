import { Link, useMatch } from "react-router-dom";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import { useEffect } from "react";
import LogoBox from "./LogoBox";
import SearchInput from "../components/common/SearchInput";
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
  const myListMatch = useMatch("/myList/*");

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 50) {
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
          <Link to="/myList">
            <Item>My List {myListMatch && <Circle layoutId="circle" />}</Item>
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
  padding: 15px 20px 12px;
  color: white;
  z-index: 99;
  @media ${device.tablet} {
    padding: 20px 30px;
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Items = styled.div`
  display: flex;
  align-items: center;
`;

const Item = styled.div`
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  margin-right: 15px;
  font-size: 14px;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  @media ${device.tablet} {
    margin-right: 20px;
    font-size: 18px;
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
