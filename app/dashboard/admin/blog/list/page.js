import querySring from "query-string";
import Link from "next/link";
import BlogList from "@/components/blogs/BlogList";
import ShowLikedBlogs from "@/components/blogs/ShowLikedBlogs";
import DeleteButton from "@/components/blogs/DeleteButton";

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

export default async function List({ searchParams }) {
	const data = await getBlogs(searchParams);

	// console.log(`data blogs :::`, data);
	const { blogs, currentPage, totalPage } = data;

	const hasPreviousPage = currentPage > 1;
	const hasNextPage = currentPage < totalPage;
	// console.log({ blogs, currentPage, totalPage, hasPreviousPage, hasNextPage });
	// const likedblogs = await getLikedBlogsFromAPI(searchParams);

	

	// const handleDeleteOO = async (e) => {
	// 	// console.log(JSON.stringify({ title, content, category, image }));
	// 	// console.log(`${process.env.NEXT_PUBLIC_API_URL}/admin/blog`);

	// 	try {
	// 		const response = await fetch(
	// 			`${process.env.NEXT_PUBLIC_API_URL}/admin/blog/${id}`,
	// 			{
	// 				method: "DELETE",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify({ title, content, category, image }),
	// 			}
	// 		);

	// 		if (response.ok) {
	// 			router.push("/dashboard/admin");
	// 			toast.success("Blog updated successfully");
	// 		} else {
	// 			const errorData = await response.json();
	// 			toast.error(errorData.err);
	// 			toast.error(errorData.err);

	// 			// console.log("\n\n\n\t....response not ok dude.");
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 		toast.error("An error occurred. Try again.");
	// 	}
	// };

	return (
		<>
			<div>
				<p className='text-primary text-center text-2xl font-bold'>
					Latest Blogs
				</p>

				{blogs.map((blog) => (
					<div
						key={blog._id}
						className='w-3/4 mx-auto flex justify-between items-center p-4 bg-gray-100 rounded mb-4'>
						<p className='text-lg font-semibold'>{blog.title}</p>
						<div>
							<Link
								href={`/dashboard/admin/blog/update/${blog.slug}`}
								className='px-3 py-1 bg-blue-500 text-white rounded-full ml-2'>
								Update
							</Link>
							<DeleteButton blog={blog} />
						</div>
					</div>
				))}

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
