import FilterContainer from '../filterContainer';
import FilterTitle from '../filterTitle';
import FilterLabel from '../filterLabel';

import styled from 'styled-components';

const Input = styled.input`
  width: 50%;
  text-align: right;
`;

export default function PriceFilter({
  selectedMin,
  selectedMax,
  minPrice,
  maxPrice,
  onChange,
}) {
  const handleMinChange = (event) => {
    const value = Number.parseFloat(event.currentTarget.value);
    onChange({ selectedMin: value });
  };

  const handleMaxChange = (event) => {
    const value = Number.parseFloat(event.currentTarget.value);
    onChange({ selectedMax: value });
  };

  return (
    <FilterContainer>
      <FilterTitle>Price</FilterTitle>
      <FilterLabel>
        Min:
        <Input
          aria-label="Filter by minimum price"
          type="number"
          inputMode="decimal"
          value={selectedMin}
          min={minPrice}
          max={selectedMax}
          onChange={handleMinChange}
        />
      </FilterLabel>
      <FilterLabel>
        Max:
        <Input
          aria-label="Filter by maximum price"
          type="number"
          inputMode="decimal"
          value={selectedMax}
          min={selectedMin}
          max={maxPrice}
          onChange={handleMaxChange}
        />
      </FilterLabel>
    </FilterContainer>
  );
}
