import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/users.model";
import logger from "../utils/logger";
import { APIResponse } from "../utils/response";
import * as argon2 from "argon2";

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
};
