import styled from 'styled-components';

// This exists just so I can import it into NavBar and set display to none at the breakpoint.
export const DesktopNavBarStyled = styled.div``;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 0 4rem;
`;

export default function DesktopNavBar({ navListItems }) {
  return (
    <DesktopNavBarStyled>
      <NavList>
        {navListItems.map((item) => (
          <li key={item.key}>{item}</li>
        ))}
      </NavList>
    </DesktopNavBarStyled>
  );
}
