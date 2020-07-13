import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { APP_SECRET, JWT_EXPIRES_IN } from "../constants";

/**
 * Generates JWT token from user object
 */
export const generateToken = (user: User) => {
  const payload = {
    userId: user.id,
    role: user.role
  };

  return jwt.sign(payload, APP_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};
