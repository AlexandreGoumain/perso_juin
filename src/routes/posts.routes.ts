import { Router } from "express";
import { postsController } from "../controllers/posts.controller";

const postRouter = Router();

// TODO: Ajouter les routes pour les posts

postRouter.get("/", postsController.getAll);
postRouter.get("/:id", postsController.get);
postRouter.post("/", postsController.create);
postRouter.put("/:id", postsController.update);
postRouter.delete("/:id", postsController.delete);

export default postRouter;
