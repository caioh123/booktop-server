import express, { Router } from "express";
import BookController from "../controllers/bookController";

const router = express.Router();
const controller = new BookController();

router.post("/", controller.createBook);
router.get("/", controller.getAllBooks)
router.get("/:id", controller.getBook)
router.put("/:id", controller.updateBook)
router.delete("/:id", controller.deleteBook)

export default router;
