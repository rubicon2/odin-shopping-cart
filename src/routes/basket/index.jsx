import Container from '../../components/container';
import PageHeading from '../../components/pageHeading';
import { clearBasket } from '../../apis/user/user';
import styled from 'styled-components';

const ClearBasketButton = styled.button``;

export default function Basket() {
  return (
    <Container as="main">
      <PageHeading>Basket</PageHeading>
      <ClearBasketButton onClick={() => clearBasket()}>Clear</ClearBasketButton>
    </Container>
  );
}
