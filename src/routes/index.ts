import express, { Router } from "express";
import BookController from "../controllers/bookController";

const router = express.Router();
const controller = new BookController();

router.post("/", controller.createBook);

export default router;
