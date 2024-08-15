import connect from "@/lib/db";
import {TagSchema} from "../../models/SnippetSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      clerkUserId, 
      name
    } = await req.json();

    await connect();

    const note = new TagSchema({
      clerkUserId, 
      name
    });

    const savedTags = await note.save();

    return NextResponse.json({ data: savedTags, status: 201, msg: "ok" });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
export async function GET(req: Request) {
  try {
  

    await connect();

    const tags = await TagSchema.find();

    return NextResponse.json({ data: tags, status: 200, msg: "ok" });
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

    await connect();


    const updatedTag = await TagSchema.findOneAndUpdate(
      { ...body },
      { new: true }
    );

    if (!updatedTag) {
      return NextResponse.json({
        data: null,
        status: 404,
        msg: "Tag not found",
      });
    }

    return NextResponse.json({ data: updatedTag, status: 200, msg: "ok" });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {

    const {searchParams} = new URL(req.url);

    const tagId = searchParams.get("id")

    if (!tagId) {
      return NextResponse.json({ msg:'id Required'}, { status: 400 });
    }

    await connect()

    const deletedTag = await TagSchema.findByIdAndDelete({id:tagId})

    if (!deletedTag) {
      return NextResponse.json({  message:'Tag not found', status:404}, { status: 404 });
    }

    return NextResponse.json({ data:deletedTag, message:'ok', status:200}, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
