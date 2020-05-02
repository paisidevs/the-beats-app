import { UserCreateInput, UserUpdateInput } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Context } from "../../typings";
import { generateToken, getAuthenticatedUser, hashPassword } from "../../utils";
import { ForbiddenError, UnknownError } from "../../utils/errors";

/**
 * Creates a user
 * @param user - Object of user to create
 * @param context - Exposes prisma
 */
export const createUser = async (user, { prisma }: Context) => {
  const { email, password, username, role } = user;

  const userExists = await prisma.user.findOne({ where: { email } });

  if (userExists) {
    throw new Error("An account with this email already exists!");
  }

  const hashedPassword = await hashPassword(password);

  const payload: UserCreateInput = {
    email,
    password: hashedPassword,
    username: username || email,
    ...(role ? { role } : {})
  };

  try {
    const user = await prisma.user.create({ data: payload });

    const { id, ...attributes } = user;

    return {
      id,
      accessToken: generateToken(user),
      attributes
    };
  } catch (error) {
    throw new UnknownError({
      message: error.message
    });
  }
};

/**
 * Updates a user
 * @param input - Object of fields to update
 * @param context - Exposes prisma
 */
export const updateUser = async (input, context: Context) => {
  const { prisma, request } = context;
  const authenticatedUserId = getAuthenticatedUser(request).id;

  const userExists = await prisma.user.findOne({
    where: { id: authenticatedUserId }
  });

  if (!userExists) {
    throw new Error("Account doesn't exist!");
  }

  const payload: UserUpdateInput = input;

  try {
    const user = await prisma.user.update({
      data: payload,
      where: { id: authenticatedUserId }
    });
    return user;
  } catch (error) {
    throw new UnknownError({
      message: error.message
    });
  }
};

/**
 * Deletes a user
 * @param id - ID of user to delete
 * @param context - Exposes prisma
 */
export const deleteUser = async (id, context: Context) => {
  const { prisma, request } = context;
  const authenticatedUserId = getAuthenticatedUser(request).id;

  const userExists = await prisma.user.findOne({
    where: { id: authenticatedUserId }
  });

  if (!userExists) {
    throw new Error("Account doesn't exist!");
  }

  if (id !== authenticatedUserId) {
    throw new ForbiddenError({
      message: "Unauthorized delete operation."
    });
  }

  try {
    const user = await prisma.user.delete({
      where: { id: authenticatedUserId }
    });

    return user;
  } catch (error) {
    throw new UnknownError({
      message: error.message
    });
  }
};

/**
 * Logs in a user
 * @param userCredentials - Object of user credentials
 * @param context - Exposes prisma
 */
export const authenticateUser = async (
  userCredentials: { email: string; password: string },
  { prisma }: Context
) => {
  const { email, password } = userCredentials;
  const user = await await prisma.user.findOne({ where: { email } });

  if (!user) {
    throw new Error("Account doesn't exist!");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("Invalid email/password combination!");
  }

  const { id, ...attributes } = user;

  return {
    id,
    accessToken: generateToken(user),
    attributes
  };
};
