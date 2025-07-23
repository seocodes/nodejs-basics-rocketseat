import { randomUUID } from "node:crypto"

export class DatabaseMemory{
    // o # é para indicar que é uma chave privada - só visível dentro da classe
    #videos = new Map()

    // Set (não aceita valores duplicados), Map (API muito mais legal e funciona com chave-valor)

    list(){
        // Array.from converte em Array (para voltar a informação corretamente no GET)
        return Array.from(this.#videos.entries()).map((videoArray) =>{
            const id = videoArray[0]
            const data = videoArray[1]

            return{
                id,
                ...data
            }
        })  
    }

    create(video) {
        const videoId = randomUUID()  // UUID -> Universally Unique Identifier
        this.#videos.set(videoId, video) // bota dentro do map (chave e valor)
    }

    update(id, video){
        this.#videos.set(id, video)
    }

    delete(id){
        this.#videos.delete(id)
    }
}