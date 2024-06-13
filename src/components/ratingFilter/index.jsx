import FilterContainer from '../filterContainer';
import FilterTitle from '../filterTitle';
import RatingStar from '../ratingStar';
import styled from 'styled-components';
import { useState } from 'react';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RatingButton = styled.button`
  background-color: transparent;
  border: none;
`;

export default function RatingFilter({
  className,
  initialRating,
  maxRating,
  onChange,
}) {
  const [selectedMinRating, setSelectedMinRating] = useState(initialRating);

  const ratings = [];
  for (let i = 1; i <= maxRating; i++) ratings.push(i);

  const handleChange = (event) => {
    const { value } = event.currentTarget;
    onChange({ selectedRating: value });
    setSelectedMinRating(value);
  };

  return (
    <FilterContainer className={className}>
      <FilterTitle>Rating</FilterTitle>
      <RatingContainer>
        {ratings.map((rating) => (
          <RatingButton key={rating} value={rating} onClick={handleChange}>
            <RatingStar isChecked={selectedMinRating >= rating} />
          </RatingButton>
        ))}
        & Up
      </RatingContainer>
    </FilterContainer>
  );
}
