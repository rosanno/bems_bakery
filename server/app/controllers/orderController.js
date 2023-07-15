import Order from "../models/order.js";
import Category from "../models/category.js";

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);

    const order = await newOrder.save();

    res.status(201).json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "customer",
        select: "name addresses email",
      })
      .populate({
        path: "products.orderItem",
        select: "name price category",
      });

    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderList = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "customer",
        select: "name addresses email",
      })
      .populate({
        path: "products.orderItem",
        select: "name price category",
      });

    const transformData = orders.map((order) => {
      const { addresses } = order.customer;
      const addressObjs = addresses.map((address) => address.address);

      const productObjs = order.products.map((product) => ({ name: product.orderItem.name }));

      const { _id: customerId, name: customerName } = order.customer;
      const [firstName, lastName] = customerName.split(" ");

      const transformedOrder = {
        id: order._id,
        status: order.paymentStatus,
        totalPrice: order.totalPrice,
        numberOfItems: order.products.length,
        customer: {
          id: customerId,
          firstName,
          lastName,
          address: addressObjs[0],
        },
        orderItem: productObjs[0],
        createdAt: order.createdAt.toISOString(),
        updatedAt: order.updatedAt.toISOString(),
      };

      return transformedOrder;
    });

    res.status(200).json({ data: transformData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { userId } = req.params;

    const foundOrder = await Order.findOne({ customer: userId }).populate("products.orderItem");

    if (!foundOrder) return res.status(404).json({ message: "Order not found!" });

    res.status(200).json({ order: foundOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
