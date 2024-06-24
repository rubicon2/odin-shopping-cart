import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: white;
  color: var(--color-dark);
  font-weight: 600;
  padding: 0.3em 1em;
  border: 1px solid var(--color--light);
  border-radius: 5px;

  &:hover,
  &:focus-visible {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.5);
  }
`;

export default function Button({ className, children, value, onClick }) {
  return (
    <StyledButton className={className} value={value} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
