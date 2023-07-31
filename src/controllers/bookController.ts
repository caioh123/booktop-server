import { PrismaClient, Book } from '@prisma/client';
import { Request, Response } from 'express';
import { CustomError } from '../utils/customError';

const prisma = new PrismaClient();

class BookController {

  public async getAllBooks(req: Request, res:Response): Promise<Response> {
    try {
      const name = String(req.query.name)
      const books = await prisma.book.findMany({
        where: {
          name: {startsWith: name }
        }
      })

      if(!books) {
        throw new CustomError("Livro não encontrado", 404)
      }

      return res.status(200).json(books)
    } catch (error) {
      console.log("Erro ao obter livros:", error);
      return res.status(500).json({ error: "Ocorreu um erro ao procurar todos os livros." });
    }
  }

  public async updateBook(req: Request, res:Response): Promise<Response> {
    try {
      const {id} = req.params
      const {name, author, price} = req.body

      const book  = await prisma.book.update({
        where: {id: Number(id)},
        data: {
          name: name,
          author: author,
          price: price
        }
      })

      if(!book) {
        throw new CustomError("Livro não encontrado", 404)
      }

      return res.status(200).json(book)
    } catch(error) {
      return res.status(500).json({ error: "Ocorreu um erro ao procurar todos os livros." });
    }
  }

  public async deleteBook(req: Request, res: Response) {
    try {
      const {id} = req.params

      const book = await prisma.book.delete({
        where: {id: Number(id)}
      })

      if(!book) {
        throw new CustomError("Livro não encontrado", 404)
      }

      return res.status(200).json(book)
    } catch (error) {
      return res.status(500).json({error: "Não foi possível deletar seu livro."})
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

      const book = await prisma.book.findUnique({
        where: {id: Number(id)}
      })

      if(!book) {
        throw new CustomError("Livro não encontrado", 404)
      }

      return res.status(200).json(book)
    } catch (error) {
      return res.status(500).json({ error: "Ocorreu um erro ao obter o livro." });
      
    }
  }

}

export default BookController;
