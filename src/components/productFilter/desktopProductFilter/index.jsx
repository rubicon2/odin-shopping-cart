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
  minPrice,
  maxPrice,
  categories,
  initialRating,
  maxRating,
  onQueryChange,
}) {
  return (
    // Using "as" breaks the inherited styles, but "forwardedAs" doesn't (???)
    // I think "as" works for overriding a styled component (i.e. const MyStyledThing = styled.div``),
    // but "forwardedAs" is needed for a react function component (i.e. function MyComponent()).
    <DesktopProductFilterContainer
      className={className}
      forwardedAs="aside"
      aria-label="Product filters"
    >
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
    </DesktopProductFilterContainer>
  );
}
