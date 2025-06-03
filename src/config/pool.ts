import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "./env";

import * as schema from "../schemas/index";

const { DATABASE_URL } = env;

export const pool = new Pool({
    connectionString: DATABASE_URL,
});

// la db qu'on exporte est une instance de NodePgDatabase, qui nous permettra de faire nos requetes DIRECTEMENT DESSUS
export const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
