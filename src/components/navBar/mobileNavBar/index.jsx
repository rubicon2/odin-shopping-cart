import menuIcon from '/burger-menu.svg';
import { useState } from 'react';
import styled from 'styled-components';

// This exists just so I can import it into NavBar and set display to none at the breakpoint. I hate it.
export const MobileNavBarStyled = styled.div``;

const NavButton = styled.button`
  /* Add background color so can change brightness on hover */
  background-color: white;
  border: none;

  /* So a larger area can be pressed to activate the button */
  width: 100%;
  padding: 0.5rem 0;

  /* To keep icon centered */
  display: grid;
  place-items: center;

  &:hover,
  &:focus-visible {
    background-color: var(--color--button--hover);
  }

  &:active {
    background-color: var(--color--button--select);
  }
`;

const MenuIcon = styled.img`
  height: 45px;
`;

const NavList = styled.ul`
  /* Ensure there are no gaps between list items */
  background-color: white;

  position: absolute;
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
    /* Add background color so can change brightness on hover */
    background-color: white;
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

export default function MobileNavBar({ navListItems }) {
  const [open, setOpen] = useState(false);

  return (
    <MobileNavBarStyled>
      <NavButton onClick={() => setOpen(!open)}>
        <MenuIcon
          src={menuIcon}
          alt={open ? 'Close nav menu' : 'Open nav menu'}
        />
      </NavButton>
      {open && (
        <NavList>
          {navListItems.map((item) => (
            <li key={item.key}>{item}</li>
          ))}
        </NavList>
      )}
    </MobileNavBarStyled>
  );
}
