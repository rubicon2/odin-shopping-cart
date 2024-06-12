import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterLabel = styled.label`
  display: flex;
  justify-content: space-between;
`;

export default function PriceFilter({ minPrice, maxPrice, onChange }) {
  const [selectedMin, setSelectedMin] = useState(minPrice);
  const [selectedMax, setSelectedMax] = useState(maxPrice);

  const handleMinChange = (event) => {
    const value = Number.parseFloat(event.currentTarget.value);
    setSelectedMin(value);
    onChange({ selectedMin: value });
  };

  const handleMaxChange = (event) => {
    const value = Number.parseFloat(event.currentTarget.value);
    setSelectedMax(value);
    onChange({ selectedMax: value });
  };

  return (
    <Container>
      <FilterLabel>
        Min:
        <input
          type="number"
          name="min-price"
          value={selectedMin}
          min={minPrice}
          max={selectedMax}
          onChange={handleMinChange}
        />
      </FilterLabel>
      <FilterLabel>
        Max:
        <input
          type="number"
          name="max-price"
          value={selectedMax}
          min={selectedMin}
          max={maxPrice}
          onChange={handleMaxChange}
        />
      </FilterLabel>
    </Container>
  );
}
