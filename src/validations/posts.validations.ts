import { z } from "zod";
import { NewPost } from "../entities/Post";

export const postCreateValidation: z.ZodType<NewPost> = z.object({
    title: z
        .string()
        .trim()
        .min(8, "Title doit contenir au moins 8 caractères")
        .max(25, "Title doit contenir maximum 25 caractères"),

    content: z
        .string()
        .trim()
        .min(10, "Content doit contenir au moins 10 caractères"),

    author: z.string().trim().uuid("Author doit être un UUID valide"),
});
