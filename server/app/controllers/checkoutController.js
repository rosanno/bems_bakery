import Order from "../models/order.js";
import Cart from "../models/cart.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

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
      existingCustomer.totalPrice = req.body.totalPrice;
      existingCustomer.products.push(...orderItem);
      existingCustomer.save();

      await Cart.findOneAndUpdate({ user: userId }, { items: [] });

      res
        .status(200)
        .json({ message: "Order updated successfully and cart cleared.", status: 200 });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const stripeOrder = async (req, res) => {
//   try {
//     const { userId } = req.user;

//     let existingCustomer = await Order.findOne({ customer: userId });

//     if (!existingCustomer) {
//       const orderItem = [];
//       for (const product of req.body.products) {
//         const item = {
//           orderItem: product.orderItem,
//           quantity: product.quantity,
//           totalAmount: product.totalAmount,
//           isDelivered: product.isDelivered,
//           isReview: product.isReview,
//           paymentStatus: "Paid",
//         };

//         orderItem.push(item);
//       }

//       const newOrder = new Order({
//         customer: userId,
//         products: orderItem,
//         totalPrice: req.body.totalPrice,
//       });

//       await newOrder.save();

//       console.log(newOrder);

//       // await Cart.findOneAndUpdate({ user: userId }, { items: [] });

//       // return res.status(200).json({ message: "Order recieved.", status: 200 });
//     } else {
//       const orderItem = [];
//       for (const product of req.body.products) {
//         const item = {
//           orderItem: product.orderItem,
//           quantity: product.quantity,
//           isDelivered: product.isDelivered,
//           isReview: product.isReview,
//           paymentStatus: "Paid",
//         };

//         orderItem.push(item);
//       }
//       existingCustomer.totalPrice = req.body.totalPrice;
//       existingCustomer.products.push(...orderItem);
//       existingCustomer.save();

//       console.log(existingCustomer);

//       await Cart.findOneAndUpdate({ user: userId }, { items: [] });

//       res
//         .status(200)
//         .json({ message: "Order updated successfully and cart cleared.", status: 200 });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const stripeCheckout = async (req, res) => {
//   const line_items = req.body.cartItems.map((item) => {
//     return {
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.productId.name,
//           images: [item.productId.imageURL],
//           description: item.productId.description,
//           metadata: {
//             id: item._id,
//           },
//         },
//         unit_amount: item.productId.price,
//       },
//       quantity: item.quantity,
//     };
//   });

//   const session = await stripe.checkout.sessions.create({
//     line_items,
//     mode: "payment",
//     success_url: `${process.env.CLIENT_URL}/stripe/success`,
//     cancel_url: `${process.env.CLIENT_URL}/checkout`,
//   });

//   res.send({ url: session.url });
// };
