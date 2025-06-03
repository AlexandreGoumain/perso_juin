import { Request, Response } from "express";
import { postModel } from "../models/posts.model";
import logger from "../utils/logger";
import { APIResponse } from "../utils/response";

export const postsController = {
    // GET /posts - Récupérer tous les posts
    getAll: async (req: Request, res: Response) => {
        try {
            const posts = await postModel.getAll();
            APIResponse(res, posts, "Posts récupérés avec succès", 200);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération des posts:",
                error.message
            );
            APIResponse(
                res,
                null,
                "Erreur lors de la récupération des posts",
                500
            );
        }
    },

    // GET /posts/:id - Récupérer un post par ID
    get: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const post = await postModel.get(id);

            if (!post || post.length === 0) {
                return APIResponse(res, null, "Post non trouvé", 404);
            }

            APIResponse(res, post[0], "Post récupéré avec succès", 200);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération du post:",
                error.message
            );
            APIResponse(
                res,
                null,
                "Erreur lors de la récupération du post",
                500
            );
        }
    },

    // POST /posts - Créer un nouveau post
    create: async (req: Request, res: Response) => {
        try {
            const { title, content, author } = req.body;

            if (!title || !content || !author) {
                return APIResponse(
                    res,
                    null,
                    "Titre, contenu et auteur sont requis",
                    400
                );
            }

            const newPost = await postModel.create({ title, content, author });
            APIResponse(res, newPost[0], "Post créé avec succès", 201);
        } catch (error: any) {
            logger.error("Erreur lors de la création du post:", error.message);
            APIResponse(res, null, "Erreur lors de la création du post", 500);
        }
    },

    // PUT /posts/:id - Mettre à jour un post
    update: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { title, content, author } = req.body;

            if (!title || !content || !author) {
                return APIResponse(
                    res,
                    null,
                    "Titre, contenu et auteur sont requis",
                    400
                );
            }

            await postModel.update(id, author, {
                title,
                content,
                author,
            });

            APIResponse(res, null, "Post mis à jour avec succès", 200);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la mise à jour du post:",
                error.message
            );
            APIResponse(
                res,
                null,
                "Erreur lors de la mise à jour du post",
                500
            );
        }
    },

    // DELETE /posts/:id - Supprimer un post
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { author } = req.body;

            if (!author) {
                return APIResponse(res, null, "ID de l'auteur requis", 400);
            }

            await postModel.delete(id, author);

            APIResponse(res, null, "Post supprimé avec succès", 200);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la suppression du post:",
                error.message
            );
            APIResponse(
                res,
                null,
                "Erreur lors de la suppression du post",
                500
            );
        }
    },
};
