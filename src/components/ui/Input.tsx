interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id || label.replace(/\s+/g, "-").toLowerCase();
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-stone-700"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`block w-full rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-700/20 focus:border-teal-700 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
            : "border-stone-300"
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
