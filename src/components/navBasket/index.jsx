import BasketIcon from '/basket.svg';
import BasketIconRed from '/basket-red.svg';
import useUser from '../../hooks/useUser';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';

// Preload icon so there is no delay when user clicks link to /basket
// Pretty hacky... is there any other way of doing this?
// const red = new Image();
// red.src = BasketIconRed;

const BasketLink = styled(Link)`
  text-decoration: none;
`;

const ImgContainer = styled.div`
  /* Scale with font size, so will stay in proportion with text content, e.g. text links in a nav list */
  width: 3.5rem;
  height: 3.5rem;
  position: relative;

  img {
    height: 100%;
  }
`;

const ItemCount = styled.div`
  padding: 0.1em 0.5em;
  border-radius: 10px;
  background-color: var(--color--dark);
  color: white;
  font-weight: 500;
  /* Scale font-size up with parent element size (also determined by rems), so it stays in the correct position no matter the size of ImgContainer */
  font-size: 1.2rem;

  position: absolute;
  bottom: -5px;
  right: 0;

  &.active {
    background-color: var(--accent-color);
  }

  visibility: ${(props) => (props.count > 0 ? 'visible' : 'hidden')};
`;

export default function NavBasket() {
  // useLoaderData only runs when the component is mounted
  // since navBar is on screen on all pages, it will not re-render when the basket changes
  // seems like a good place to use useEffect - synchronize with the external user/localforage API
  const user = useUser();

  const basketItemCount = user
    ? Object.keys(user.basket).reduce(
        (total, key) => total + user.basket[key],
        0,
      )
    : 0;

  const location = useLocation();
  const isActive = location.pathname === '/basket';

  return (
    <BasketLink to="/basket">
      <ImgContainer>
        <img
          src={isActive ? BasketIconRed : BasketIcon}
          alt={`${basketItemCount} items in basket`}
          title={`${basketItemCount} items in basket`}
        />
        <ItemCount count={basketItemCount} className={isActive ? 'active' : ''}>
          {basketItemCount}
        </ItemCount>
      </ImgContainer>
    </BasketLink>
  );
}
