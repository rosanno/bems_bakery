import { useState } from "react";
import { useDispatch } from "react-redux";
import { GrClose } from "react-icons/gr";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import toast from "react-hot-toast";

import {
  useRemoveCartItemMutation,
  useUpdateQuantityMutation,
} from "../services/cakeApi";
import IconButton from "./ui/IconButton";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [removeItem] = useRemoveCartItemMutation();
  const [quantity, setQuantity] = useState(item.quantity);
  const [updateQty, { isLoading }] = useUpdateQuantityMutation();

  const handleQuantity = (qty) => {
    setQuantity((prevQuantity) => prevQuantity + qty);
    onUpdate(quantity + qty); // Use the updated quantity value
  };

  const onUpdate = async (quantity) => {
    const res = await updateQty({
      data: {
        cakeId: item.product._id,
        quantity,
      },
    });

    toast.success(res?.data?.message, {
      style: {
        fontSize: ".8rem",
      },
    });
  };

  const onDelete = async (cakeId) => {
    const res = await removeItem({ cakeId });
    toast.success(res.data.message);
  };

  return (
    <li className="flex py-4 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-28 sm:w-28">
        <img
          src={item.product.imageURL}
          alt={item.product.name}
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-[5] right-0 top-0">
          <div
            onClick={() => onDelete(item.product._id)}
            className="border rounded-full shadow-md p-1.5 cursor-pointer"
          >
            <GrClose size={10} />
          </div>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex flex-col">
            <p className="text-lg font-semibold text-black">
              {item.product.name}
            </p>
            <p className="text-[#FF5E42] font-semibold my-1">
              ₱{item.product.price}
            </p>
            <div className="flex text-center items-center gap-1 pt-2">
              <IconButton
                icon={<AiOutlineMinus />}
                variant="danger"
                disabled={quantity === 1}
                onClick={() => handleQuantity(-1)}
              />
              <input
                type="number"
                value={quantity}
                readOnly
                className="py-1 px-2 border rounded-md w-10 text-base text-center outline-none pointer-events-none"
              />
              <IconButton
                icon={<AiOutlinePlus />}
                variant="danger"
                onClick={() => handleQuantity(1)}
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
