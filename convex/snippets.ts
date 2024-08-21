import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createSnippet = mutation({
  args: {
    title: v.string(),
    isFavorite: v.boolean(),
    clerkUserId: v.string(),
    tags:v.array(v.string()),
    description: v.string(),
    code: v.string(),
    language: v.string(),
    isTrash: v.boolean(),
    libery: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("NOt aunthenicated");

    const userId = identity.subject;

    const snippet = await ctx.db.insert("snippets", {
      title: args.title,
      isFavorite: args.isFavorite,
      clerkUserId: args.clerkUserId,
      tags: args.tags,
      description: args.description,
      code: args.code,
      language: args.language,
      isTrash: args.isTrash,
      libery: args.libery,
    });

    return snippet;
  },
});

export const getAllSnippets = query({
  args: {
    search: v.string(),
    tag: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    // Create the base query for snippets
    let snippetsQuery = ctx.db
      .query("snippets")
      .withIndex("by_user", (q) => q.eq("clerkUserId", userId))
      .filter((q) => q.eq(q.field("isTrash"), false));

    // Apply search filtering if provided
    if (args.search) {
      snippetsQuery = snippetsQuery.filter((q) =>
        q.eq(q.field("title"), args.search)
      );
    }

    // Fetch all snippets that match the base query
    const snippets = await snippetsQuery.order("desc").collect();

    // Filter by tag name in JavaScript
    if (args.tag && args.tag !== "All") {

      return snippets.filter((snippet) =>
        // snippet.tags.some((tagObj) => tagObj.name === args.tag)
      snippet.tags.includes(args.tag)
      );
    }

    // Return all snippets if no tag filter is applied
    return snippets;
  },
});

export const getFavriteSnippets = query({
  args:{
    search:v.string(),
    tag:v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    // Create the base query for snippets
    let snippetsQuery = ctx.db
      .query("snippets")
      .withIndex("by_user", (q) => q.eq("clerkUserId", userId))
      .filter((q) => q.eq(q.field("isFavorite"), true));

    // Apply search filtering if provided
    if (args.search) {
      snippetsQuery = snippetsQuery.filter((q) =>
        q.eq(q.field("title"), args.search)
      );
    }

    // Fetch all snippets that match the base query
    const snippets = await snippetsQuery.order("desc").collect();

    // Filter by tag name in JavaScript
    if (args.tag && args.tag !== "All") {
      return snippets.filter((snippet) =>
        // snippet.tags.some((tagObj) => tagObj.name === args.tag)
      snippet.tags.includes(args.tag)

      );
    }

    return snippets;
  },
});

export const getTrashSnippets = query({
  args:{
    search:v.string(),
    tag:v.string()
  },
  handler: async (ctx ,args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    // Create the base query for snippets
    let snippetsQuery = ctx.db
      .query("snippets")
      .withIndex("by_user", (q) => q.eq("clerkUserId", userId))
      .filter((q) => q.eq(q.field("isTrash"), true));

    // Apply search filtering if provided
    if (args.search) {
      snippetsQuery = snippetsQuery.filter((q) =>
        q.eq(q.field("title"), args.search)
      );
    }

    // Fetch all snippets that match the base query
    const snippets = await snippetsQuery.order("desc").collect();

    // Filter by tag name in JavaScript
    if (args.tag && args.tag !== "All") {
      return snippets.filter((snippet) =>
        // snippet.tags.some((tagObj) => tagObj.name === args.tag)
      snippet.tags.includes(args.tag)

      );
    }
    return snippets;
  },
});

export const getLanguage = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    // Fetch snippets for the authenticated user
    const snippets = await ctx.db
      .query("snippets")
      .withIndex("by_user", (q) => q.eq("clerkUserId", userId))
      .filter((q) => q.eq(q.field("isTrash"), false))
      .order("desc")
      .collect();

    // Calculate the count of each language
    const languageCount: any = {};

    snippets.forEach((snippet) => {
      const language = snippet.language;
      if (language) {
        if (languageCount[language]) {
          languageCount[language]++;
        } else {
          languageCount[language] = 1;
        }
      }
    });

    // Format the result
    const result = Object.keys(languageCount).map((language) => ({
      name: language,
      count: languageCount[language],
    }));

    return result;
  },
});

export const updateFields = mutation({
  args: {
    id: v.id("snippets"),
    title: v.optional(v.string()),
    isFavorite: v.optional(v.boolean()),
    clerkUserId: v.optional(v.string()),
    tags:v.array(v.string()),
    description: v.optional(v.string()),
    code: v.optional(v.string()),
    language: v.optional(v.string()),
    isTrash: v.optional(v.boolean()),
    libery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userId = identity.subject;

    const { id, ...rest } = args;

    const existingSnippet = await ctx.db.get(id);

    if (!existingSnippet) {
      throw new Error("Not found");
    }

    if (existingSnippet.clerkUserId !== userId) {
      throw new Error("Unauthorized");
    }

    const snippet = await ctx.db.patch(id, rest);

    return snippet;
  },
});

export const getSnippetById = query({
  args: { id: v.id("snippets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    const snippet = await ctx.db.get(args.id);

    if (!snippet) {
      return "Not found";
    }

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    if (snippet.clerkUserId !== userId) {
      throw new Error("Unauthorized");
    }

    return snippet;
  },
});

export const setFavorite = mutation({
  args: {
    id: v.id("snippets"),
    isFavirite: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingSnippet = await ctx.db.get(args.id);

    if (!existingSnippet) {
      throw new Error("Not found");
    }

    if (existingSnippet.clerkUserId !== userId) {
      throw new Error("Unauthorized");
    }

    const snippet = await ctx.db.patch(args.id, {
      isFavorite: args.isFavirite,
    });

    return snippet;
  },
});

export const setTrash = mutation({
  args: {
    id: v.id("snippets"),
    isTrash: v.boolean(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingSnippet = await ctx.db.get(args.id);

    if (!existingSnippet) {
      throw new Error("Not found");
    }

    if (existingSnippet.clerkUserId !== userId) {
      throw new Error("Unauthorized");
    }

    const snippet = await ctx.db.patch(args.id, {
      isTrash: args.isTrash,
    });

    return snippet;
  },
});


export const deleteSnippt = mutation({
  args: {
    id: v.id("snippets"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingSnippet = await ctx.db.delete(args.id);


    return existingSnippet;
  },
});
