interface OptionsProps {
  option: {
    name: string,
    label: string,
  }
  handleCheckboxChange: (name: string) => void,
}

function OptionsComponent({option, handleCheckboxChange}: OptionsProps): JSX.Element {
  return (
    <div className="flex items-center mb-2">
      <input
      type="checkbox"
      id={option.name}
      className="w-4 h-4 accent-green-500"
      defaultChecked={true}
      onChange={() => handleCheckboxChange(option.name)}
      />
      <label htmlFor={option.name} className="ms-3 leading-2">{option.label}</label>
    </div>
  );
}

export default OptionsComponent;