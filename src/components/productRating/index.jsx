import RatingStar from '../ratingStar';
import styled from 'styled-components';

const RatingContainer = styled.div`
  display: flex;
`;

export default function ProductRating({ userRating, maxRating = 5 }) {
  const ratings = [];
  for (let i = 1; i <= maxRating; i++) ratings.push(i);

  return (
    <RatingContainer
      aria-label={`Rated ${userRating} out of ${maxRating} stars`}
    >
      {ratings.map((rating) => (
        <RatingStar key={rating} isChecked={rating <= userRating} />
      ))}
    </RatingContainer>
  );
}
