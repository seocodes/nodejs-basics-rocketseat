import { randomUUID } from "node:crypto"
import { sql } from "./db.js"

export class DatabasePostgres{
    async list(search){   // Async para a gente poder usar o "await" na query para esperar finalizar
        let videos

        if (search){
            videos = await sql`select * from videos where title ilike ${'%'+search+'%'}`
        }
        else{
            videos = await sql`select * from videos`
        }

        return videos;
    }

    async create(video) {
        const videoId = randomUUID()  // Explicação disso lá no database-memory.js

        const { title, description, duration } = video

        await sql`insert into videos (id,title,description,duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }

    async update(id, video){
        const { title, description, duration } = video

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

    async delete(id){
        await sql`delete from videos where id = ${id}`
    }
}