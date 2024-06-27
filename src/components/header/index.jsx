import Container from '../container';
import NavBar from '../navBar';
import LogoDark from '/mega-shop-logo-dark.svg';
import styled from 'styled-components';

const Background = styled.header`
  background-color: white;
  position: relative;
  z-index: 2;

  @media (min-width: 860px) {
    display: none;
  }
`;

const StickyBackground = styled.header`
  background-color: white;
  box-shadow: 0px 5px 20px 5px var(--color--shadow);
  position: sticky;
  top: 0;
  z-index: 1;
`;

const Content = styled(Container)`
  @media (max-width: 859px) {
    /* Zero padding on container so the content spans the whole width of the viewport - so hovering over buttons looks good when the buttons/links darken */
    padding: 0;
  }

  @media (min-width: 860px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Logo = styled.img`
  width: min(90vw, 400px);
  padding: min(5vw, 1rem) 0;

  @media (max-width: 859px) {
    /* Center mobile logo */
    margin: 0 auto;
  }
`;

const StickyLogo = styled(Logo)`
  @media (max-width: 859px) {
    display: none;
  }
`;

export default function Header() {
  return (
    <>
      <Background>
        <Content>
          <Logo src={LogoDark} alt="" />
        </Content>
      </Background>
      <StickyBackground>
        <Content>
          <StickyLogo src={LogoDark} alt="" />
          <NavBar />
        </Content>
      </StickyBackground>
    </>
  );
}
