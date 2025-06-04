import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { APIResponse } from "../utils/response";

export const validateRequest = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.map(
                    (err) => `${err.path.join(".")}: ${err.message}`
                );
                return APIResponse(
                    res,
                    null,
                    `Erreurs de validation: ${errorMessages.join(", ")}`,
                    400
                );
            }
            return APIResponse(res, null, "Erreur de validation", 400);
        }
    };
};
