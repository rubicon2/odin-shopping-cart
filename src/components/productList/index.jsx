import ProductCard from '../productCard';
import styled from 'styled-components';

const Container = styled.main`
  display: grid;
  grid-auto-rows: max-content;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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
