import MobileNavBar, { MobileNavBarStyled } from './mobileNavBar';
import DesktopNavBar, { DesktopNavBarStyled } from './desktopNavBar';
import styled from 'styled-components';

const Nav = styled.nav`
  ${DesktopNavBarStyled} {
    display: none;
  }

  @media (min-width: 860px) {
    ${DesktopNavBarStyled} {
      display: block;
    }

    ${MobileNavBarStyled} {
      display: none;
    }
  }
`;

const links = [
  {
    to: '/',
    innerText: 'Home',
  },
  {
    to: '/shop',
    innerText: 'Shop',
  },
];

export default function NavBar() {
  return (
    <Nav>
      <MobileNavBar links={links} />
      <DesktopNavBar links={links} />
    </Nav>
  );
}
