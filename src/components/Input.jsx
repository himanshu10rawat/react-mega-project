import React, { useId } from "react";

const Input = React.forwardRef(
  ({ label, type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label
            className="inline-block mb-2 pl-2 text-sm font-semibold text-gray-200"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={id}
          className={`input-modern w-full ${className}`}
          {...props}
          ref={ref}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
