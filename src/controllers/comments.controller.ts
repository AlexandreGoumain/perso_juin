import { Request, Response } from "express";
import { commentModel } from "../models/comments.model";
import logger from "../utils/logger";
import { APIResponse } from "../utils/response";

export const commentsController = {
    // GET /comments - Récupérer tous les commentaires
    getAll: async (req: Request, res: Response) => {
        try {
            const comments = await commentModel.getAll();
            APIResponse(
                res,
                comments,
                "Commentaires récupérés avec succès",
                200
            );
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération des commentaires:",
                error.message
            );
            APIResponse(
                res,
                null,
                "Erreur lors de la récupération des commentaires",
                500
            );
        }
    },

    // GET /comments/:id - Récupérer un commentaire par ID
    get: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const comment = await commentModel.get(id);

            if (!comment || comment.length === 0) {
                return APIResponse(res, null, "Commentaire non trouvé", 404);
            }

            APIResponse(
                res,
                comment[0],
                "Commentaire récupéré avec succès",
                200
            );
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération du commentaire:",
                error.message
            );
            APIResponse(
                res,
                null,
                "Erreur lors de la récupération du commentaire",
                500
            );
        }
    },

    // POST /comments - Créer un nouveau commentaire
    create: async (req: Request, res: Response) => {
        try {
            const { content, postId, authorId } = req.body;

            if (!content || !postId || !authorId) {
                return APIResponse(
                    res,
                    null,
                    "Contenu, ID du post et ID de l'auteur sont requis",
                    400
                );
            }

            const newComment = await commentModel.create({
                content,
                postId,
                authorId,
            });
            APIResponse(
                res,
                newComment[0],
                "Commentaire créé avec succès",
                201
            );
        } catch (error: any) {
            logger.error(
                "Erreur lors de la création du commentaire:",
                error.message
            );
            APIResponse(
                res,
                null,
                "Erreur lors de la création du commentaire",
                500
            );
        }
    },

    // PUT /comments/:id - Mettre à jour un commentaire
    update: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { content, authorId } = req.body;

            if (!content || !authorId) {
                return APIResponse(
                    res,
                    null,
                    "Contenu et ID de l'auteur sont requis",
                    400
                );
            }

            const updatedComment = await commentModel.update(id, authorId, {
                content,
                postId: "",
                authorId,
            });
            APIResponse(
                res,
                updatedComment,
                "Commentaire mis à jour avec succès",
                200
            );
        } catch (error: any) {
            logger.error(
                "Erreur lors de la mise à jour du commentaire:",
                error.message
            );
            APIResponse(
                res,
                null,
                "Erreur lors de la mise à jour du commentaire",
                500
            );
        }
    },

    // DELETE /comments/:id - Supprimer un commentaire
    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { authorId } = req.body;

            if (!authorId) {
                return APIResponse(res, null, "ID de l'auteur requis", 400);
            }

            await commentModel.delete(id, authorId);
            APIResponse(res, null, "Commentaire supprimé avec succès", 200);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la suppression du commentaire:",
                error.message
            );
            APIResponse(
                res,
                null,
                "Erreur lors de la suppression du commentaire",
                500
            );
        }
    },
};
