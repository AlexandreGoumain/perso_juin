import * as argon2 from "argon2";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/users.model";
import logger from "../utils/logger";
import { hashPassword } from "../utils/password";
import { APIResponse } from "../utils/response";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const authController = {
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findByCredentials(email);
            if (!user || user.length === 0) {
                return APIResponse(res, null, "Utilisateur non trouvé", 404);
            }
            const isPasswordValid = await argon2.verify(
                user[0].password,
                password
            );
            if (!isPasswordValid) {
                return APIResponse(res, null, "Mot de passe incorrect", 401);
            }

            const accessToken = jwt.sign({ id: user[0].id }, JWT_SECRET, {
                expiresIn: "1h",
            });
            const refreshToken = jwt.sign({ id: user[0].id }, JWT_SECRET, {
                expiresIn: "1h",
            });
            APIResponse(
                res,
                { accessToken, refreshToken },
                "Connexion réussie",
                200
            );
        } catch (error: any) {
            logger.error("Erreur lors de la connexion:", error.message);
            APIResponse(res, null, "Erreur lors de la connexion", 500);
        }
    },
    register: async (request: Request, response: Response) => {
        try {
            const { username, email, password } = request.body;

            // on vérifie qu'un user n'a pas déjà cet adresse email
            const [emailAlreadyExists] = await userModel.findByCredentials(
                email
            );
            if (emailAlreadyExists) {
                return APIResponse(
                    response,
                    null,
                    "Cette adresse email est déjà utilisée",
                    400
                );
            }

            // On hash le mot de passe en clair du formulaire
            const hash = await hashPassword(password);
            if (!hash) {
                // erreur lors du hash => réponse api erreur
                return APIResponse(
                    response,
                    null,
                    "Un problème est survenu lors du hash",
                    500
                );
            }

            // On ajoute le new user dans la db avec le mdp hashé
            const [newUser] = await userModel.create({
                username,
                email,
                password: hash,
            });
            if (!newUser)
                return APIResponse(
                    response,
                    null,
                    "Un problème est survenu",
                    500
                );

            APIResponse(response, newUser.id, "Vous êtes inscrit", 200);
        } catch (err: any) {
            logger.error(
                `Erreur lors de l'inscription de l'utilisateur: ${err.message}`
            );
            APIResponse(response, null, "Erreur serveur", 500);
        }
    },
    logout: async (request: Request, response: Response) => {
        response.clearCookie("accessToken");
        APIResponse(response, null, "Vous êtes déconnecté", 200);
    },
};
