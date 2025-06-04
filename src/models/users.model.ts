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
            return db.query.users.findFirst({
                where: eq(users.id, id),
                with: {
                    posts: {
                        columns: {
                            id: true,
                            title: true,
                            content: true,
                            created_at: true,
                        },
                    },
                    comments: {
                        columns: {
                            id: true,
                            content: true,
                            createdAt: true,
                        },
                        with: {
                            post: {
                                columns: {
                                    id: true,
                                    title: true,
                                },
                            },
                        },
                    },
                },
            });
        } catch (err: any) {
            logger.error(
                "Impossible de récupérer l'utilisateur: ",
                err.message
            );
            return null;
        }
    },

    findByCredentials: (email: string) => {
        try {
            return db
                .select({
                    id: users.id,
                    username: users.username,
                    email: users.email,
                    password: users.password,
                })
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
            if (!user.email) {
                throw new Error("L'email est obligatoire");
            }
            if (!user.username) {
                throw new Error("Le nom d'utilisateur est obligatoire");
            }
            if (!user.password) {
                throw new Error("Le mot de passe est obligatoire");
            }

            // vérifier si l'email est déjà utilisé
            const existingUser = db
                .select()
                .from(users)
                .where(eq(users.email, user.email))
                .execute();

            if (existingUser !== null) {
                throw new Error("Cet email est déjà utilisé");
            }

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
