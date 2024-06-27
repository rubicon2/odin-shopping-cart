import PriceFilter from '../../priceFilter';
import CategoryFilter from '../../categoryFilter';
import RatingFilter from '../../ratingFilter';
import styled from 'styled-components';
import ShopSectionContainer from '../../shopSectionContainer';
import { useState } from 'react';

// This component should really not be part of the main content, but it currently is.
// It makes sense for the desktop version, and it is alongside the main content (product list),
// but on mobile that is replaced by a sticky button at the bottom that is outside of the main content flow.
// Doesn't work - it is constrained by the main content container!
// Is the solution to lift up the media query to the shop route, and have the desktop product filter be a child of the main page content,
// and the mobile version a child of the route itself and not constrained by the main content container?

export const MobileProductFilterContainer = styled(ShopSectionContainer)`
  position: fixed;
  bottom: 0;
  /* height: 100vh; */
  width: 95vw;
  max-height: 50vh;
  /* background-color: #c50000f4; */
  /* color: white; */

  overflow-y: scroll;
`;

const ShowFilterButton = styled.button`
  /* Add background color so can change brightness on hover */
  background-color: var(--accent-color);
  border: none;

  /* So a larger area can be pressed to activate the button */
  width: 100%;
  padding: 0.5rem 0;

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
    <MobileProductFilterContainer className={className} forwardedAs="aside">
      {open && (
        <div>
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
          {/* Just for testing a long vertical layout */}
          <CategoryFilter categories={categories} onChange={onQueryChange} />
          <CategoryFilter categories={categories} onChange={onQueryChange} />
          <CategoryFilter categories={categories} onChange={onQueryChange} />
        </div>
      )}
      <ShowFilterButton onClick={() => setOpen(!open)}>
        Filters
      </ShowFilterButton>
    </MobileProductFilterContainer>
  );
}
