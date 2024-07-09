import styled from 'styled-components';

const Select = styled.select`
  background-color: white;
  border: 1px solid var(--color--light);
  border-radius: 5px;
`;

export default function SelectRange(props) {
  const { min, max, value, onChange, onBlur, ...otherProps } = props;
  const possibleValues = [];
  for (let current = min; current <= max; current++) {
    possibleValues.push(current);
  }

  return (
    <Select value={value} onChange={onChange} onBlur={onBlur} {...otherProps}>
      {possibleValues.map((possibleValue) => (
        <option key={possibleValue} value={possibleValue}>
          {possibleValue}
        </option>
      ))}
    </Select>
  );
}
