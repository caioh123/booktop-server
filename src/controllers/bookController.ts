import { PrismaClient, Book } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class BookController {

  public async getAllBooks(req: Request, res:Response): Promise<Response> {
    try {
      const books = await prisma.book.findMany()

      if(!books) {
        return res.status(404).json({error: "Não foi encontrado nenhum livro."})
      }

      return res.status(200).json(books)
    } catch (error) {
      console.log("Erro ao obter livros:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao procurar todos os livros." });
    }
  }

  public async createBook(req: Request, res: Response): Promise<Response> {
    try {
      const { name, author, price, description } = req.body;


      const book = await prisma.book.create({
        data:  {
          name,
          author,
          price,
          description,
        },
      });


      return res.status(201).json(book);
    } catch (error) {
        console.log("req", req.body);
      console.log("Erro ao criar livro:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao criar o livro." });
    }
  }

  public async getBook(req: Request, res: Response) {
    try {
      const {id} = req.params
      console.log('id: ', id);

      const book = await prisma.book.findUnique({
        where: {id: Number(id)}
      })

      if(!book) {
        return res.status(404).json({error: "Livro não encontrado"})
      }

      return res.status(200).json(book)
    } catch (error) {
      return res.status(500).json({ error: "Ocorreu um erro ao obter o livro." });
      
    }
  }

}

export default BookController;
