import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertPostIntoDb = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

// const insertOrUpdateProfile = async (data: Post): Promise<Post> => {
//   const isExist = await prisma.profile.findUnique({
//     where: {
//       userId: data.userId,
//     },
//   });

//   if (isExist) {
//     const result = await prisma.post.update({
//       where: { userId: data.userId },
//       data: {
//         bio: data.bio,
//       },
//     });
//     return result;
//   }

//   const result = await prisma.post.create({ data });
//   return result;
// };

const getPostFromDb = async (options: any) => {
  const { sortBy, sortOrder } = options;
  const result = await prisma.post.findMany({
    // select: {
    //   email: true,
    //   name: true,
    // },
    include: {
      category: true,
      author: true,
    },
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  return result;
};

const getSinglePostFromDb = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

export const PostService = {
  insertPostIntoDb,
  getPostFromDb,
  getSinglePostFromDb,
};
