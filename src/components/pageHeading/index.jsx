import styled from 'styled-components';

const StyledHeading = styled.h1`
  font-size: 4rem;
  font-weight: 300;
`;

export default function PageHeading({ children }) {
  return <StyledHeading>{children}</StyledHeading>;
}
