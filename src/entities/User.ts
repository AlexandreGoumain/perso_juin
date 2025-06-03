import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { users } from "../schemas";

// Un type qui represente un model user au moment de la selection dans la db
export type User = InferSelectModel<typeof users>;
// InferSelectModel<typeof users> indique le type User ici aura les même propriétés que la table "users" dans la db

// Un modele d'un user au moment de son insert dans la db
export type NewUser = InferInsertModel<typeof users>;
// InferInsertModel<typeof users> indique que le type NewUser aura les mêmes prop que la table "users" dans la DB **SAUF** pour les propriétés générées automatiquement (id)
