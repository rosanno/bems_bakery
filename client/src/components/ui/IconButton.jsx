const IconButton = ({
  icon,
  isCart = false,
  disabled,
  count,
  variant,
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
    default:
      style = "border hover:bg-gray-300/20";
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${style} p-2 rounded-md relative transition-colors duration-300 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {icon}
      {isCart && count !== 0 && (
        <span className="absolute -top-2 -right-1 text-xs text-black font-semibold bg-white shadow-md rounded-full h-4 w-4 transition-all duration-300">
          {count}
        </span>
      )}
    </button>
  );
};

export default IconButton;
