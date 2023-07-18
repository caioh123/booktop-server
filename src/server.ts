import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        
        data: {
            name: "alice",
            email: "esse@esse.io"
        }
    })

    console.log('user: ', user);
}

main().then(async() => {
    await prisma.$disconnect()
}).catch(async (e) => {
    await prisma.$disconnect()
    process.exit(1)
})

const express = require("express")

const app = express()

const PORT= 3000

app.listen(PORT, () => {
    console.log("rodou")
})

app.get("/taltaltal", (request: any, response: any) => {
    response.json({name: "taltaltal", })
})