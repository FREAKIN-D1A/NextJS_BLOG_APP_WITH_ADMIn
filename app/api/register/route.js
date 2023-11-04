import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/user";
import dbConnect from "@/utils/dbConnect";
import security from "@/utils/securities";

export async function POST(req) {
	await dbConnect();
	try {
		const { name, email, password } = await req.json();
		const userExists = await User.findOne({ email: email });
		if (!userExists) {
			await User.create({
				name,
				email,
				password: await bcrypt.hash(password, 10),
				// password: security.passwordSecureFcn(password),
			});

			return NextResponse.json(
				{ msg: `Success. User is created`, type: `server.success` },
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{ msg: "Sorry .User already exists.", type: `server.success.but logic fault` },
				{ status: 409 }
			);
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: error.message, msg: "Sorry server error." },
			{ status: 500 }
		);
	}
}
