import jwt from "jsonwebtoken";

const genToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  try {
    return jwt.sign(
      { id }, // Payload
      process.env.JWT_SECRET, // Secret key
      {
        expiresIn: "30d", // Expiry duration
        algorithm: "HS256", // Signing algorithm (explicitly specified)
      }
    );
  } catch (error) {
    console.error("Error generating JWT:", error.message);
    throw new Error("Failed to generate token.");
  }
};

export default genToken;
