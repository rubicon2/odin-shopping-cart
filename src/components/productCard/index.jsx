import BuyIcon from '/buy.svg';

import ShopSectionContainer from '../shopSectionContainer';
import RatingStar from '../ratingStar';
import { addToBasket } from '../../apis/user/user';

import styled from 'styled-components';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
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

const BuyButton = styled.button`
  margin-top: auto;
  margin-left: auto;
  display: block;
  background-color: pink;
`;

const handleBuy = async (product) => {
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
        <div>
          <div>£{product.price.toFixed(2)}</div>
          <BuyButton onClick={() => handleBuy(product.id)}>
            <img
              src={BuyIcon}
              alt={`buy ${product.title} for £${product.price}`}
            />
          </BuyButton>
        </div>
      </ProductInfo>
    </ShopSectionContainer>
  );
}
