import BuyIcon from '/buy.svg';

import ShopSectionContainer from '../shopSectionContainer';
import Button from '../button';
import RatingStar from '../ratingStar';
import { addToBasket } from '../../apis/user/user';

import styled from 'styled-components';
import { useState } from 'react';

const ProductContainer = styled(ShopSectionContainer)`
  display: flex;
  flex-direction: column;
`;

const RatingContainer = styled.div`
  display: flex;
`;

const ProductImg = styled.img`
  /* Using height and not max-height so all images are the same size */
  height: 300px;
  /* Preserve the aspect ratio */
  object-fit: contain;
  margin: 0 auto;
`;

const ProductInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 970px) {
    display: grid;
    grid-template-columns: 2.5fr 1fr;
  }
`;

const BuySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
`;

const BuyButton = styled(Button)`
  border: 1px solid var(--color--light);
  padding: 0.5rem;
  width: 60px;

  display: grid;
  place-items: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;

  * {
    width: 50%;
  }
`;

const handleBuy = async (product, qty) => {
  await addToBasket(product, qty);
};

export default function ProductCard({ className, maxRating, product }) {
  const [qty, setQty] = useState(1);
  const priceString = '£' + product.price.toFixed(2);
  const totalPriceString = '£' + (product.price * qty).toFixed(2);
  const ratings = [];
  for (let i = 1; i <= maxRating; i++) ratings.push(i);

  return (
    <ProductContainer className={className}>
      <ProductImg src={product.image} alt={product.title} />
      <ProductInfo>
        <div>
          <h3 id={`${product.id}-title`}>{product.title}</h3>
          <RatingContainer
            aria-label={`Rated ${product.rating.rate} out of ${maxRating} stars`}
          >
            {ratings.map((rating) => (
              <RatingStar
                key={rating}
                isChecked={rating <= product.rating.rate}
              />
            ))}
          </RatingContainer>
        </div>
        <BuySection>
          <div>{priceString}</div>
          <Row>
            <label htmlFor={`${product.id}-qty`}>Qty:</label>
            <input
              type="number"
              min="1"
              id={`${product.id}-qty`}
              value={qty}
              onChange={(event) => setQty(parseInt(event.currentTarget.value))}
            />
          </Row>
          <BuyButton onClick={() => handleBuy(product, qty)}>
            <img
              src={BuyIcon}
              title={`Buy ${qty} of ${product.title} for a total of ${totalPriceString}`}
              alt=""
            />
          </BuyButton>
        </BuySection>
      </ProductInfo>
    </ProductContainer>
  );
}
