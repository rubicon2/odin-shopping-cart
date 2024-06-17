import ProductCard from '../productCard';
import styled from 'styled-components';

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: max-content;
  gap: 1.5rem;
`;

export default function ProductList({ products }) {
  return (
    <Container>
      {products.map((product) => (
        <ProductCard key={product.id} maxRating={5} product={product} />
      ))}
    </Container>
  );
}
