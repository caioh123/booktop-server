import { PrismaClient } from "@prisma/client";
import express from "express";
import bookRoutes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(errorHandler)
app.use(express.json());

app.use("/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
