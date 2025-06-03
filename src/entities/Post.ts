import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { posts } from "../schemas";

export type Post = InferSelectModel<typeof posts>;

export type NewPost = InferInsertModel<typeof posts>;
