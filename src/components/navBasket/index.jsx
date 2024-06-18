import BasketIcon from '/basket.svg';
import BasketIconRed from '/basket-red.svg';
import { useLocation, Link, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';

// Preload icon so there is no delay when user clicks link to /basket
// Pretty hacky... is there any other way of doing this?
// const red = new Image();
// red.src = BasketIconRed;

const BasketLink = styled(Link)`
  position: relative;

  img {
    width: 100%;
  }
`;

const ImgContainer = styled.div`
  width: 50px;
  height: 50px;
`;

const ItemCount = styled.div`
  position: absolute;
  padding: 0.1em 0.5em;
  border-radius: 10px;
  background-color: var(--color--dark);
  color: white;
  font-weight: 500;
  top: 50px;
  left: 25px;

  &.active {
    background-color: var(--accent-color);
  }
`;

export default function NavBasket() {
  const user = useLoaderData();
  const basketItemCount = user.basket.length;

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
      {basketItemCount > 0 && (
        <ItemCount className={isActive ? 'active' : ''}>
          {basketItemCount}
        </ItemCount>
      )}
    </BasketLink>
  );
}
