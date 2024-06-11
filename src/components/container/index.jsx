import styled from 'styled-components';

const Div = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export default function Container({ children, as = 'div' }) {
  return <Div as={as}>{children}</Div>;
}
