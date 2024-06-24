import Button from '../button';
import { addToBasket, removeFromBasket } from '../../apis/user/user';
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: start;
`;

const ProductSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default function BasketItem({ product, qty }) {
  const handleQtyChange = (product, qty) => addToBasket(product, qty);
  const handleRemove = (product) => removeFromBasket(product);

  return (
    <Container>
      <Image src={product.image} />
      <ProductInfo>
        <h2>{product.title}</h2>
        <div>Price: £{product.price.toFixed(2)}</div>
        <Button value={product.id} onClick={() => handleRemove(product)}>
          Remove
        </Button>
      </ProductInfo>
      <ProductSummary>
        <label>
          Qty:
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(event) =>
              handleQtyChange(product, event.currentTarget.value)
            }
          />
        </label>
        <div>Total: £{(product.price * qty).toFixed(2)}</div>
      </ProductSummary>
    </Container>
  );
}
