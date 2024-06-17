import styled from 'styled-components';

const Container = styled.div`
  border: 2px solid var(--color--light);
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 5px 5px 5px 5px var(--color--shadow);
`;

export default function ShopSectionContainer({ className, children, as }) {
  return (
    <Container className={className} as={as}>
      {children}
    </Container>
  );
}
