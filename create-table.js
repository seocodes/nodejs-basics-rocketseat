import { sql } from './db.js'

sql`CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title VARCHAR(255) NOT NULL, 
    description TEXT, 
    duration INT
); `.then(() =>{
    console.log('Tabela criada!')   // Para esperar rodar a query sql
})