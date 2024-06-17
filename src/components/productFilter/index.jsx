import ShopSectionContainer from '../shopSectionContainer';
import PriceFilter from '../priceFilter';
import CategoryFilter from '../categoryFilter';
import RatingFilter from '../ratingFilter';
import { useState, useEffect } from 'react';

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
    <ShopSectionContainer className={className} as="aside">
      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChange={handleQueryChange}
      />
      <CategoryFilter categories={categories} onChange={handleQueryChange} />
      <RatingFilter
        initialRating={4}
        maxRating={5}
        onChange={handleQueryChange}
      />
    </ShopSectionContainer>
  );
}
