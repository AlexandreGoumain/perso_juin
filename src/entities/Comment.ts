import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { comments } from "../schemas";

export type Comment = InferSelectModel<typeof comments>;

export type NewComment = InferInsertModel<typeof comments>;
