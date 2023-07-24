import Order from "../models/order.js";
import Cart from "../models/cart.js";

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.user;

    let existingCustomer = await Order.findOne({ customer: userId });

    if (!existingCustomer) {
      const orderItem = [];
      for (const product of req.body.products) {
        const item = {
          orderItem: product.orderItem,
          quantity: product.quantity,
          totalAmount: product.totalAmount,
          isDelivered: product.isDelivered,
          isReview: product.isReview,
        };

        orderItem.push(item);
      }

      const newOrder = new Order({
        customer: userId,
        products: orderItem,
        totalPrice: req.body.totalPrice,
      });

      await newOrder.save();

      await Cart.findOneAndUpdate({ user: userId }, { items: [] });

      return res.status(200).json({ message: "Order recieved.", status: 200 });
    } else {
      const orderItem = [];
      for (const product of req.body.products) {
        const item = {
          orderItem: product.orderItem,
          quantity: product.quantity,
          isDelivered: product.isDelivered,
          isReview: product.isReview,
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
