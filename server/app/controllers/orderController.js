import Order from "../models/order.js";
import User from "../models/user.js";

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
          totalAmount: product.totalAmount,
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
    let results;
    let totalCount;
    let totalPages;

    let query = {};
    if (search) {
      // Case-insensitive search for customer names or any other relevant fields
      const customers = await User.find({ name: { $regex: search, $options: "i" } });

      const customerIds = customers.map((customer) => customer._id);

      query = {
        $or: [
          { customer: { $in: customerIds } },
          { "products.orderItem.name": { $regex: search, $options: "i" } },
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
        path: "products.orderItem",
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

    const transformData = results.flatMap((order) => {
      const productItem = order.products.map((product) => {
        const { addresses } = order.customer;
        const addressObjs = addresses.map((address) => address.address);

        const { _id: customerId, name: customerName } = order.customer;
        const [firstName, lastName] = customerName.split(" ");

        const transformedOrder = {
          id: product._id,
          status: product.paymentStatus,
          deliveryStatus: product.isDelivered,
          totalPrice: product.totalAmount,
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
    const { userId } = req.user;

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

export const updateDeliveryStatus = async (req, res) => {
  try {
    const { productId } = req.params;
    const { deliveryStatus } = req.body;

    let foundOrder = await Order.findOne({
      "products._id": productId,
    });

    console.log("test");

    if (!foundOrder) return res.sendStatus(404);

    const productIndex = foundOrder.products.findIndex(
      (product) => product._id.toString() === productId
    );

    if (productIndex === -1) {
      return res.sendStatus(404);
    }

    foundOrder.products[productIndex].isDelivered = deliveryStatus;

    await foundOrder.save();

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
        path: "products.orderItem",
        select: "name price category",
      });

    let totalRevenue = 0;

    orders.forEach((order) => {
      order.products.forEach((product) => {
        if (product.paymentStatus === "Paid") {
          totalRevenue += product.orderItem.price * product.quantity;
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
        path: "products.orderItem",
        select: "name price category",
      });

    let salesCount = 0;

    orders.forEach((order) => {
      order.products.forEach((product) => {
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
        path: "products.orderItem",
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
      if (order.products.some((product) => product.paymentStatus === "Paid")) {
        // Get the month from the createdAt date
        const createdAtDate = new Date(order.createdAt);
        const month = createdAtDate.getMonth();

        // Calculate the total revenue for the order
        const orderRevenue = order.products.reduce((total, product) => {
          if (product.paymentStatus === "Paid") {
            return total + product.orderItem.price * product.quantity;
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

    const orderItemIndex = order.products.findIndex(
      (product) => product._id.toString() === productId
    );

    if (orderItemIndex === -1) {
      return res.status(404).json({ message: "Order item not found" });
    }

    order.products.splice(orderItemIndex, 1);
    order.save();

    res.json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
