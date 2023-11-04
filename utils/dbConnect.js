import mongoose from "mongoose";

export default async function dbConnect() {
	if (mongoose.connection.readyState >= 1) {
		console.log(`\n\n\n>>> database connection is ALREADY EXISTS.`);
		return;
	}
	mongoose.connect(process.env.DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log(`\n\n\n>>> database connection is ESTABLISHED.`);
}
