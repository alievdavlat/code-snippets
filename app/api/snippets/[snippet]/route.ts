import connect from "@/lib/db";
import snippetSchema from "../../../models/SnippetSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: any }) {
  const snippetId = context.params.snippet;
    
  try { 
    if (!snippetId) {
      return NextResponse.json({ msg: 'id Required' }, { status: 400 });
    }


    await connect();

    const snippet = await snippetSchema.findOne({ id: snippetId });
    if (!snippet) {
      return NextResponse.json({ msg: 'Snippet not found' }, { status: 404 });
    }

    
    return NextResponse.json({ data: snippet, msg: 'ok', status: 200 }, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}


export async function PUT(req: Request, context: { params: any }) {
  try {
    const body = await req.json();
    const snippetId = context.params.snippet;

    
    if (!snippetId) {
      return NextResponse.json({ msg: 'id Required' }, { status: 400 });
    }


    await connect();
    const updatedSnippet = await snippetSchema.findOneAndUpdate(
      {id:snippetId},
      { ...body },
      { new: true }
    );

    if (!updatedSnippet) {
      return NextResponse.json({
        data: null,
        status: 404,
        msg: "snippet not found",
      });
    }

    return NextResponse.json({ data: updatedSnippet, status: 200, msg: "ok" });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}


export async function DELETE(req: Request, context: { params: any }) {
  try {

    const snippetId = context.params.snippet;
    
    if (!snippetId) {
      return NextResponse.json({ msg:'id Required'}, { status: 400 });
    }

    await connect()

    const deletedSnippet = await snippetSchema.findOneAndDelete({id:snippetId})

    if (!deletedSnippet) {
      return NextResponse.json({  message:'Snippet not found', status:404}, { status: 404 });
    }

    return NextResponse.json({ data:deletedSnippet, message:'ok', status:200}, { status: 200 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
}