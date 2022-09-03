export const ErrorMessage = ({
  error,
  className,
}: {
  error?: string;
  className?: string;
}) => (
  <div
    className={`min-h-[24px] text-red-500 ${
      error ? "opacity-100" : "opacity-0"
    } ${className}`}
  >
    {error}
  </div>
);
