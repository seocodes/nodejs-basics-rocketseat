import 'dotenv/config'  // vai salvar num process.env (onde terá as variáveis de ambiente)
import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL);