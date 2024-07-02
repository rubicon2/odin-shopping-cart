import Container from '../../components/container';
import ProductList from '../../components/productList';
import DesktopProductFilter, {
  DesktopProductFilterContainer,
} from '../../components/productFilter/desktopProductFilter';
import MobileProductFilter, {
  MobileProductFilterContainer,
} from '../../components/productFilter/mobileProductFilter';
import { getProducts } from '../../apis/products/products';

import { useLoaderData } from 'react-router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const ResponsiveController = styled.div`
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

const ShopGrid = styled.div`
  display: grid;
  gap: 2rem;

  @media (min-width: 860px) {
    grid-template-columns: 1fr 3fr;
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

export async function loader() {
  const products = await getProducts();
  return products;
}

export default function Shop() {
  const productList = useLoaderData();
  const minPrice = getLowestPrice(productList);
  const maxPrice = getHighestPrice(productList);
  const categories = getCategories(productList);

  const [visibleIds, setVisibleIds] = useState(
    productList.map((product) => product.id),
  );

  const visibleProducts = productList.filter((product) =>
    visibleIds.includes(product.id),
  );

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
    const visibleProductIds = productList
      .filter(
        (product) =>
          product.price >= newQuery.selectedMin &&
          product.price <= newQuery.selectedMax &&
          newQuery.categoryStatus[product.category] &&
          product.rating.rate >= newQuery.selectedRating,
      )
      .map((product) => product.id);
    setVisibleIds(visibleProductIds);
    setQuery(newQuery);
  };

  // Run query on first render... lame
  useEffect(() => {
    handleQueryChange(query);
  }, []);

  return (
    <ResponsiveController>
      <Container forwardedAs="main">
        {productList && (
          <ShopGrid>
            <DesktopProductFilter
              query={query}
              minPrice={minPrice}
              maxPrice={maxPrice}
              maxRating={5}
              onQueryChange={handleQueryChange}
            />
            <ProductList products={visibleProducts} />
          </ShopGrid>
        )}
      </Container>
      <MobileProductFilter
        query={query}
        minPrice={minPrice}
        maxPrice={maxPrice}
        maxRating={5}
        onQueryChange={handleQueryChange}
      />
    </ResponsiveController>
  );
}
