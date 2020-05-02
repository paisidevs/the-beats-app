import { writeFileSync } from "fs";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import * as path from "path";

const resolversArray = fileLoader(path.join(__dirname, "./**/*.resolver.ts"), {
  recursive: true
});

export const resolvers = mergeResolvers(resolversArray);
export const typeDefs = mergeTypes(fileLoader(`${__dirname}/**/*.graphql`), {
  all: true
});

writeFileSync("src/generated/schema.graphql", typeDefs);
