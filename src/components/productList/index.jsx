import ProductCard from '../productCard';
import styled from 'styled-components';

const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 90vw), 1fr));
  gap: 1.5rem;
`;

export default function ProductList({ products }) {
  return (
    <Container>
      {products.length < 1 && 'No products found!'}
      {products.map((product) => (
        <ProductCard key={product.id} maxRating={5} product={product} />
      ))}
    </Container>
  );
}
