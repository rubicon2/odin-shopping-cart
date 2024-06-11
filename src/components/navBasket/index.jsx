import BasketIcon from '/basket.svg';
import BasketIconRed from '/basket-red.svg';
import { useLocation, Link } from 'react-router-dom';

// Preload icon so there is no delay when user clicks link to /basket
// Pretty hacky... is there any other way of doing this?
// const red = new Image();
// red.src = BasketIconRed;

export default function NavBasket() {
  const location = useLocation();
  const isActive = location.pathname === '/basket';
  return (
    <Link to="/basket">
      <img
        src={isActive ? BasketIconRed : BasketIcon}
        alt="x items in basket"
      />
    </Link>
  );
}
