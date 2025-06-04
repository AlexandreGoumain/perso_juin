import { Router } from "express";
import { postsController } from "../controllers/posts.controller";
import { validateRequest } from "../middlewares";
import { postCreateValidation } from "../validations";

const postRouter = Router();

// TODO: Ajouter les routes pour les posts

postRouter.get("/", postsController.getAll);
postRouter.get("/:id", postsController.get);
postRouter.post(
    "/",
    validateRequest(postCreateValidation),
    postsController.create
);
postRouter.put("/:id", postsController.update);
postRouter.delete("/:id", postsController.delete);

export default postRouter;
