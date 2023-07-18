import { PrismaClient, Book } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class BookController {
  public async createBook(req: Request, res: Response): Promise<Response> {
    try {
      const { name, author, price, description } = req.body;

      await prisma.$connect()

      const book = await prisma.book.create({
        data:  {
          name,
          author,
          price,
          description,
        },
      });

      await prisma.$disconnect()

      return res.status(201).json(book);
    } catch (error) {
        console.log("req", req.body);
      console.log("Erro ao criar livro:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao criar o livro." });
    }
  }

}

export default BookController;
