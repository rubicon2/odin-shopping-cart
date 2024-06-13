import PriceFilter from '../priceFilter';
import { useState } from 'react';
import styled from 'styled-components';
import CategoryFilter from '../categoryFilter';
import RatingFilter from '../ratingFilter';

const Container = styled.aside`
  width: 600px;
  border: 2px solid var(--color--light);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 5px 5px 5px 5px var(--color--shadow);
  height: min-content;
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

export default function ProductFilter({ products, onChange }) {
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

  // rating.rate - range of tick boxes
  return (
    <Container>
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
    </Container>
  );
}
