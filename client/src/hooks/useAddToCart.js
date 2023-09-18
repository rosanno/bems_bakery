import toast from "react-hot-toast";

const useAddToCart = (accessToken, navigate, addItemToCart) => {
  const addToCart = async (event, cakeId, price, quantity = 1) => {
    event.stopPropagation();

    /**
     * check if accessToken exist
     * if not exist redirect to login page
     * */
    if (!accessToken) {
      navigate("/login");
      return;
    }

    const data = {
      cakeId,
      quantity,
      price,
    };

    const res = await addItemToCart({ data });
    if (res.data) {
      toast.success(res.data.message);
    }
  };

  return {
    addToCart,
  };
};

export default useAddToCart;
