import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding-bottom: 1rem;
  margin-bottom: 1rem;

  border-bottom: 2px solid var(--color--shadow);

  &:last-of-type {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: none;
  }
`;

export default function FilterContainer({ className, children }) {
  return (
    <Container data-testid="filter-container" className={className}>
      {children}
    </Container>
  );
}
