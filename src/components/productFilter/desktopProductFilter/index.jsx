import ShopSectionContainer from '../../shopSectionContainer';
import PriceFilter from '../../priceFilter';
import CategoryFilter from '../../categoryFilter';
import RatingFilter from '../../ratingFilter';

import styled from 'styled-components';

export const DesktopProductFilterContainer = styled(ShopSectionContainer)`
  position: sticky;
  /* Height of Header component plus padding of product list, will line up with top of product list */
  top: calc(119px + 1rem);
  height: min-content;
`;

export default function DesktopProductFilter({
  className,
  query,
  minPrice,
  maxPrice,
  maxRating,
  onQueryChange,
}) {
  const { selectedMin, selectedMax, selectedRating, categoryStatus } = query;

  return (
    // Using "as" breaks the inherited styles, but "forwardedAs" doesn't (???)
    // I think "as" works for overriding a styled component (i.e. const MyStyledThing = styled.div``),
    // but "forwardedAs" is needed for a react function component (i.e. function MyComponent()).
    <DesktopProductFilterContainer
      data-testid="desktop-product-filter"
      className={className}
      forwardedAs="aside"
      aria-label="Product filters"
    >
      <PriceFilter
        selectedMin={selectedMin}
        selectedMax={selectedMax}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChange={onQueryChange}
      />
      <CategoryFilter categories={categoryStatus} onChange={onQueryChange} />
      <RatingFilter
        selectedRating={selectedRating}
        maxRating={maxRating}
        onChange={onQueryChange}
      />
    </DesktopProductFilterContainer>
  );
}
