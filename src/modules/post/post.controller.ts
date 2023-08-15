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

const getAllPosts = async (req: Request, res: Response) => {
  // console.log(req.query);
  const options = req.query;
  try {
    const result = await PostService.getPostFromDb(options);
    res.send({
      success: true,
      message: "Posts retrieved successfully",
      total: result.total,
      data: result.data,
    });
  } catch (error) {
    res.send(error);
  }
};

const updatePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const result = await PostService.updatePost(id, data);
    res.send({
      success: true,
      message: "Posts updated successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const deletePost = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const result = await PostService.deletePost(id);
    res.send({
      success: true,
      message: "Posts deleted successfully",
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

const aggregateAndGrouping = async (req: Request, res: Response) => {
  try {
    const result = await PostService.aggregateAndGrouping();
    res.send({
      success: true,
      message: "result successful",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const PostController = {
  updatePost,
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost,
  aggregateAndGrouping,
};
