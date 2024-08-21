import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createTags = mutation({
  args: {
    name: v.string(),
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not aunthenicated");


    const snippet = await ctx.db.insert("tags", {
      name: args.name,
      clerkUserId: args.clerkUserId,
    });

    return snippet
  },

});


export const getAllTags = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const tags = await ctx.db
      .query("tags")
      .withIndex("by_user", (q) =>
        q.eq("clerkUserId", userId)
      )
      .order("desc")
      .collect();

    return tags;
  },
});