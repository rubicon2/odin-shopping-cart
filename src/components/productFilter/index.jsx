import DesktopProductFilter, {
  DesktopProductFilterContainer,
} from './desktopProductFilter';
import MobileProductFilter, {
  MobileProductFilterContainer,
} from './mobileProductFilter';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  ${DesktopProductFilterContainer} {
    display: none;
  }

  @media (min-width: 860px) {
    ${DesktopProductFilterContainer} {
      display: block;
    }

    ${MobileProductFilterContainer} {
      display: none;
    }
  }
`;

function getLowestPrice(products) {
  return products
    .map((product) => product.price)
    .reduce((min, current) => (current < min ? current : min));
}

function getHighestPrice(products) {
  return products
    .map((product) => product.price)
    .reduce((max, current) => (current > max ? current : max));
}

function getCategories(products) {
  return Array.from(new Set(products.map((product) => product.category)));
}

export default function ProductFilter({ className, products, onChange }) {
  const minPrice = getLowestPrice(products);
  const maxPrice = getHighestPrice(products);
  const categories = getCategories(products);

  const [query, setQuery] = useState({
    selectedMin: minPrice,
    selectedMax: maxPrice,
    categoryStatus: categories.reduce(
      (obj, category) => ({ ...obj, [category]: true }),
      {},
    ),
    selectedRating: 4,
  });

  const handleQueryChange = (queryObj) => {
    const newQuery = { ...query, ...queryObj };
    const visibleProductIds = products
      .filter(
        (product) =>
          product.price >= newQuery.selectedMin &&
          product.price <= newQuery.selectedMax &&
          newQuery.categoryStatus[product.category] &&
          product.rating.rate >= newQuery.selectedRating,
      )
      .map((product) => product.id);
    onChange(visibleProductIds);
    setQuery(newQuery);
  };

  // Run query on first render... lame
  useEffect(() => {
    handleQueryChange(query);
  }, []);

  return (
    <FilterContainer>
      <DesktopProductFilter
        className={className}
        forwardedAs="aside"
        minPrice={minPrice}
        maxPrice={maxPrice}
        categories={categories}
        initialRating={4}
        maxRating={5}
        onQueryChange={handleQueryChange}
      />
      <MobileProductFilter
        className={className}
        forwardedAs="aside"
        minPrice={minPrice}
        maxPrice={maxPrice}
        categories={categories}
        initialRating={4}
        maxRating={5}
        onQueryChange={handleQueryChange}
      />
    </FilterContainer>
  );
}
