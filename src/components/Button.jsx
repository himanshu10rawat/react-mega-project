const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary",
  };

  return (
    <button
      type={type}
      {...props}
      className={`font-semibold transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
