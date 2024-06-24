import Container from '../../components/container';
import BasketItem from '../../components/basketItem';
import ShopSectionContainer from '../../components/shopSectionContainer';
import Button from '../../components/button';
import { getProducts } from '../../apis/products/products';
import { clearBasket } from '../../apis/user/user';
import useUser from '../../hooks/useUser';

import { useLoaderData } from 'react-router';
import styled from 'styled-components';

const Content = styled.div`
  display: flex;
  gap: 2rem;
`;

const ContainerHeading = styled.h2`
  font-weight: 500;
  padding-bottom: 1em;
`;

const DetailsContainer = styled(ShopSectionContainer)`
  flex: 1;
`;

const SummaryContainer = styled(ShopSectionContainer)`
  flex: 0.3;
  height: min-content;
  position: sticky;
  top: 1rem;
`;

const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  font-weight: 900;
`;

const BasketItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const ClearBasketButton = styled(Button)`
  margin-top: 1em;
`;

const CheckoutButton = styled(Button)`
  background-color: var(--accent-color);
  color: white;
  padding: 0.75em 1.5em;
  border: none;

  &:hover,
  &:focus-visible {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.5);
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
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
    ? products.filter((product) => user.basket[product.id] !== undefined)
    : [];

  // user.basket is an object with keys that map the product id to a quantity
  const basketValue = productsInBasket.reduce(
    (total, product) => total + product.price * user.basket[product.id],
    0,
  );

  return (
    <Container as="main">
      <Content>
        <DetailsContainer>
          <ContainerHeading>My Basket</ContainerHeading>
          <BasketItemsContainer>
            {productsInBasket.map((product) => (
              <BasketItem
                key={product.id}
                product={product}
                qty={user.basket[product.id]}
              />
            ))}
          </BasketItemsContainer>
          <ClearBasketButton onClick={() => clearBasket()}>
            Clear Basket
          </ClearBasketButton>
        </DetailsContainer>
        <SummaryContainer>
          <ContainerHeading>Summary</ContainerHeading>
          <SummaryContent>
            <Row>
              Total:
              <div>£{basketValue.toFixed(2)}</div>
            </Row>
            <CheckoutButton>Checkout</CheckoutButton>
          </SummaryContent>
        </SummaryContainer>
      </Content>
    </Container>
  );
}
