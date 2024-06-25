import Container from '../../components/container';
import ProductFilter from '../../components/productFilter';
import ProductList from '../../components/productList';
import { getProducts } from '../../apis/products/products';
import { useLoaderData } from 'react-router';
import { useState } from 'react';
import styled from 'styled-components';

const ShopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
`;

const StickyFilter = styled(ProductFilter)`
  position: sticky;
  /* Height of Header component plus padding of product list, will line up */
  top: calc(135px + 1rem);
`;

export async function loader() {
  const products = await getProducts();
  return products;
}

export default function Shop() {
  const productList = useLoaderData();

  const [visibleIds, setVisibleIds] = useState(
    productList.map((product) => product.id),
  );

  const visibleProducts = productList.filter((product) =>
    visibleIds.includes(product.id),
  );

  return (
    <Container forwardedAs="main">
      {productList && (
        <ShopGrid>
          <StickyFilter products={productList} onChange={setVisibleIds} />
          <ProductList products={visibleProducts} />
        </ShopGrid>
      )}
    </Container>
  );
}
