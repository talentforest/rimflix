import { Link, useMatch } from 'react-router-dom';
import { motion, useAnimation, useViewportScroll } from 'framer-motion';
import { useContext, useEffect } from 'react';
import { Language } from '../api/api';
import { LanguageContext } from '../context/LanguageContext';
import { FavoriteBorder, Movie, PhotoFilter, Tv } from '@mui/icons-material';
import { deviceSizes } from '../theme/mediaQueries';
import LogoBox from './LogoBox';
import SearchInput from '../components/common/SearchInput';
import styled from 'styled-components';
import device from '../theme/mediaQueries';
import useWindowSize from '../hook/useWindowSize';

const navBoxVariants = {
  top: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  scroll: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
};

function Header() {
  const { language } = useContext(LanguageContext);
  const { scrollY } = useViewportScroll();
  const { windowSize } = useWindowSize();
  const navBoxAnimation = useAnimation();

  const homeMatch = useMatch('/');
  const movieMatch = useMatch('/movie/*');
  const tvMatch = useMatch('/tv/*');
  const myListMatch = useMatch('/myList/*');
  const photocardMatch = useMatch('/photocard/*');

  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 50) {
        navBoxAnimation.start('scroll');
      } else {
        navBoxAnimation.start('top');
      }
    });
  }, [scrollY, navBoxAnimation]);

  return (
    <Nav variants={navBoxVariants} animate={navBoxAnimation} initial={'top'}>
      <Col>
        <Link to='/' aria-label='rimflix'>
          <LogoBox />
        </Link>
        <Items>
          <Link to='/'>
            <Item $match={!!(homeMatch || movieMatch)}>
              {windowSize.width > +deviceSizes.tablet ? (
                language === Language.ko ? (
                  '영화'
                ) : (
                  'Movies'
                )
              ) : (
                <Movie />
              )}
              {(homeMatch || movieMatch) && <Circle layoutId='circle' />}
            </Item>
          </Link>
          <Link to='/tv '>
            <Item $match={!!tvMatch}>
              {windowSize.width > +deviceSizes.tablet ? (
                language === Language.ko ? (
                  'TV 프로그램'
                ) : (
                  'Tv Shows '
                )
              ) : (
                <Tv />
              )}
              {tvMatch && <Circle layoutId='circle' />}
            </Item>
          </Link>
          <Link to='/myList'>
            <Item $match={!!myListMatch}>
              {windowSize.width > +deviceSizes.tablet ? (
                language === Language.ko ? (
                  '나의 리스트'
                ) : (
                  'My List'
                )
              ) : (
                <FavoriteBorder />
              )}
              {myListMatch && <Circle layoutId='circle' />}
            </Item>
          </Link>
          <Link to='/photocard'>
            <Item $match={!!photocardMatch}>
              {windowSize.width > +deviceSizes.tablet ? (
                language === Language.ko ? (
                  '포토카드'
                ) : (
                  'Photo Card'
                )
              ) : (
                <PhotoFilter />
              )}
              {photocardMatch && <Circle layoutId='circle' />}
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
  margin-left: 5px;
`;

const Item = styled.div<{ $match: boolean }>`
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
  svg {
    fill: ${({ $match, theme }) => ($match ? theme.pink : theme.white)};
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
