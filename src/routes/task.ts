import express from "express";
import { auth } from "../middleware/auth";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/tasks";

const router = express.Router();

router.use(auth as express.RequestHandler);

router
  .route("/")
  .get(getTasks as express.RequestHandler)
  .post(createTask as express.RequestHandler);

router
  .route("/:id")
  .patch(updateTask as express.RequestHandler)
  .delete(deleteTask as express.RequestHandler);

export default router;
