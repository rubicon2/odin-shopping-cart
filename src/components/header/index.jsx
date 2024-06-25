import Container from '../container';
import NavBar from '../navBar';
import LogoDark from '/mega-shop-logo-dark.svg';
import styled from 'styled-components';

const Background = styled.header`
  background-color: white;
  position: relative;
  z-index: 2;

  @media (min-width: 859px) {
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
  width: max-content;
  margin: 0 auto;

  @media (min-width: 860px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Logo = styled.img`
  width: min(90vw, 400px);
  padding: min(5vw, 1.5rem) 0;
`;

const StickyLogo = styled(Logo)`
  @media (max-width: 860px) {
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
