// Wrapper genérico: label + input/children + mensaje de error

export default function FormField({ label, error, required = false, hint, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
          {hint && <span className="text-xs text-gray-400 font-normal ml-1">({hint})</span>}
        </label>
      )}
      {!hint && null}
      {children}
      {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
    </div>
  );
}
