import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blog";

import { getToken } from "next-auth/jwt";

export async function PUT(req, context) {
	await dbConnect();
	const _req = await req.json();

	try {
		const updatedBlog = await Blog.findByIdAndUpdate(
			context.params.id,
			{ ..._req },
			{ new: true }
		);

		return NextResponse.json(updatedBlog, { status: 200 });
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ error: "An error occurred: " + error.message },
			{ status: 500 }
		);
	}
}

export async function DELETE(req, context) {
	// console.log("inside the DELETE server");
	await dbConnect();
	// const _req = await req.json();
	// console.log("inside the DELETE server before try");

	try {
		const deletedBlog = await Blog.findByIdAndDelete(context.params.id);

		if (deletedBlog) {
			return NextResponse.json(deletedBlog, { status: 200 });
		} else {
			return NextResponse.json({ error: "Blog not found" }, { status: 404 });
		}
	} catch (error) {
		console.log(error.message);
		return NextResponse.json(
			{ error: "An error occurred while deleting: " },
			{ status: 500 }
		);
	}
}
