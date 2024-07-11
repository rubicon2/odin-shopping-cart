import ProductCard from '../productCard';
import styled from 'styled-components';

const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 90vw), 1fr));
  /* Ensure rows do not stretch to fill parent container */
  grid-auto-rows: min-content;
  gap: 1.5rem;
  /* This line ensures the sticky mobile filter sticks to the bottom but does not */
  /* overlap the last item on the product list like it would with position: fixed */
  /* Yes, this is not a good way of doing it, at all - but time to finish up this project. */
  min-height: 100vh;
`;

export default function ProductList({ products = [] }) {
  return (
    <Container data-testid="product-list" aria-label="Product list">
      {products.length < 1 && 'No products found!'}
      {products.map((product) => (
        <ProductCard key={product.id} maxRating={5} product={product} />
      ))}
    </Container>
  );
}
