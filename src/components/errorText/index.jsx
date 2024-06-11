import styled from 'styled-components';

const StyledText = styled.span`
  font-size: 1.5rem;
  font-weight: 300;
  font-style: italic;
`;

export default function ErrorText({ children }) {
  return <StyledText>{children}</StyledText>;
}
