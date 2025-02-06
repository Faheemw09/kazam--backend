import { Request, Response, NextFunction } from "express";
import Task from "../models/Task";
import { createTaskSchema, updateTaskSchema } from "../schema/task";

interface AuthRequest extends Request {
  userId?: string;
}

export const getTasks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await Task.find({ user: req.userId }).sort("-createdAt");
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = createTaskSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const task = new Task({
      ...req.body,
      user: req.userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = updateTaskSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
