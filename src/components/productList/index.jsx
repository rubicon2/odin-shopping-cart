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
        <div key={product.id}>
          <h3>{product.title}</h3>
          <img src={product.image} alt="" />
          <span>£{product.price.toFixed(2)}</span>
        </div>
      ))}
    </Container>
  );
}
