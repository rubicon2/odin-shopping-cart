import styled from 'styled-components';

const ContainerStyled = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
`;

export default function Container({ children, as = 'div', className = '' }) {
  return (
    <ContainerStyled data-testid="container" as={as} className={className}>
      {children}
    </ContainerStyled>
  );
}
