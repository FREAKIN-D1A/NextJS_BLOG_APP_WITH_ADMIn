import Link from "next/link";

const Layout = ({ children }) => {
	return (
		<>
			<nav className='flex justify-center py-4'>
				<Link
					className='px-4 text-blue-500 text-xl hover:underline'
					href='/dashboard/user'>
					Dashboard
				</Link>

				<Link
					className='px-4 text-blue-500 text-xl hover:underline'
					href='/dashboard/user/blog/create'>
					Create New Blog
				</Link>

				<Link
					className='px-4 text-blue-500 text-xl hover:underline'
					href='/dashboard/user'>
					Dashboard
				</Link>
			</nav>

			{children}
		</>
	);
};

export default Layout;
