import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { users } from "./users";

export const posts = pgTable("posts", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    author: uuid("author_id")
        .references(() => users.id, { onDelete: "cascade" })
        .notNull(),
    created_at: timestamp("created_at").defaultNow(),
});
