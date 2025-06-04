import { Router } from "express";
import { usersController } from "../controllers/users.controller";
import { validateRequest } from "../middlewares";
import { userLoginValidation, userRegisterValidation } from "../validations";

const userRouter = Router();

// GET /users - Récupérer tous les utilisateurs
userRouter.get("/", usersController.getAll);

// GET /users/:id - Récupérer un utilisateur par ID
userRouter.get("/:id", usersController.get);

// POST /users - Créer un nouvel utilisateur
userRouter.post(
    "/",
    validateRequest(userRegisterValidation),
    usersController.create
);

// POST /users/login - Authentification par email
userRouter.post(
    "/login",
    validateRequest(userLoginValidation),
    usersController.findByCredentials
);

export default userRouter;
