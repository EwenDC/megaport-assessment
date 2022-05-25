import { useId } from "react";

function Input({ value, setValue, type, children }) {
  const id = useId();
  return (
    <span className="appInput">
      <label htmlFor={id}>{children}</label>
      <input
        id={id}
        type={type || "text"}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </span>
  );
}

export default Input;
