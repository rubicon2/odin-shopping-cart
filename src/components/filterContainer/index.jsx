import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  padding-bottom: 0.5rem;

  &:last-of-type {
    padding-bottom: 0;
  }
`;

export default function FilterContainer({ className, children }) {
  return <Container className={className}>{children}</Container>;
}
