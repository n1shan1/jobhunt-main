import { Webhook } from "svix";
import User from "../models/Users.js";

export const clerkWebhook = async (req, res) => {
  try {
    // Validate environment variable
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      throw new Error("CLERK_WEBHOOK_SECRET is not defined.");
    }

    // Create Svix instance and verify webhook
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    webhook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    if (!data) {
      return res.status(400).json({ success: false, msg: "Invalid payload." });
    }

    const extractUserData = (data) => ({
      email: data.email_addresses?.[0]?.email_address || "",
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || "",
    });

    switch (type) {
      case "user.created": {
        const userData = { ...extractUserData(data), _id: data.id, resume: "" };
        await User.create(userData);
        return res.status(201).json({ success: true, msg: "User created." });
      }

      case "user.updated": {
        const userData = extractUserData(data);
        await User.findByIdAndUpdate(data.id, userData);
        return res.status(200).json({ success: true, msg: "User updated." });
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        return res.status(200).json({ success: true, msg: "User deleted." });
      }

      default:
        return res.status(204).send(); // No action for unhandled events
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ success: false, msg: "Webhook error." });
  }
};
