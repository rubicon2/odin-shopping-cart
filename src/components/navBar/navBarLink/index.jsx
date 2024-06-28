import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavBarLink = styled(NavLink)`
  font-size: 1.3rem;
  font-weight: 700;
  text-decoration: none;
  color: var(--color--dark);

  &.active {
    color: var(--accent-color);
  }

  &.pending {
    color: pink;
  }
`;
