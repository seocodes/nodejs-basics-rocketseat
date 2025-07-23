// EM PRODUÇÃO É MUITO RARO O SERVER NATIVO SER CRIADO APENAS COM NODE PURO, ABAIXO CRIAREMOS COM UM FRAMEWORK (FASTIFY)

// import { createServer } from 'node:http'

// Request -> obter dados da requisição que o usuário faz pro servidor http
// Response -> devolve uma resposta para quem chama a API

// const server = createServer((request, response) => {  
//     response.write('Hello World')   // Aparece a mensagem no browser/localhost

//     return response.end()
// })


// server.listen(3333)


// Fastify = framework que traz uma forma de separar a aplicação em várias rotas (mapeamento de rotas) 
// de acordo com o que o usuário estiver acessando
import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()
const database = new DatabaseMemory()

// Métodos HTTP: GET, POST, PUT, DELETE, PATCH
// obs: GET é o único método que dá pra testar pelo browser (quando a gente entra numa rota, o navegador sempre utiliza o método GET)
// por isso foi criado o routes.http



server.post('/videos', (request, reply) => {  // reply é o mesmo que o response explicado lá em cima
    database.create({
        title: "Video 01",
        description: "Esse é o video 01",
        duration: 180,
    })

    console.log(database.list())

    // Geralmente em operações de criação, deleção e update o response é vazio (mas precisa dele pra mostrar que a operação foi feita)
    return reply.status(201).send()
})

server.get('/videos', () => {
    return 'Hello Seocodes!'
})

// Route Parameter -> :id
server.put('/videos/:id', () => {
    return 'Hello Node.js'
})

server.delete('/videos/:id', () => {
    return 'Hello Node.js'
})

server.listen({
    port: 3333,
})
