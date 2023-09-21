import Message from "../models/message.js";

export const sendMessage = async (req, res) => {
  const { name, email, messages } = req.body;
  try {
    const message = new Message({ name, email, messages });

    await message.save();

    res.status(200).json({ message: "message send" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
