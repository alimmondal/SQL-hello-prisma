import { Request, Response } from "express";
import { PostService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.insertPostIntoDb(req.body);
    res.send({
      success: true,
      message: "Post inserted successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

// const createOrUpdateProfile = async (req: Request, res: Response) => {
//   try {
//     const result = await UserService.insertOrUpdateProfile(req.body);
//     res.send({
//       success: true,
//       message: "Profile inserted/ updated successfully",
//       data: result,
//     });
//   } catch (error) {
//     res.send(error);
//   }
// };

const getAllPosts = async (req: Request, res: Response) => {
  console.log(req.query);
  const options = req.query;
  try {
    const result = await PostService.getPostFromDb(options);
    res.send({
      success: true,
      message: "Posts retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getSinglePost = async (req: Request, res: Response) => {
  try {
    const result = await PostService.getSinglePostFromDb(
      parseInt(req.params.id)
    );
    res.send({
      success: true,
      message: "Post retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const PostController = {
  createPost,
  getAllPosts,
  getSinglePost,
};
