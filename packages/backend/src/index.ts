import { PrismaClient } from "@prisma/client";
import { GraphQLServer, Options } from "graphql-yoga";
import * as schema from "./schema";
import { formatError } from "./utils/apollo-errors";

const prisma = new PrismaClient();

const options: Options = {
  formatError
};

const server = new GraphQLServer({
  ...schema,
  context: contextParams => {
    return {
      ...contextParams,
      prisma
    };
  }
});

server.start(options, () =>
  console.log("Server is running on http://localhost:4000")
);
