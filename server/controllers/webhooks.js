import { Webhook } from "svix";
import User from "../models/users.js";

//Api controller function

export const clerkWebhook = async (req, res) => {
  try {
    //create a svix instance with clerk webhook secret
    const webHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    //verifying headers
    await webHook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamps"],
      "svix-signature": req.headers["svix-signature"],
    });

    //getting data from req body
    const { data, type } = req.body;
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + data.last_name,
          image: data.image_url,
          resume: "",
        };
        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + data.last_name,
          image: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, msg: "Webhooks Error" });
  }
};
