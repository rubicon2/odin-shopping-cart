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
    <Container>
      {categories.map((category) => (
        <FilterLabel key={category}>
          {category}
          <input
            type="checkbox"
            name={category}
            value={category}
            checked={categoryStatus[category]}
            onChange={handleSelectionChange}
          />
        </FilterLabel>
      ))}
    </Container>
  );
}
