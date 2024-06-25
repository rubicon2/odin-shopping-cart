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
  position: relative;
  text-decoration: none;

  img {
    width: 100%;
  }
`;

const ImgContainer = styled.div`
  width: 50px;
  height: 50px;
`;

const ItemCount = styled.div`
  padding: 0.1em 0.5em;
  border-radius: 10px;
  background-color: var(--color--dark);
  color: white;
  font-weight: 500;
  /* For some reason using top and left to position, leaves the count in the wrong position when the styled component is mounted? */
  /* Commenting out position: absolute, saving, then uncommenting it and saving also fixes it. I am very confused. */
  /* position: absolute; */
  /* top: 50px; */
  /* left: 25px; */

  /* However this seems to work fine */
  margin-top: -20px;
  margin-left: 25px;

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
      </ImgContainer>
      <ItemCount count={basketItemCount} className={isActive ? 'active' : ''}>
        {basketItemCount}
      </ItemCount>
    </BasketLink>
  );
}
