import Container from '../../components/container';
import PageHeading from '../../components/pageHeading';
import ProductFilter from '../../components/productFilter';
import ProductList from '../../components/productList';
import { getProducts } from '../../apis/products/products';
import { useLoaderData } from 'react-router';
import { useState } from 'react';
import styled from 'styled-components';

const ShopContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 2rem;
`;

const StickyFilter = styled(ProductFilter)`
  position: sticky;
  top: 1rem;
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
    <Container as="main">
      <PageHeading>Shop</PageHeading>
      {productList && (
        <ShopContainer>
          <StickyFilter products={productList} onChange={setVisibleIds} />
          <ProductList products={visibleProducts} />
        </ShopContainer>
      )}
    </Container>
  );
}
