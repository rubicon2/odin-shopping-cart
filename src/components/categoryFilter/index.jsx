import FilterContainer from '../filterContainer';
import FilterTitle from '../filterTitle';
import FilterLabel from '../filterLabel';
import { useState } from 'react';
import styled from 'styled-components';

const CategoryLabel = styled(FilterLabel)`
  text-transform: capitalize;
`;

export default function CategoryFilter({ categories, onChange }) {
  // Turn array of category strings into an object: each category string is a key, each key's value is whether the box is checked or not
  const [categoryStatus, setCategoryStatus] = useState(
    categories.reduce((obj, category) => ({ ...obj, [category]: true }), {}),
  );

  const handleSelectionChange = (event) => {
    const { checked, value } = event.currentTarget;
    // This is a bit clunky
    const newStatus = { ...categoryStatus, [value]: checked };
    onChange({ categoryStatus: newStatus });
    setCategoryStatus(newStatus);
  };

  return (
    <FilterContainer>
      <FilterTitle>Category</FilterTitle>
      {categories.map((category) => (
        <CategoryLabel key={category}>
          {category}
          <input
            type="checkbox"
            name={category}
            value={category}
            checked={categoryStatus[category]}
            onChange={handleSelectionChange}
          />
        </CategoryLabel>
      ))}
    </FilterContainer>
  );
}
