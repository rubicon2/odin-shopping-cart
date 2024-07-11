import styled from 'styled-components';

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default function FilterLabel({ children, className }) {
  return (
    <Label data-testid="filter-label" className={className}>
      {children}
    </Label>
  );
}
