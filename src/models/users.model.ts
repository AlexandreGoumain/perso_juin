import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { NewUser } from "../entities/User";
import { users } from "../schemas";
import logger from "../utils/logger";

export const userModel = {
    getAll: () => {
        try {
            return db
                .select({
                    id: users.id,
                    username: users.username,
                    email: users.email,
                })
                .from(users)
                .execute();
        } catch (err: any) {
            logger.error(
                "Impossible de récupérer les utilisateurs: ",
                err.message
            );
            return [];
        }
    },

    get: (id: string) => {
        try {
            return db
                .select({
                    id: users.id,
                    username: users.username,
                    email: users.email,
                })
                .from(users)
                .where(eq(users.id, id))
                .execute();
        } catch (err: any) {
            logger.error(
                "Impossible de récupérer l'utilisateur: ",
                err.message
            );
            throw new Error("L'utilisateur ne peut pas être récupéré");
        }
    },

    findByCredentials: (email: string) => {
        try {
            return db
                .select()
                .from(users)
                .where(eq(users.email, email))
                .execute();
        } catch (err: any) {
            logger.error(
                "Impossible de trouver l'utilisateur par email: ",
                err.message
            );
            throw new Error("L'utilisateur ne peut pas être trouvé");
        }
    },

    create: (user: NewUser) => {
        try {
            return db
                .insert(users)
                .values(user)
                .returning({
                    id: users.id,
                    username: users.username,
                    email: users.email,
                })
                .execute();
        } catch (err: any) {
            logger.error("Impossible de créer l'utilisateur: ", err.message);
            throw new Error("L'utilisateur ne peut pas être créé");
        }
    },
};
