import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // MongoDB connection options
    const options = {
      connectTimeoutMS: 10000, // 10 seconds
    };

    // Listening to events for better debugging
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connection established successfully.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connection disconnected.");
    });

    // Establish connection
    await mongoose.connect(process.env.MONGO_URI, options);

    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

// Event listener for process termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection closed due to app termination.");
  process.exit(0);
});

export default connectDB;
