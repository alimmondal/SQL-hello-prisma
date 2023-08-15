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

const getPostFromDb = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit);

  const take = parseInt(limit);

  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
      skip,
      take,
      // select: {
      //   email: true,
      //   name: true,
      // },
      include: {
        category: true,
        author: true,
      },
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: "asc" },
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    const total = await tx.post.count();
    return { total: total, data: result };
  });
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

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  const result = await prisma.post.update({
    where: { id },
    data: payload,
  });
  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: { id },
  });
  return result;
};

export const PostService = {
  insertPostIntoDb,
  getPostFromDb,
  getSinglePostFromDb,
  updatePost,
  deletePost,
};

/*
 *limit = 5
 *page = 1
 *total = 10
 *take = limit
 *skip = limit * page - limit
 *      =5*1-5=0
 * 1 2 3 4 5 6 7 8 9 10 11
 */
