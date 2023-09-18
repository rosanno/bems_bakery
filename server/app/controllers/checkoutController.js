import Order from "../models/order.js";
import Cart from "../models/cart.js";

// Function to create a new order item
const createOrderItem = (item) => {
  return {
    product: item.product,
    orderItem: item.orderItem,
    quantity: item.quantity,
    total: item.total,
  };
};

// Function to handle creating or updating orders
const handleOrder = async (userId, orderItems) => {
  let existingCustomer = await Order.findOne({ customer: userId });

  if (!existingCustomer) {
    const newOrder = new Order({
      customer: userId,
      orderItems: orderItems,
    });

    await newOrder.save();
  } else {
    existingCustomer.orderItems.push(...orderItems);
    await existingCustomer.save();
  }
};

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.user;
    const orderItems = req.body.items.map(createOrderItem);

    await handleOrder(userId, orderItems);

    // Clear the cart after creating the order
    const userCart = await Cart.findOne({ user: userId });
    if (userCart) {
      await userCart.clearCart();
    }

    return res.status(200).json({ message: "Order received.", status: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
