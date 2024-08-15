import connect from "@/lib/db";
import snippetSchema from "../../models/SnippetSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      title,
      isFavorite,
      clerkUserId,
      tags,
      description,
      code,
      language,
      isTrash,
      libery
    } = await req.json();

    await connect();

    const note = new snippetSchema({
      title,
      isFavorite,
      clerkUserId,
      tags,
      description,
      code,
      language,
      isTrash,
      libery
    });

    const savedSnippet = await note.save();

    
    return NextResponse.json({ data: savedSnippet, status: 201, msg: "ok" });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const {searchParams} = new URL(req.url);
    const clerkId = searchParams.get("clerkId");
    const search = searchParams.get("search"); // Additional query parameter example
    const tag = searchParams.get("tag"); // Another example for filtering

    await connect();

    // Build query dynamically based on provided parameters
    let query: any = {};

    if (clerkId) query.clerkUserId = clerkId;
    if (search) query.title = { $regex: search, $options: "i" }; // Case-insensitive search
    if (tag) query.tags = tag; // Assuming `tags` is an array field in the schema

    const notes = await snippetSchema.find(query);

    return NextResponse.json({ data: notes, status: 200, msg: "ok" });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json(
      { error: err.message || "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const {searchParams} = new URL(req.url);
    const id = searchParams.get("id");

    console.log(id);
    let query: any = {};
    
    await connect();

    if (id) query.id = id;

    const updatedSnippet = await snippetSchema.findOneAndUpdate(
      query,
      { ...body },
      { new: true }
    );

    console.log(updatedSnippet);
    
    if (!updatedSnippet) {
      return NextResponse.json({
        data: null,
        status: 301,
        msg: "snippet not found",
      });
    }

    return NextResponse.json({ data: updatedSnippet, status: 200, msg: "ok" });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {

    const {searchParams} = new URL(req.url);

    const snippetId = searchParams.get("id")

    if (!snippetId) {
      return NextResponse.json({ msg:'id Required'}, { status: 400 });
    }

    await connect()

    const deletedSnippet = await snippetSchema.findByIdAndDelete({id:snippetId})

    if (!deletedSnippet) {
      return NextResponse.json({  message:'Snippet not found', status:404}, { status: 404 });
    }

    return NextResponse.json({ data:deletedSnippet, message:'ok', status:200}, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
