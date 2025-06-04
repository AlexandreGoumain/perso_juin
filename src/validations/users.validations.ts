import { z } from "zod";
import { NewUser } from "../entities/User";

export const userRegisterValidation: z.ZodType<NewUser> = z.object({
    username: z
        .string()
        .trim()
        .min(6, "Username doit contenir au moins 6 caractères")
        .max(20, "Username doit contenir maximum 20 caractères"),

    email: z.string().trim().email("Email invalide"),

    password: z
        .string()
        .trim()
        .min(8, "Password doit contenir au moins 8 caractères")
        .regex(/[0-9]/, "Password doit contenir au moins un chiffre")
        .regex(/[A-Z]/, "Password doit contenir au moins une lettre majuscule")
        .regex(/[a-z]/, "Password doit contenir au moins une lettre minuscule")
        .regex(
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            "Password doit contenir au moins un caractère spécial"
        ),
});

export const userLoginValidation = z.object({
    email: z.string().trim().email("Email invalide"),
});
