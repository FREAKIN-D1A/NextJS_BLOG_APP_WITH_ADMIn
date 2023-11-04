import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import BlogLike from "@/components/blogs/BlogLike";
 
dayjs.extend(relativeTime);

export default function BlogCard({ blog }) {
	return (
		<div className='rounded-lg overflow-hidden shadow-lg mb-4'>
			<div style={{ height: "200px", overflow: "hidden" }}>
				<img
					src={blog?.image || "/images/default-blog.jpg"}
					className='w-full h-full object-cover'
					alt={blog.title}
				/>
			</div>

			<div className='p-4'>
				<h5 className='text-2xl font-semibold mb-2'>
					<Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
				</h5>

				<div className='text-gray-700 mb-2'>
					<div
						dangerouslySetInnerHTML={{
							__html:
								blog.content.length > 160
									? `${blog.content.substring(0, 160)}...`
									: blog.content,
						}}></div>
				</div>

				<div className='flex justify-between items-center text-gray-500'>
					<small>Category: {blog.category}</small>
					<small>Author: {blog?.postedBy?.name || "Admin"}</small>
				</div>

				<div className='flex justify-between items-center mt-2 text-gray-500'>
					<BlogLike blog={blog} />
			
					<small>Posted {dayjs(blog.createdAt).fromNow()}</small>
				</div>
			</div>
		</div>
	);
}
