import argon2 from "argon2";
import logger from "./logger";

// hash d'un password avec argon2
export const hashPassword = async (password: string) => {
    try {
        return await argon2.hash(password);
    } catch (err) {
        logger.error("Erreur lors du hashage de mot de passe");
    }
};

// Vérification d'un mot de passe
export const verifyPassword = async (hashed: string, clear: string) => {
    try {
        const verify = await argon2.verify(hashed, clear);
        return verify;
    } catch (err) {
        logger.error("Erreur lors de la vérification: ", err);
    }
};
