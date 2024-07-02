import FilterContainer from '../filterContainer';
import FilterTitle from '../filterTitle';
import RatingStar from '../ratingStar';
import styled from 'styled-components';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RatingButton = styled.button`
  background-color: transparent;
  border: none;

  &:hover,
  &:focus-visible {
    filter: brightness(0.8);
  }

  &:active {
    filter: brightness(0.5);
  }
`;

export default function RatingFilter({
  className,
  selectedRating,
  maxRating,
  onChange,
}) {
  const ratings = [];
  for (let i = 1; i <= maxRating; i++) ratings.push(i);

  const handleChange = (event) => {
    const { value } = event.currentTarget;
    onChange({ selectedRating: value });
  };

  return (
    <FilterContainer className={className}>
      <FilterTitle>Rating</FilterTitle>
      <RatingContainer>
        {ratings.map((rating) => (
          <RatingButton
            key={rating}
            value={rating}
            onClick={handleChange}
            aria-label={
              rating < maxRating
                ? `Filter products by rating: ${rating} stars and above`
                : `Filter products by rating: ${rating} stars only`
            }
          >
            <RatingStar isChecked={selectedRating >= rating} />
          </RatingButton>
        ))}
        & Up
      </RatingContainer>
    </FilterContainer>
  );
}
