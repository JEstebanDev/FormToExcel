// Input de texto base reutilizable
import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      error,
      className = "",
      allowOnlyNumbers = false,
      allowPattern = null,
      onChange,
      ...props
    },
    ref
  ) => {
    const handleChange = (e) => {
      let value = e.target.value;

      // Filter by pattern
      if (allowOnlyNumbers) {
        value = value.replace(/[^\d]/g, "");
      } else if (allowPattern) {
        const regex = new RegExp(`[^${allowPattern}]`, "g");
        value = value.replace(regex, "");
      }

      // Update input value
      e.target.value = value;

      // Call original onChange
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <input
        ref={ref}
        autoComplete="off"
        className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gft-lightblue focus:border-transparent transition-all ${
          error ? "border-red-400" : "border-gray-300"
        } ${props.disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""} ${className}`}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
