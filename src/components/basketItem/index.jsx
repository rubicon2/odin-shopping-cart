import Button from '../button';
import SelectRange from '../selectRange';
import { removeFromBasket, setQuantity } from '../../apis/user/user';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 560px) {
    grid-template-columns: 1fr 4fr 1.5fr;
  }
`;

const ProductImg = styled.img`
  max-height: 250px;
  /* To ensure centered on mobile layout, does not affect desktop as it is constrainted by grid column */
  margin: 0 auto;
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
  const handleQtyChange = async (product, qty) =>
    await setQuantity(product, qty);
  // If this check is done in handleQtyChange, the item disappears as soon as you hit zero.
  // Doesn't feel good and user might enter zero by mistake, so this separate function will be called onBlur/on focus out.
  // Will give user a chance to correct any input errors.
  const checkQtyNotZero = async (product, qty) => {
    if (qty <= 0) await removeFromBasket(product);
  };
  const handleRemove = async (product) => await removeFromBasket(product);

  return (
    <Container>
      <ProductImg src={product.image} alt={product.title} />
      <ProductInfo>
        <h3>{product.title}</h3>
        <div>Price: £{product.price.toFixed(2)}</div>
        <Button value={product.id} onClick={() => handleRemove(product)}>
          Remove
        </Button>
      </ProductInfo>
      <ProductSummary>
        <SummaryRow>
          <label htmlFor={`${product.id}-qty`}>Qty:</label>
          <SelectRange
            id={`${product.id}-qty`}
            aria-label="Select quantity"
            min={1}
            max={9}
            value={qty}
            onChange={(event) =>
              handleQtyChange(product, parseInt(event.currentTarget.value))
            }
            onBlur={(event) =>
              checkQtyNotZero(product, parseInt(event.currentTarget.value))
            }
          />
        </SummaryRow>
        <SummaryRow>
          <span id={`${product.id}-total`}>Total:</span>
          <TotalValue aria-labelledby={`${product.id}-total`}>
            £{(product.price * qty).toFixed(2)}
          </TotalValue>
        </SummaryRow>
      </ProductSummary>
    </Container>
  );
}
