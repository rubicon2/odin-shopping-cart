import Button from '../button';
import { addToBasket, removeFromBasket } from '../../apis/user/user';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 1.5fr;
  gap: 2rem;
`;

const ProductInfo = styled.div`
  flex-grow: 1;
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

const SummaryRow = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;

  & > * {
    width: 50%;
  }
`;

const TotalValue = styled.span`
  text-align: right;
`;

export default function BasketItem({ product, qty }) {
  const handleQtyChange = (product, qty) => addToBasket(product, qty);
  const handleRemove = (product) => removeFromBasket(product);

  return (
    <Container>
      <img src={product.image} />
      <ProductInfo>
        <h2>{product.title}</h2>
        <div>Price: £{product.price.toFixed(2)}</div>
        <Button value={product.id} onClick={() => handleRemove(product)}>
          Remove
        </Button>
      </ProductInfo>
      <ProductSummary>
        <SummaryRow>
          <label htmlFor={`${product.id}-qty`}>Qty:</label>
          <input
            id={`${product.id}-qty`}
            type="number"
            min="1"
            value={qty}
            onChange={(event) =>
              handleQtyChange(product, parseInt(event.currentTarget.value))
            }
          />
        </SummaryRow>
        <SummaryRow>
          <span>Total:</span>
          <TotalValue>£{(product.price * qty).toFixed(2)}</TotalValue>
        </SummaryRow>
      </ProductSummary>
    </Container>
  );
}
