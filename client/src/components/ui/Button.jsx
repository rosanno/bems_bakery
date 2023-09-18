const Button = ({
  children,
  variant,
  type = "button",
  disabled,
  className,
  onClick,
}) => {
  let style = "";

  switch (variant) {
    case "primary":
      style = "bg-[#155E75]";
      break;
    case "danger":
      style = "bg-[#F8605F] text-white hover:bg-[#f74949]";
      break;
    case "dark":
      style = "bg-[#121212] text-white hover:bg-[#292828]";
      break;
    default:
      style = "border hover:bg-gray-300/20";
  }

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${style} py-2 px-3 text-sm capitalize rounded-md relative transition-colors duration-300 ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
