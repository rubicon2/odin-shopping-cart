import styled from 'styled-components';

const Title = styled.h2`
  font-weight: 300;
  font-style: italic;
`;

export default function FilterTitle({ children }) {
  return <Title>{children}</Title>;
}
