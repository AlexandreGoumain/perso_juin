import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { posts, users } from "./index";

export const comments = pgTable("comments", {
    id: uuid("id").defaultRandom().primaryKey(),
    postId: uuid("post_id")
        .references(() => posts.id, { onDelete: "cascade" })
        .notNull(),
    authorId: uuid("user_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
