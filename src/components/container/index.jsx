import styled from 'styled-components';

const ContainerStyled = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 0;
`;

export default function Container({ children, as = 'div', className = '' }) {
  return (
    <ContainerStyled as={as} className={className}>
      {children}
    </ContainerStyled>
  );
}
