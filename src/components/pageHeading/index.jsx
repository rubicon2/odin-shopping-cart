import styled from 'styled-components';

const StyledHeading = styled.h2`
  font-size: 2.5rem;
  font-weight: 300;
`;

export default function PageHeading({ className, children }) {
  return <StyledHeading className={className}>{children}</StyledHeading>;
}
