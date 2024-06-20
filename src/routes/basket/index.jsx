import Container from '../../components/container';
import PageHeading from '../../components/pageHeading';
import BasketItem from '../../components/basketItem';
import { getProducts } from '../../apis/products/products';
import { clearBasket } from '../../apis/user/user';
import useUser from '../../hooks/useUser';

import { useLoaderData } from 'react-router';
import styled from 'styled-components';

const ClearBasketButton = styled.button``;

const CheckoutButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  font-weight: 600;
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 5px;

  &:hover,
  &:focus-visible {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.5);
  }
`;

const TotalValue = styled.span`
  font-weight: 900;
`;

export async function loader() {
  const products = await getProducts();
  // Order by id to quicken process of grabbing item that relates to id?
  return products;
}

export default function Basket() {
  const products = useLoaderData();
  const user = useUser();

  const productsInBasket = user
    ? products.filter((product) => user.basket.includes(product.id))
    : [];

  const basketValue = productsInBasket.reduce(
    (total, current) => total + current.price,
    0,
  );

  return (
    <Container as="main">
      <PageHeading>Basket</PageHeading>
      <ClearBasketButton onClick={() => clearBasket()}>Clear</ClearBasketButton>
      {productsInBasket.map((product) => BasketItem(product))}
      <TotalValue>Total: £{basketValue.toFixed(2)}</TotalValue>
      <CheckoutButton>Checkout</CheckoutButton>
    </Container>
  );
}
