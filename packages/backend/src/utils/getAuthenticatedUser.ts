import { Role } from "@prisma/client";
import { Request } from "express";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../constants";

interface Token {
  role: Role;
  userId: number;
}

/**
 * Get authenticatedUser from JWT
 */
export const getAuthenticatedUser = (
  request: Request
): { id: number; role: string } => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new Error("Authentication required!");
  }

  const token = authorization.replace("Bearer ", "");
  const decoded = jwt.verify(token, APP_SECRET) as Token;

  return {
    id: decoded.userId,
    role: decoded.role
  };
};
