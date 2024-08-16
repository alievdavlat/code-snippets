import connect from "@/lib/db";
import snippetSchema from "../../models/SnippetSchema";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const clerkId = searchParams.get("clerkId"); // Foydalanuvchi ID si

    if (!clerkId) {
      return NextResponse.json({ error: "clerkId parameter is required" }, { status: 400 });
    }

    await connect();

    // Foydalanuvchi uchun snippetlarni olish
    const snippets = await snippetSchema.find({ clerkUserId: clerkId }, { language: 1 });

    // Har bir tildan qancha snippet borligini hisoblash
    const languageCount: { [key: string]: number } = {};

    snippets.forEach(snippet => {
      const language = snippet.language;
      if (language) {
        if (languageCount[language]) {
          languageCount[language]++;
        } else {
          languageCount[language] = 1;
        }
      }
    });

    // Natijani formatlash
    const result = Object.keys(languageCount).map(language => ({
      name: language,
      count: languageCount[language]
    }));

    return NextResponse.json({ data: result, status: 200, msg: "ok" });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
