import FilterContainer from '../filterContainer';
import FilterTitle from '../filterTitle';
import FilterLabel from '../filterLabel';

import styled from 'styled-components';

const CategoryLabel = styled(FilterLabel)`
  text-transform: capitalize;
`;

export default function CategoryFilter({ categories, onChange }) {
  const handleSelectionChange = (event) => {
    const { checked, value } = event.currentTarget;
    // This is a bit clunky
    const newStatus = { ...categories, [value]: checked };
    onChange({ categoryStatus: newStatus });
  };

  return (
    <FilterContainer>
      <FilterTitle>Category</FilterTitle>
      {Object.keys(categories).map((category) => (
        <CategoryLabel key={category}>
          {category}
          <input
            type="checkbox"
            name={category}
            value={category}
            checked={categories[category]}
            onChange={handleSelectionChange}
          />
        </CategoryLabel>
      ))}
    </FilterContainer>
  );
}
