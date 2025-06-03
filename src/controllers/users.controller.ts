import { Request, Response } from "express";
import { userModel } from "../models/users.model";
import logger from "../utils/logger";
import { APIResponse } from "../utils/response";

export const usersController = {
    // GET /users - Récupérer tous les utilisateurs
    getAll: async (req: Request, res: Response) => {
        try {
            const users = await userModel.getAll();
            APIResponse(res, users, "Utilisateurs récupérés avec succès", 200);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération des utilisateurs:",
                error.message
            );
            APIResponse(
                res,
                null,
                "Erreur lors de la récupération des utilisateurs",
                500
            );
        }
    },

    // GET /users/:id - Récupérer un utilisateur par ID
    get: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await userModel.get(id);

            if (!user || user.length === 0) {
                return APIResponse(res, null, "Utilisateur non trouvé", 404);
            }

            APIResponse(res, user[0], "Utilisateur récupéré avec succès", 200);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la récupération de l'utilisateur:",
                error.message
            );
            APIResponse(
                res,
                null,
                "Erreur lors de la récupération de l'utilisateur",
                500
            );
        }
    },

    // POST /users - Créer un nouvel utilisateur
    create: async (req: Request, res: Response) => {
        try {
            const { username, email, password } = req.body;

            if (!username || !email || !password) {
                return APIResponse(
                    res,
                    null,
                    "Username, email et password sont requis",
                    400
                );
            }

            const newUser = await userModel.create({
                username,
                email,
                password,
            });
            APIResponse(res, newUser[0], "Utilisateur créé avec succès", 201);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la création de l'utilisateur:",
                error.message
            );

            // Gestion des erreurs de contraintes (email unique)
            if (error.message.includes("unique")) {
                return APIResponse(
                    res,
                    null,
                    "Cet email est déjà utilisé",
                    409
                );
            }

            APIResponse(
                res,
                null,
                "Erreur lors de la création de l'utilisateur",
                500
            );
        }
    },

    // POST /users/login - Authentification par email
    findByCredentials: async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            if (!email) {
                return APIResponse(res, null, "Email requis", 400);
            }

            const user = await userModel.findByCredentials(email);

            if (!user || user.length === 0) {
                return APIResponse(res, null, "Utilisateur non trouvé", 404);
            }

            APIResponse(res, user[0], "Utilisateur trouvé", 200);
        } catch (error: any) {
            logger.error(
                "Erreur lors de la recherche de l'utilisateur:",
                error.message
            );
            APIResponse(
                res,
                null,
                "Erreur lors de la recherche de l'utilisateur",
                500
            );
        }
    },
};
