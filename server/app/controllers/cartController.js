import Cart from "../models/cart.js";

export const addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const { userId } = req.user;

  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingCartItem = cart.items.find((item) => item.productId.toString() === product_id);
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      cart.items.push({ productId: product_id, quantity });
    }

    await cart.save();

    res.status(200).json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCartItems = async (req, res) => {
  const { userId } = req.user;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for the user" });
    }

    res.status(200).json({ cartItems: cart.items });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCartItem = async (req, res) => {
  const { product_id, quantity } = req.body;
  const { userId } = req.user;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for the user" });
    }

    const cartItemIndex = cart.items.findIndex((item) => item.productId.toString() === product_id);

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    cart.items[cartItemIndex].quantity = quantity;

    await cart.save();

    res.status(200).json({ message: "Cart item updated successfully", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCartItem = async (req, res) => {
  const { product_id } = req.params;
  const { userId } = req.user;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for the user" });
    }

    const cartItemIndex = cart.items.findIndex((item) => item.productId.toString() === product_id);

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    cart.items.splice(cartItemIndex, 1);

    await cart.save();

    res.status(200).json({ message: "Cart item deleted successfully", cart });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the cart item" });
  }
};
