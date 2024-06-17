import ShopSectionContainer from '../shopSectionContainer';
import RatingStar from '../ratingStar';
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

export default function ProductCard({ className, maxRating, product }) {
  const ratings = [];
  for (let i = 1; i <= maxRating; i++) ratings.push(i);

  return (
    <ShopSectionContainer className={className}>
      <ProductImg src={product.image} alt="" />
      <ProductInfo>
        <h3>{product.title}</h3>
        <span>£{product.price.toFixed(2)}</span>
      </ProductInfo>
      <RatingContainer>
        {ratings.map((rating) => (
          <RatingStar key={rating} isChecked={rating <= product.rating.rate} />
        ))}
      </RatingContainer>
    </ShopSectionContainer>
  );
}
