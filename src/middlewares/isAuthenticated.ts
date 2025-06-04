import * as argon2 from "argon2";
import { NextFunction, Request, Response } from "express";
import { APIResponse } from "../utils";

const JWT_SECRET = process.env.JWT_SECRET || "";

export const isAuthenticated = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { accessToken } = request.cookies; // on récupére le cookie "accessToken" qui contient le JWT

    if (!accessToken)
        return APIResponse(response, null, "Vous devez être connecté", 401);

    try {
        const decoded = argon2.verify(accessToken, JWT_SECRET);
        // v en dessous, c'est que verify est bien passé correctement !
        response.locals.user = decoded;
        next();
    } catch (err: any) {
        return APIResponse(response, null, "Token invalide", 401);
    }
};
