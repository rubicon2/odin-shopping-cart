import menuIcon from '/burger-menu.svg';
import { NavBarLink } from '../navBarLink';
import NavBasket from '../../navBasket';
import { useState } from 'react';
import styled from 'styled-components';

export const MobileNavBarStyled = styled.div`
  box-shadow: 5px 5px 5px 5px var(--color--shadow);
`;

const MenuButtons = styled.div`
  display: flex;

  & > * {
    /* Add background color so can change brightness on hover */
    background-color: white;

    /* So menu and navBasket buttons take up half the navBar each */
    width: 50%;
    display: grid;
    place-items: center;
    padding: 1rem 0;

    &:hover,
    &:focus-visible {
      background-color: var(--color--button--hover);
    }

    &:active {
      background-color: var(--color--button--select);
    }
  }
`;

const NavButton = styled.button`
  border: none;
`;

const MenuIcon = styled.img`
  height: 45px;
`;

const NavList = styled.ul`
  box-shadow: 5px 5px 5px 5px var(--color--shadow);

  /* Ensure there are no gaps between list items */
  background-color: white;

  position: absolute;
  /* Choosing to have links that fill the width of the screen instead of matching 50% width parent menu button - easier for user to select */
  width: 100%;

  list-style: none;
  padding: 0;
  text-align: center;

  * {
    /* Display block so we can have some nice vertical padding, change dimensions, whole horizontal area of links clickable */
    display: block;
    margin: 0 auto;
  }

  a {
    padding: 0.75rem 2rem;

    &:hover,
    &:focus-visible {
      background-color: var(--color--button--hover);
    }

    &:active {
      background-color: var(--color--button--select);
    }
  }
`;

export default function MobileNavBar({ links }) {
  const [open, setOpen] = useState(false);

  return (
    <MobileNavBarStyled>
      <MenuButtons>
        <NavButton onClick={() => setOpen(!open)}>
          <MenuIcon
            src={menuIcon}
            alt={open ? 'Close nav menu' : 'Open nav menu'}
          />
        </NavButton>
        <NavBasket />
      </MenuButtons>
      {open && (
        <NavList>
          {links.map((link) => (
            <li key={link.to}>
              <NavBarLink to={link.to}>{link.innerText}</NavBarLink>
            </li>
          ))}
        </NavList>
      )}
    </MobileNavBarStyled>
  );
}
