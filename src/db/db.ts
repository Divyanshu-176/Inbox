import * as dotenv from "dotenv"
dotenv.config()

import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL!);
const result = await db.execute('select 1');

console.log("result", result)

export default db