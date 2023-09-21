import Order from "../models/order.js";
import User from "../models/user.js";

export const createOrder = async (req, res) => {
  try {
    const { userId } = req.user;

    // Check if an order already exists for the customer
    let existingOrder = await Order.findOne({ customer: userId });

    if (!existingOrder) {
      // If no existing order, create a new order
      const newOrder = new Order({
        customer: userId,
        orderItems: req.body.orderItems,
      });

      await newOrder.save();
    } else {
      for (const incomingItem of req.body.orderItems) {
        // If the item is not found in the order, add it as a new order item
        existingOrder.orderItems.push(incomingItem);
      }

      await existingOrder.save();
    }

    res.status(201).json({ message: "Order created" });
  } catch (error) {
    console.error(error);
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
        path: "orderItems.product",
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
    let results;
    let totalCount;
    let totalPages;

    let query = {};
    if (search) {
      // Case-insensitive search for customer names or any other relevant fields
      const customers = await User.find({
        name: { $regex: search, $options: "i" },
      });

      const customerIds = customers.map((customer) => customer._id);

      query = {
        $or: [
          { customer: { $in: customerIds } },
          { "orderItems.product.name": { $regex: search, $options: "i" } },
        ],
      };
    }

    const skip = (page - 1) * perPage;
    const ordersPromise = Order.find(query)
      .populate({
        path: "customer",
        select: "name addresses email",
      })
      .populate({
        path: "orderItems.product",
        select: "name price category",
      })
      .skip(skip)
      .limit(perPage)
      .exec();

    // Get the total count of orders (without pagination)
    const countPromise = Order.countDocuments(query).exec();

    // Execute both queries in parallel using Promise.all
    [results, totalCount] = await Promise.all([ordersPromise, countPromise]);

    // Calculate the total number of pages
    totalPages = Math.ceil(totalCount / perPage);

    res.status(200).json({ data: results, totalPages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { userId } = req.user;

    const order = await Order.findOne({ customer: userId }).populate(
      "orderItems.product"
    );

    if (!order) return res.status(404).json({ message: "Order not found!" });

    res.status(200).json({ order: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { paymentStatus } = req.body;

    let findOrder = await Order.findOne({
      "orderItems._id": orderId,
    });

    if (!findOrder) return res.sendStatus(404);

    const productIndex = findOrder.orderItems.findIndex(
      (product) => product._id.toString() === orderId
    );

    if (productIndex === -1) {
      return res.sendStatus(404);
    }

    findOrder.orderItems[productIndex].paymentStatus = paymentStatus;

    await findOrder.save();

    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { deliveryStatus } = req.body;

    let findOrder = await Order.findOne({
      "orderItems._id": orderId,
    });

    if (!findOrder) return res.sendStatus(404);

    const productIndex = findOrder.orderItems.findIndex(
      (product) => product._id.toString() === orderId
    );

    if (productIndex === -1) {
      return res.sendStatus(404);
    }

    findOrder.orderItems[productIndex].isDelivered = deliveryStatus;

    await findOrder.save();

    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTotalRevenue = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "customer",
        select: "name addresses email",
      })
      .populate({
        path: "orderItems.product",
        select: "name price category",
      });

    let totalRevenue = 0;

    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        if (item.paymentStatus === "Paid") {
          totalRevenue += item.total * item.quantity;
        }
      });
    });

    res.status(200).json({ totalRevenue });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getSalesCount = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "customer",
        select: "name addresses email",
      })
      .populate({
        path: "orderItems.product",
        select: "name price category",
      });

    let salesCount = 0;

    orders.forEach((order) => {
      order.orderItems.forEach((product) => {
        if (product.paymentStatus === "Paid") {
          salesCount += product.quantity;
        }
      });
    });

    res.status(200).json({ salesCount });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMonthlyRevenuePaidOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "customer",
        select: "name addresses email",
      })
      .populate({
        path: "orderItems.product",
        select: "name price category",
      });

    const monthlyRevenue = [
      { name: "Jan", total: 0 },
      { name: "Feb", total: 0 },
      { name: "Mar", total: 0 },
      { name: "Apr", total: 0 },
      { name: "May", total: 0 },
      { name: "Jun", total: 0 },
      { name: "Jul", total: 0 },
      { name: "Aug", total: 0 },
      { name: "Sep", total: 0 },
      { name: "Oct", total: 0 },
      { name: "Nov", total: 0 },
      { name: "Dec", total: 0 },
    ];

    orders.forEach((order) => {
      if (
        order.orderItems.some((product) => product.paymentStatus === "Paid")
      ) {
        // Get the month from the createdAt date
        const createdAtDate = new Date(order.createdAt);
        const month = createdAtDate.getMonth();

        // Calculate the total revenue for the order
        const orderRevenue = order.orderItems.reduce((total, product) => {
          if (product.paymentStatus === "Paid") {
            return total + product.product.price * product.quantity;
          }
          return total;
        }, 0);

        // Update the corresponding total value in the monthlyRevenue array
        monthlyRevenue[month].total += orderRevenue;
      }
    });

    res.status(200).json({ monthlyRevenue });
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

    const orderItemIndex = order.orderItems.findIndex(
      (product) => product._id.toString() === productId
    );

    if (orderItemIndex === -1) {
      return res.status(404).json({ message: "Order item not found" });
    }

    order.orderItems.splice(orderItemIndex, 1);
    order.save();

    res.json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
