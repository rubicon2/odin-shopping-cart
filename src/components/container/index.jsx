import styled from 'styled-components';

export const ContainerStyled = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export default function Container({ children, as = 'div' }) {
  return <ContainerStyled as={as}>{children}</ContainerStyled>;
}
