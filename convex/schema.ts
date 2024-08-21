import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tags: defineTable({
    name: v.string(),
    clerkUserId:v.string()
  }).index("by_user", ["clerkUserId"]),
  snippets: defineTable({
    title: v.string(),
    isFavorite: v.optional(v.boolean()),
    clerkUserId:v.string(),
    tags:v.array(v.string()),
    description:v.string(),
    code:v.string(),
    language:v.string(),
    isTrash:v.optional(v.boolean()),
    libery:v.string()
  }).index("by_user", ["clerkUserId"]),
});