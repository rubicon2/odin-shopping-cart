import { removeFromBasket } from '../../apis/user/user';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 2rem;
`;

const Image = styled.img`
  max-width: 200px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

export default function BasketItem({ item }) {
  const { product, quantity } = item;

  return (
    <Container>
      <Image src={product.image} />
      <ProductInfo>
        <h2>{product.title}</h2>
        <div>Price: £{product.price.toFixed(2)}</div>
      </ProductInfo>
      <div>
        <div>Qty: {quantity}</div>
        <div>Total: £{(product.price * quantity).toFixed(2)}</div>
      </div>
    </Container>
  );
}
