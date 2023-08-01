import { PrismaClient, Book } from '@prisma/client';
import request from 'supertest'
import app from '../../server'

const prisma = new PrismaClient();


describe('BookController', () => {

    beforeEach(async () => {
        await prisma.book.deleteMany()
    })

    it('should create a book', async () => {
        const response = await request(app).post('/books').send({
            name: 'book test',
            author: 'test author',
            price: 10,
            description: 'test desc'
        })

        expect(response.status).toEqual(201)
        expect(response.body).toHaveProperty('id')
    })
})