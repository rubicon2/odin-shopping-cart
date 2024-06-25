import NavBasket from '../navBasket';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  & > * {
    /* Display block so we can have some nice vertical padding */
    display: block;
    padding: 0.75rem 2rem;
  }

  @media (min-width: 860px) {
    flex-direction: row;

    & > * {
      &:last-child {
        padding-right: 0;
      }
    }
  }
`;

const NavLinkStyled = styled(NavLink)`
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

export default function NavBar() {
  return (
    <nav>
      <NavList>
        <li>
          <NavLinkStyled
            to="/"
            className={(isActive, isPending) =>
              isActive ? 'active' : isPending ? 'pending' : ''
            }
          >
            Home
          </NavLinkStyled>
        </li>
        <li>
          <NavLinkStyled
            to="/shop"
            className={(isActive, isPending) =>
              isActive ? 'active' : isPending ? 'pending' : ''
            }
          >
            Shop
          </NavLinkStyled>
        </li>
        <li>
          <NavBasket />
        </li>
      </NavList>
    </nav>
  );
}
