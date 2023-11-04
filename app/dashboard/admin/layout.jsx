import Link from "next/link";

const Layout = ({ children }) => {
	return (
		<>
			<nav className='flex justify-center py-4'>
				<Link
					className='px-4 text-blue-500 text-xl hover:underline'
					href='/dashboard/admin'>
					Dashboard
				</Link>

				<Link
					className='px-4 text-blue-500 text-xl hover:underline'
					href='/dashboard/admin/blog/create'>
					Create New Blog
				</Link>

				<Link
					className='px-4 text-blue-500 text-xl hover:underline'
					href='/dashboard/admin/blog/list'>
					Blogs List
				</Link>
			</nav>

			{children}
		</>
	);
};

export default Layout;
  