// Select nativo estilizado
import { forwardRef } from "react";

const Select = forwardRef(({ options, placeholder, error, className = "", ...props }, ref) => {
  return (
    <select
      ref={ref}
      autoComplete="off"
      className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gft-lightblue focus:border-transparent transition-all appearance-none cursor-pointer ${
        error ? "border-red-400" : "border-gray-300"
      } ${props.disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""} ${className}`}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) =>
        typeof opt === "string" ? (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ) : (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        )
      )}
    </select>
  );
});

Select.displayName = "Select";

export default Select;
