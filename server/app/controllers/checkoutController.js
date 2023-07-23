import Order from "../models/order.js";
import Cart from "../models/cart.js";

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.user;

    let existingCustomer = await Order.findOne({ customer: userId });

    if (!existingCustomer) {
      const newOrder = new Order(req.body);
      await newOrder.save();

      return res.sendStatus(201);
    } else {
      const orderItem = [];
      for (const product of req.body.products) {
        const item = {
          orderItem: product.orderItem,
          quantity: product.quantity,
        };

        orderItem.push(item);
      }

      existingCustomer.products.push(...orderItem);
      existingCustomer.save();
    }

    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    res.status(200).json({ message: "Order updated successfully and cart cleared.", status: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
