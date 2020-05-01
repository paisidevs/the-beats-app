import { Context } from "../../typings";
import * as service from "./Track.service";

/**
 * Resolvers for Track
 */

export default {
  Mutation: {
    createTrack: (_, { input }, context: Context) =>
      service.createTrack(input, context)
  },
  Query: {
    track: (_, { id }, { prisma }: Context) =>
      prisma.track.findOne({ where: { id } }),
    tracks: (_, __, { prisma }: Context) =>
      prisma.track.findMany({ orderBy: { name: "asc" } })
  },
  Track: {
    album: ({ id }: any, _, { prisma }: Context) => {
      return prisma.track.findOne({ where: { id } }).album();
    },
    artists: ({ id }: any, _, { prisma }: Context) => {
      return prisma.track.findOne({ where: { id } }).artists();
    },
    featuring: ({ id }: any, _, { prisma }: Context) => {
      return prisma.track.findOne({ where: { id } }).featuring();
    }
  },
  Node: {
    __resolveType() {
      return null;
    }
  }
};
