import Cart from "../models/cart.js";
import Product from "../models/product.js";

export const addToCart = async (req, res) => {
  const { cakeId, price, quantity } = req.body;
  const { userId } = req.user;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    // Find the index of the existing cart item with the same cakeId
    const existingCartItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === cakeId
    );

    if (existingCartItemIndex !== -1) {
      // If the item already exists, update its quantity and recalculate the total
      cart.items[existingCartItemIndex].quantity += quantity;
      cart.total += price * quantity; // Update the total based on the new quantity
    } else {
      // If the item doesn't exist, add it to the cart
      cart.total += price * quantity; // Calculate the total for the new item
      cart.items.push({ product: cakeId, quantity });
    }

    await cart.save();

    res.status(200).json({ message: "Added to cart", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCartItems = async (req, res) => {
  const { userId } = req.user;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for the user" });
    }

    res.status(200).json({ cartItems: cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCartItem = async (req, res) => {
  const { cakeId, quantity } = req.body;
  const { userId } = req.user;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for the user" });
    }

    const cartItemIndex = cart.items.findIndex(
      (item) => item.product.toString() === cakeId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    cart.items[cartItemIndex].quantity = quantity;

    const product = await Product.findById(cakeId);
    const pricePerUnit = product.price;
    const newTotalAmount = pricePerUnit * quantity;

    cart.total = newTotalAmount;

    await cart.save();

    res.status(200).json({ message: "quantity updated", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCartItem = async (req, res) => {
  const { cakeId } = req.params;
  const { userId } = req.user;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for the user" });
    }

    const cartItemIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === cakeId
    );

    if (cartItemIndex === -1) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    // Get the price of the deleted item
    const itemPrice = cart.items[cartItemIndex].product.price;

    // Ensure itemPrice is a number
    if (typeof itemPrice !== "number") {
      return res.status(500).json({ error: "Invalid item price" });
    }

    // Subtract the price of the deleted item from the total
    cart.total -= itemPrice;

    // Make sure the total is not negative
    if (cart.total < 0) {
      cart.total = 0;
    }

    // Remove the item from the cart
    cart.items.splice(cartItemIndex, 1);

    await cart.save();

    res.status(200).json({ message: "deleted successfully", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

