import { Context } from "../../typings";
import * as service from "./Album.service";

/**
 * Resolvers for Album
 */

export default {
  Mutation: {
    createAlbum: (_, { input }, context: Context) =>
      service.createAlbum(input, context),
    deleteAlbum: (_, { id }, { prisma }: Context) =>
      prisma.album.delete({ where: { id } })
  },
  Query: {
    album: (_, { id }, { prisma }: Context) =>
      prisma.album.findOne({ where: { id } }),
    albums: (_, __, { prisma }: Context) =>
      prisma.album.findMany({ orderBy: { name: "asc" } })
  },
  Album: {
    uploadedBy: ({ id }: any, _, { prisma }: Context) => {
      return prisma.album.findOne({ where: { id } }).uploadedBy();
    },
    artists: ({ id }: any, _, { prisma }: Context) => {
      return prisma.album.findOne({ where: { id } }).artists();
    },
    artwork: ({ id }: any, _, { prisma }: Context) => {
      return prisma.album.findOne({ where: { id } }).artwork();
    },
    tracks: ({ id }: any, { orderBy }, { prisma }: Context) => {
      return prisma.album
        .findOne({ where: { id } })
        .tracks({ orderBy: { trackNumber: orderBy || "asc" } });
    }
  },
  Node: {
    __resolveType() {
      return null;
    }
  }
};
