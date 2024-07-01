import styled from 'styled-components';

const Select = styled.select`
  background-color: white;
  border: 1px solid var(--color--light);
  border-radius: 5px;
`;

export default function SelectRange({
  min,
  max,
  value,
  onChange,
  onBlur,
  id,
  className,
  ariaLabel,
}) {
  const possibleValues = [];
  for (let current = min; current <= max; current++) {
    possibleValues.push(current);
  }

  return (
    <Select
      id={id}
      aria-label={ariaLabel}
      className={className}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    >
      {possibleValues.map((possibleValue) => (
        <option key={possibleValue} value={possibleValue}>
          {possibleValue}
        </option>
      ))}
    </Select>
  );
}
