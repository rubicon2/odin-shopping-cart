import FilterIcon from '/filter-white.svg';
import CloseIcon from '/close-white.svg';
import PriceFilter from '../../priceFilter';
import CategoryFilter from '../../categoryFilter';
import RatingFilter from '../../ratingFilter';
import styled from 'styled-components';
import ShopSectionContainer from '../../shopSectionContainer';
import { useState } from 'react';

export const MobileProductFilterContainer = styled.aside`
  position: sticky;
  bottom: 0;

  max-height: 80vh;
  padding: 0;

  overflow-y: scroll;

  box-shadow: -5px -5px 5px 5px var(--color--shadow);
`;

const ShowFilterButton = styled.button`
  /* Add background color so can change brightness on hover */
  background-color: var(--accent-color);
  color: white;
  border: none;

  /* So a larger area can be pressed to activate the button */
  width: 100%;
  padding: 1.25rem 0;
  font-weight: 700;
  font-size: 1.3rem;

  position: sticky;
  bottom: 0;

  /* To keep icon centered */
  display: grid;
  place-items: center;

  &:hover,
  &:focus-visible {
    background-color: var(--accent-color--dark);
  }

  &:active {
    background-color: var(--accent-color--darkest);
  }
`;

const FilterOptionsContainer = styled(ShopSectionContainer)`
  border: none;
  box-shadow: -5px -5px 5px 5px var(--color--shadow);
`;

export default function MobileProductFilter({
  className,
  minPrice,
  maxPrice,
  categories,
  initialRating,
  maxRating,
  onQueryChange,
}) {
  const [open, setOpen] = useState(false);

  return (
    // Using "as" breaks the inherited styles, but "forwardedAs" doesn't (???)
    // I think "as" works for overriding a styled component (i.e. const MyStyledThing = styled.div``),
    // but "forwardedAs" is needed for a react function component (i.e. function MyComponent()).
    <MobileProductFilterContainer
      className={className}
      aria-label="Product filters"
    >
      {open && (
        <FilterOptionsContainer>
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onChange={onQueryChange}
          />
          <CategoryFilter categories={categories} onChange={onQueryChange} />
          <RatingFilter
            initialRating={initialRating}
            maxRating={maxRating}
            onChange={onQueryChange}
          />
        </FilterOptionsContainer>
      )}
      <ShowFilterButton onClick={() => setOpen(!open)}>
        <img
          src={open ? CloseIcon : FilterIcon}
          alt={open ? 'Close Filters' : 'Open Filters'}
        />
      </ShowFilterButton>
    </MobileProductFilterContainer>
  );
}
