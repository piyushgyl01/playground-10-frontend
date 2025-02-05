export default function Select({ label, id, options, onChange, defaultValue }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select id={id} onChange={onChange} defaultValue={defaultValue}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}
