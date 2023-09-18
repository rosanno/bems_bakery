import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import IconButton from "./IconButton";

const QuantityInput = ({ quantity, setQuantity }) => {
  return (
    <div className="flex items-center gap-1 py-4">
      <IconButton
        icon={<AiOutlineMinus />}
        variant="danger"
        disabled={quantity === 0}
        onClick={() => setQuantity(quantity - 1)}
      />
      <input
        type="number"
        value={quantity}
        className="py-[3px] px-2 border text-center rounded-md w-10"
        readOnly
      />
      <IconButton
        icon={<AiOutlinePlus />}
        variant="danger"
        onClick={() => setQuantity(quantity + 1)}
      />
    </div>
  );
};

export default QuantityInput;
