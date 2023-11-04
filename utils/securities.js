import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/user";
import bcrypt from "bcrypt";
const saltRounds = 10;
import dbConnect from "@/utils/dbConnect";

const passwordSecureFcn = async (
	plainTextPassword,
	saltRounds = saltRounds
) => {
	return await bcrypt.hash(plainTextPassword, saltRounds);
};

const passwordCompareFcn = async (
	anotherPassword,
	savedHashedPassword,
	saltRounds = saltRounds
) => {
	return await bcrypt.compare(anotherPassword, savedHashedPassword);
};

const security = { passwordSecureFcn, passwordCompareFcn };
export default security;
