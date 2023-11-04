import BlogCard from "@/components/blogs/BlogCard";

export default function BlogList({ blogs }) {
	return (
		<div className='container mx-auto mt-5'>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
				{blogs?.map((blog) => (
					<div className='mb-4' key={blog._id}>
						<BlogCard blog={blog} />
					</div>
				))}
			</div>
		</div>
	);
}
