import { relations } from "drizzle-orm";
import { comments, posts, users } from "./index";

export const userRelations = relations(users, ({ many }) => ({
    posts: many(posts), // un user peut avoir plusieurs posts
    comments: many(comments), // un user peut avoir plusieurs commentaires
}));

export const commentRelations = relations(comments, ({ one }) => ({
    user: one(users, {
        fields: [comments.authorId],
        references: [users.id],
    }),
    post: one(posts, {
        fields: [comments.postId],
        references: [posts.id],
    }),
}));

export const postRelation = relations(posts, ({ one, many }) => ({
    user: one(users, {
        fields: [posts.author],
        references: [users.id],
    }),
    comments: many(comments),
}));
