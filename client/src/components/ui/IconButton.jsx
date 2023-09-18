const IconButton = ({ icon, disabled, variant, onClick }) => {
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
    </button>
  );
};

export default IconButton;
