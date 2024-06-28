import { NavBarLink } from '../navBarLink';
import NavBasket from '../../navBasket';
import styled from 'styled-components';

// This exists just so I can import it into NavBar and set display to none at the breakpoint.
export const DesktopNavBarStyled = styled.div``;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0 4rem;
`;

export default function DesktopNavBar({ links }) {
  return (
    <DesktopNavBarStyled>
      <NavList>
        {links.map((link) => (
          <li key={link.to}>
            <NavBarLink to={link.to}>{link.innerText}</NavBarLink>
          </li>
        ))}
        <NavBasket />
      </NavList>
    </DesktopNavBarStyled>
  );
}
