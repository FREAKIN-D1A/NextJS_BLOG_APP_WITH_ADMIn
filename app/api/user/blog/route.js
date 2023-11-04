import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blog";
import slugify from "slugify";
import { getToken } from "next-auth/jwt";

export async function POST(req) {
	await dbConnect();
	const _req = await req.json();
	// console.log("\n\n\n\t\t\t\t======>req--", _req);

	try {
		// get current user's id
		const token = await getToken({
			req,
			secret: process.env.NEXTAUTH_SECRET,
		});
		// console.log(`\n\n\n\t.... token found \n\n`);

		const { title, content, category, image } = _req;
		// console.log({
		// 	title,
		// 	content,
		// 	category,
		// 	image,
		// });
		switch (true) {
			case !title:
				console.log(`\n\n\n\t.... title not found \n\n`);
				return NextResponse.json({ err: "Title is required" }, { status: 400 });
			case !content:
				console.log(`\n\n\n\t.... content not found \n\n`);
				return NextResponse.json(
					{ err: "Content is required" },
					{ status: 400 }
				);
			case !category:
				console.log(`\n\n\n\t.... category not found \n\n`);
				return NextResponse.json(
					{ err: "Category is required" },
					{ status: 400 }
				);
		}

		// console.log(`\n\n\n\t.... all values are present \n\n`);

		// check if blog title is taken
		const existingBlog = await Blog.findOne({
			slug: slugify(title?.toLowerCase()),
		});

		if (existingBlog) {
			console.log(`\n\n\n\t.... Blog title is taken"\n\n`);
			return NextResponse.json({ err: "Blog title is taken" }, { status: 400 });
		}

		// create blog
		const blog = await Blog.create({
			title,
			content,
			category,
			image: image ? image : null,
			postedBy: token.user._id,
			slug: slugify(title?.toLowerCase()),
		});

		// console.log(`\n\n\n\t.... Blog is created here"\n\n`);

		return NextResponse.json(blog, { status: 200 });
	} catch (error) {
		console.log(`\n\n\n\t.... error in the server taken"\n\n`);
		console.log(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
