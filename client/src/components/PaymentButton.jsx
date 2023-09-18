import { BsCircle } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";

const PaymentButton = ({
  icon,
  label,
  sublabel,
  paymentMethod,
  selectedPayment,
  onPaymentSelect,
  disabled = false,
}) => {
  const isSelected = paymentMethod === selectedPayment;

  const handlePayment = () => {
    if (!disabled) {
      onPaymentSelect(paymentMethod);
    }
  };

  return (
    <div
      className={`flex flex-col border ${
        isSelected ? "ring-1 ring-blue-400" : ""
      } pt-4 pb-1.5 px-4 rounded-md h-20 relative transition duration-300 ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      }`}
      onClick={handlePayment}
    >
      <div className="flex items-center gap-3">
        <img src={icon} alt="" className="w-7" />
        <p className="text-sm">{label}</p>
      </div>
      <div className="absolute top-3 right-3">
        {isSelected ? (
          <AiFillCheckCircle className="text-blue-500 text-lg" />
        ) : (
          <BsCircle className="text-gray-400" />
        )}
      </div>
      <p className="mt-auto text-xs text-gray-400">{sublabel}</p>
    </div>
  );
};

export default PaymentButton;
