export const ErrorMessage = ({
  error,
  touched,
  className,
}: {
  touched?: boolean;
  error?: string;
  className?: string;
}) => (
  <div
    className={`min-h-[24px] text-red-500 ${
      error && touched ? "opacity-100" : "opacity-0"
    } ${className}`}
  >
    {error}
  </div>
);
