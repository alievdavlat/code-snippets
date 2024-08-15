import mongoose, { models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const SingleTagSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4, // Set default value to uuid v4
      unique: true, // Ensure uniqueness
    },
    name: {
      type: String,
      required: true,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const snippetSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
    tags: [
      {
        name: {
          type: String,
          required: true, // Ensure each tag name is required
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
    },
    language: {
      type: String,
      required: true,
    },
    isTrash: {
      type: Boolean,
      default: false,
    },
    libery: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Snippet = models.Snippets || mongoose.model("Snippets", snippetSchema);
export const TagSchema = models.Tags || mongoose.model("Tags", SingleTagSchema);

export default Snippet;
