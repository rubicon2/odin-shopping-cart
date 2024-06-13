import FilterContainer from '../filterContainer';
import FilterTitle from '../filterTitle';
import FilterLabel from '../filterLabel';
import { useState } from 'react';

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
    <FilterContainer>
      <FilterTitle>Price</FilterTitle>
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
    </FilterContainer>
  );
}
