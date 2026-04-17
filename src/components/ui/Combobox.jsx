import { useState, useRef } from "react";

export default function Combobox({
  options = [],
  placeholder = "Selecciona o escribe...",
  error,
  value = "",
  onChange,
  onBlur,
  name,
  disabled = false,
}) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);

  // Normalize options to { value, label }
  const normalizedOptions = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );

  const getLabel = (val) => {
    if (!val) return "";
    const found = normalizedOptions.find((opt) => opt.value === val);
    return found ? found.label : val;
  };

  // When typing, filter; otherwise show all
  const filtered =
    isOpen && isTyping && inputValue
      ? normalizedOptions.filter((opt) =>
          opt.label.toLowerCase().includes(inputValue.toLowerCase())
        )
      : normalizedOptions;

  const handleFocus = () => {
    setInputValue(getLabel(value));
    setIsTyping(false);
    setIsOpen(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIsTyping(true);
    setIsOpen(true);
  };

  const handleSelect = (opt) => {
    onChange(opt.value);
    setIsTyping(false);
    setIsOpen(false);
    setInputValue("");
    inputRef.current?.blur();
  };

  const handleBlur = () => {
    // Delay to allow mousedown on option to fire first
    setTimeout(() => {
      setIsOpen(false);
      setInputValue("");
      setIsTyping(false);
      onBlur?.();
    }, 150);
  };

  // Input shows typed text when open, selected label when closed
  const displayText = isOpen ? inputValue : getLabel(value);

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          name={name}
          value={displayText}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          className={`w-full px-3 py-2 pr-8 border rounded-lg text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-gft-lightblue focus:border-transparent transition-all ${
            error ? "border-red-400" : "border-gray-300"
          } ${disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}`}
        />
        <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </div>

      {isOpen && filtered.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
          {filtered.map((opt) => (
            <li
              key={opt.value}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-blue-50 hover:text-gft-blue ${
                opt.value === value
                  ? "bg-blue-50 font-medium text-gft-blue"
                  : "text-gray-800"
              }`}
              onMouseDown={(e) => {
                e.preventDefault(); // prevent blur before click
                handleSelect(opt);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {isOpen && filtered.length === 0 && isTyping && inputValue && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 text-sm text-gray-500">
          No se encontraron resultados
        </div>
      )}
    </div>
  );
}
