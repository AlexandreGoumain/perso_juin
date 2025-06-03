/*
    reproduire l'équivalent du comment model pour post:
        - get
        - get all
        - create
        - update
        - delete
*/

import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { NewPost } from "../entities/Post";
import { posts, users } from "../schemas";
import logger from "../utils/logger";

export const postModel = {
    create: (post: NewPost) => {
        try {
            return db
                .insert(posts)
                .values(post)
                .returning({
                    id: posts.id,
                })
                .execute();
        } catch (err: any) {
            logger.error("Impossible de créer le post: ", err.message);
            throw new Error("Le post ne peut pas être créé");
        }
    },

    delete: (id: string, authorId: string) => {
        try {
            return db
                .delete(posts)
                .where(and(eq(posts.id, id), eq(posts.author, authorId)));
        } catch (err: any) {
            logger.error("Impossible de supprimer le post: ", err.message);
            throw new Error("Le post ne peut pas être supprimé");
        }
    },

    getAll: () => {
        try {
            return db
                .select({
                    id: posts.id,
                    title: posts.title,
                    content: posts.content,
                    created_at: posts.created_at,
                    author: {
                        id: users.id,
                        username: users.username,
                    },
                })
                .from(posts)
                .leftJoin(users, eq(posts.author, users.id))
                .execute();
        } catch (err: any) {
            logger.error("Impossible de récupérer les posts: ", err.message);
            return [];
        }
    },

    get: (id: string) => {
        try {
            return db
                .select({
                    id: posts.id,
                    title: posts.title,
                    content: posts.content,
                    created_at: posts.created_at,
                    author: {
                        id: users.id,
                        username: users.username,
                    },
                })
                .from(posts)
                .leftJoin(users, eq(posts.author, users.id))
                .where(eq(posts.id, id))
                .execute();
        } catch (err: any) {
            logger.error("Impossible de récupérer le post: ", err.message);
            throw new Error("Le post ne peut pas être récupéré");
        }
    },

    update: (id: string, authorId: string, post: NewPost) => {
        try {
            return db
                .update(posts)
                .set(post)
                .where(and(eq(posts.id, id), eq(posts.author, authorId)))
                .execute();
        } catch (err: any) {
            logger.error("Impossible de mettre à jour le post: ", err.message);
            throw new Error("Le post ne peut pas être mis à jour");
        }
    },
};
