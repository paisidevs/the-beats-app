import { PrismaClient } from "@prisma/client";
import { createUser } from "../src/schema/User/User.service";
import { Context } from "../src/typings";
const prisma = new PrismaClient();

let context: Context = {
  prisma,
  request: undefined
};

async function main() {
  const user = await createUser(
    {
      email: "mpofuthandolwethu@gmail.com",
      firstName: "Thandolwethu",
      lastName: "Mpofu",
      password: "password",
      role: "ADMIN",
      username: "elandamor"
    },
    context
  );

  console.log("User created...", user);

  // const { id } = await prisma.user.create({
  //   data: {
  //     email: "mpofuthandolwethu@gmail.com",
  //     firstName: "Thandolwethu",
  //     lastName: "Mpofu",
  //     role: "ADMIN",
  //     username: "elandamor"
  //   }
  // });

  // await prisma.playlist.create({
  //   data: {
  //     alias: "a1beats",
  //     creator: {
  //       connect: { id }
  //     },
  //     name: "A1 Beats",
  //     numTracks: 0
  //   }
  // });
}
main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.disconnect();
  });

// let context: Context = {
//   prisma,
//   request: undefined
// };

// async function main() {
//   const userInput = {
//     email: "mpofuthandolwethu@gmail.com",
//     password: "Pass123!",
//     isAdmin: true
//   };

//   console.log("Creating user...");

//   const user = await createUser(
//     {
//       ...userInput
//     },
//     context
//   );

//   console.log("User created...");

//   context.request = {
//     headers: {
//       authorization: `Bearer ${user.token}`
//     }
//   };

//   /**
//    * Create albums
//    */

//   console.log("Creating albums...");

//   albumsToCreate.forEach(async album => {
//     console.log(`  Creating ${album.name}`);

//     await createAlbum(
//       {
//         ...album
//       },
//       context
//     );
//   });

//   console.log("Albums created...");
// }

// main().catch(e => console.error(e.message));
