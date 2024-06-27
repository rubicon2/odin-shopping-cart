import MobileNavBar, { MobileNavBarStyled } from './mobileNavBar';
import DesktopNavBar, { DesktopNavBarStyled } from './desktopNavBar';
import NavBasket from '../navBasket';
import { NavLink } from 'react-router-dom';
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

export const NavLinkStyled = styled(NavLink)`
  font-size: 1.3rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--color--dark);

  &.active {
    color: red;
  }

  &.pending {
    color: pink;
  }
`;

// Don't really like baking in the styles like this...
// The whole point is for the style and functionality to be contained within MobileNavBar and DesktopNavBar.
// But need to also be able to pass in components like NavBasket!
const navListItems = [
  <NavLinkStyled key="/" to="/">
    Home
  </NavLinkStyled>,
  <NavLinkStyled key="/shop" to="/shop">
    Shop
  </NavLinkStyled>,
  <NavBasket key="NavBasket" />,
];

export default function NavBar() {
  return (
    <Nav>
      <MobileNavBar navListItems={navListItems} />
      <DesktopNavBar navListItems={navListItems} />
    </Nav>
  );
}
