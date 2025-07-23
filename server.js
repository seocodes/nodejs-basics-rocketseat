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


// Request Body (p/ métodos POST e PUT) -> para enviar os dados dos vídeos (diversificar os dados)

server.post('/videos', (request, reply) => {  // reply é o mesmo que o response explicado lá em cima
    const { title, description, duration } = request.body

    database.create({
        // Short syntax - mesma coisa que { title: title }, etc.
        title,
        description,
        duration,
    })

    // Geralmente em operações de criação, deleção e update o response é vazio (mas precisa dele pra mostrar que a operação foi feita)
    return reply.status(201).send()
})

server.get('/videos', () => {
    const videos = database.list()

    return videos  // O Fastify trata isso pra gente como um reply/response
})

// Route Parameter -> :id
server.put('/videos/:id', (request, reply) => {
    const { title, description, duration } = request.body
    const videoId = request.params.id

    database.update(videoId, {
        title,
        description,
        duration
    })

    // status 204 -> teve sucesso mas não tem conteúdo na resposta
    return reply.status(204).send()
})

server.delete('/videos/:id', (request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)

    // status 204 -> teve sucesso mas não tem conteúdo na resposta
    return reply.status(204).send()
})

server.listen({
    port: 3333,
})
