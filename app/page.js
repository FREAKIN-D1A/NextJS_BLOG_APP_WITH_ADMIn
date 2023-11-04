import querySring from "query-string";
import Link from "next/link";
import BlogList from "@/components/blogs/BlogList";
import ShowLikedBlogs from "@/components/blogs/ShowLikedBlogs";

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
// 		console.log(`\n\n\nThe data is here.`, data);
// 		return data;

// 		// setLikedBlogs(data);
// 	} catch (error) {
// 		console.log(`\n\n\tFailed. Error :::\n\n`, error);
// 		console.log(`\n\n\tFailed. Error :::\n\n`, error.message);
// 	}
// }

async function getBlogs(searchParams) {
	// console.log(`searchParams:::::: `, searchParams);
	const urlParams = {
		page: searchParams.page || "1",
	};

	const searchQuery = new URLSearchParams(urlParams).toString();
	console.log(`serchQuery ==> `, searchQuery);

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/blog?${searchQuery}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			next: { revalidate: 1 },
		}
	);

	if (!response.ok) {
		console.log(`Failed to fetch blogs :::`, response);
		throw new Error("Failed to fetch blogs");
	}

	const data = await response.json();
	return data;
}

export default async function Home({ searchParams }) {
	const data = await getBlogs(searchParams);

	// console.log(`data blogs :::`, data);
	const { blogs, currentPage, totalPage } = data;

	const hasPreviousPage = currentPage > 1;
	const hasNextPage = currentPage < totalPage;
	// console.log({ blogs, currentPage, totalPage, hasPreviousPage, hasNextPage });
	// const likedblogs = await getLikedBlogsFromAPI(searchParams);

	return (
		<>
			<div>
				<p className='text-primary text-center text-2xl font-bold'>
					Latest Blogs
				</p>

				<BlogList blogs={blogs} />

				<div className='flex justify-center'>
					<nav className='flex justify-center' aria-label='Page navigation'>
						<ul className='pagination'>
							{hasPreviousPage && (
								<li className='page-item inline-block'>
									<Link
										className='inline-block px-3'
										href={`?page=${currentPage - 1}`}>
										Previous
									</Link>
								</li>
							)}

							{Array.from({ length: totalPage }, (_, index) => {
								const page = index + 1;
								return (
									<li
										key={page}
										className={`page-item ${
											currentPage === page ? "bg-blue-500" : "bg-gray-200"
										} inline-block `}>
										<Link className='page-link' href={`?page=${page}`}>
											{page}
										</Link>
									</li>
								);
							})}

							{hasNextPage && (
								<li className='page-item inline-block'>
									<Link
										className='page-link px-3 '
										href={`?page=${currentPage + 1}`}>
										Next
									</Link>
								</li>
							)}
						</ul>
					</nav>
				</div>
			</div>

			<ShowLikedBlogs />
		</>
	);
}
