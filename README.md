# Code Snippet Manager

Save, organize and search code snippets across languages, with syntax highlighting and a proper in-browser editor.

Live demo: https://code-snippets-kappa.vercel.app

## Features

- Create and edit snippets in a real code editor (Ace)
- Syntax highlighting across many languages
- Search and filter through your snippets
- Authentication, so your snippets stay yours
- Light and dark mode

## Tech stack

- Next.js with TypeScript
- Convex and MongoDB (Mongoose)
- Clerk for authentication
- Ace editor and react-syntax-highlighter
- Tailwind CSS, MUI and Radix UI
- React Hook Form with Yup, and TanStack Query

## Getting started

```bash
npm install
# set up .env.local with your Convex, Clerk and database keys
npm run dev
```

Then open http://localhost:3000.
