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
    <select
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
    </select>
  );
}
