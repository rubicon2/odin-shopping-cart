import menuIcon from '/burger-menu.svg';
import { useState } from 'react';
import styled from 'styled-components';

export const MobileNavBarStyled = styled.div``;

const NavButton = styled.button`
  /* Add background color so can change brightness on hover */
  background-color: white;
  border: none;

  /* So a larger area can be pressed to activate the button */
  width: 100%;

  /* To keep icon centered */
  display: grid;
  place-items: center;

  &:hover,
  &:focus-visible {
    filter: brightness(0.9);
  }
`;

const MenuIcon = styled.img`
  height: 45px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: space-between; */
  /* align-items: center; */
  text-align: center;

  /* width: 100%; */

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
      filter: brightness(0.9);
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
