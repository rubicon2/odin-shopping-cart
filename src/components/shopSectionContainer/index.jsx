import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid var(--color--light);
  border-radius: 5px;
  padding: 1.5rem;
`;

export default function ShopSectionContainer({ className, children, as }) {
  return (
    <Container className={className} as={as}>
      {children}
    </Container>
  );
}
