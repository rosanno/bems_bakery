import mongoose from "mongoose";
import Order from "../models/order.js";

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

    res.sendStatus(201);
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
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const search = req.query.search || "";

  try {
    const query = {};
    if (search) {
      // Case-insensitive search for customer names or any other relevant fields
      query["$or"] = [
        { "customer.name": { $regex: search, $options: "i" } },
        { "products.orderItem.name": { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * perPage;
    const ordersPromise = Order.find(query)
      .populate({
        path: "customer",
        select: "name addresses email",
      })
      .populate({
        path: "products.orderItem",
        select: "name price category",
      })
      .skip(skip)
      .limit(perPage)
      .exec();

    // Get the total count of orders (without pagination)
    const countPromise = Order.countDocuments(query).exec();

    // Execute both queries in parallel using Promise.all
    const [orders, totalCount] = await Promise.all([ordersPromise, countPromise]);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalCount / perPage);

    const transformData = orders.flatMap((order) => {
      const productItem = order.products.map((product) => {
        const { addresses } = order.customer;
        const addressObjs = addresses.map((address) => address.address);

        const { _id: customerId, name: customerName } = order.customer;
        const [firstName, lastName] = customerName.split(" ");

        const transformedOrder = {
          id: product._id,
          status: product.paymentStatus,
          totalPrice: order.totalPrice,
          quantity: product.quantity,
          numberOfItems: order.products.length,
          customer: {
            id: customerId,
            firstName,
            lastName,
            address: addressObjs[0],
          },
          orderItem: product.orderItem.name,
          createdAt: order.createdAt.toISOString(),
          updatedAt: order.updatedAt.toISOString(),
        };

        return transformedOrder;
      });

      return productItem;
    });

    res.status(200).json({ data: transformData, totalPages });
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

export const updateOrder = async (req, res) => {
  try {
    const { productId } = req.params;
    const { paymentStatus } = req.body;

    let foundOrder = await Order.findOne({
      "products._id": productId,
    });

    if (!foundOrder) return res.sendStatus(404);

    const productIndex = foundOrder.products.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res.sendStatus(404);
    }

    foundOrder.products[productIndex].paymentStatus = paymentStatus;

    await foundOrder.save();

    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteOrderList = async (req, res) => {
  try {
    const { productId } = req.params;
    const { customerId } = req.body;

    const order = await Order.findOne({ customer: customerId });

    if (!order) return res.status(404).json({ error: "Customer not found" });

    const orderItemIndex = order.products.findIndex(
      (product) => product.orderItem.toString() === productId
    );

    if (orderItemIndex === -1) {
      return res.status(404).json({ message: "Order item not found" });
    }

    order.products.splice(orderItemIndex, 1);
    order.save();

    res.json({ message: "Order item deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeOrder = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
