import BuyIcon from '/buy.svg';

import ShopSectionContainer from '../shopSectionContainer';
import Button from '../button';
import RatingStar from '../ratingStar';
import { addToBasket } from '../../apis/user/user';

import styled from 'styled-components';

const RatingContainer = styled.div`
  display: flex;
`;

const ProductImg = styled.img`
  height: 350px;
  /* Preserve the aspect ratio */
  object-fit: contain;
  margin: 0 auto;
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BuySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const BuyButton = styled(Button)`
  border: 1px solid var(--color--light);
  padding: 0.5rem;
  width: 60px;

  display: grid;
  place-items: center;
`;

const handleBuy = async (product) => {
  console.log('Adding: ', product);
  await addToBasket(product);
};

export default function ProductCard({ className, maxRating, product }) {
  const ratings = [];
  for (let i = 1; i <= maxRating; i++) ratings.push(i);

  return (
    <ShopSectionContainer className={className}>
      <ProductImg src={product.image} alt="" />
      <ProductInfo>
        <div>
          <h3>{product.title}</h3>
          <RatingContainer>
            {ratings.map((rating) => (
              <RatingStar
                key={rating}
                isChecked={rating <= product.rating.rate}
              />
            ))}
          </RatingContainer>
        </div>
        <BuySection>
          <div>£{product.price.toFixed(2)}</div>
          <BuyButton onClick={() => handleBuy(product)}>
            <img
              src={BuyIcon}
              alt={`buy ${product.title} for £${product.price}`}
            />
          </BuyButton>
        </BuySection>
      </ProductInfo>
    </ShopSectionContainer>
  );
}
