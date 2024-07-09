import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: white;
  color: var(--color-dark);
  font-weight: 600;
  padding: 0.3em 1em;
  border: 1px solid var(--color--light);
  border-radius: 5px;

  &:not(:disabled) {
    &:hover,
    &:focus-visible {
      background-color: var(--color--button--hover);
    }

    &:active {
      background-color: var(--color--button--select);
    }
  }

  &:disabled {
    background-color: var(--color--shadow);
    border: 1px solid var(--color--light);
    color: var(--color--light);
    cursor: not-allowed;
  }
`;

export default function Button(props) {
  const {
    className,
    children,
    value,
    disabled = false,
    onClick,
    ...otherProps
  } = props;
  return (
    <StyledButton
      className={className}
      disabled={disabled}
      value={value}
      onClick={onClick}
      {...otherProps}
    >
      {children}
    </StyledButton>
  );
}
