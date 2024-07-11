import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  border: 1px solid var(--color--light);
  border-radius: 5px;
  padding: 1.5rem;
`;

export default function ShopSectionContainer(props) {
  const { children, ...otherProps } = props;
  return (
    <Container data-testid="shop-section-container" {...otherProps}>
      {children}
    </Container>
  );
}
