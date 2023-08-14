import { Request, Response } from "express";
import { UserService } from "../user/user.service";
import { CategoryService } from "./category.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.insertCategoryIntoDb(req.body);
    res.send({
      success: true,
      message: "Category inserted successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const createOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertOrUpdateProfile(req.body);
    res.send({
      success: true,
      message: "Profile inserted/ updated successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUsersFromDb();
    res.send({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getSingleUserFromDb(
      parseInt(req.params.id)
    );
    res.send({
      success: true,
      message: "User retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const CategoryController = {
  createCategory,
  getUsers,
  getSingleUser,
};
