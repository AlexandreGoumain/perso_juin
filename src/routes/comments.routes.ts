import { Router } from "express";
import { commentsController } from "../controllers/comments.controller";

const commentRouter = Router();

// TODO: Ajouter les routes pour les commentaires

commentRouter.get("/", commentsController.getAll);
commentRouter.get("/:id", commentsController.get);
commentRouter.post("/", commentsController.create);
commentRouter.put("/:id", commentsController.update);
commentRouter.delete("/:id", commentsController.delete);

export default commentRouter;
