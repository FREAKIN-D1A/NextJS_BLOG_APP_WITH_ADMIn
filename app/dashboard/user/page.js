"use client";
// import BlogList from "@/components/blogs/BlogList";
// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { useEffect, useState } from "react";
import ShowLikedBlogs from "@/components/blogs/ShowLikedBlogs";

export default function Page() {
	// const [likedBlogs, setLikedBlogs] = useState([]);

	// async function getLikedBlogsFromAPI() {
	// 	try {
	// 		const response = await fetch(
	// 			`${process.env.NEXT_PUBLIC_API_URL}/user/liked-blogs`,
	// 			{
	// 				method: "GET",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				next: { revalidate: 1 },
	// 			}
	// 		);

	// 		// console.log(`\n\n\n\n\n\tResponse:::`, response);
	// 		if (!response.ok) {
	// 			console.log(`\n\n\t\tFailed to fetch blogs :::\n\n\n\n\t\t`, response);
	// 			throw new Error("Failed to fetch blogs");
	// 		}

	// 		const data = await response.json();

	// 		// return data;
	// 		console.log(`\n\n\nThe data is here.`, data);
	// 		setLikedBlogs(data);
	// 	} catch (error) {
	// 		console.log(`\n\n\tFailed. Error :::\n\n`, error);
	// 		console.log(`\n\n\tFailed. Error :::\n\n`, error.message);
	// 	}
	// }

	// useEffect(() => {
	// 	// const data = getLikedBlogs();
	// 	getLikedBlogsFromAPI();
	// }, []);

	return (
		<>
			<ShowLikedBlogs />
			{/* <BlogList blogs={likedBlogs} /> */}
			{/* <pre>{JSON.stringify(likedBlogs)}</pre> */}
		</>
	);
}
