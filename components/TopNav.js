import { useSession, signOut } from "next-auth/react";

const TopNav = () => {
	const { data, status } = useSession();
	// console.log(`data ====>\n\n\n\t ${data}`);

	// console.log(`status ====> \n\n\n\t ${status}`);

	const handleLogout = () => {
		signOut({ callbackUrl: "/login" });
	};

	return (
		<nav className='bg-blue-500 p-4 flex items-center justify-between'>
			<div className='flex items-center'>
				<a href='/'>
					{/* <img src='your-logo.png' alt='Logo' className='h-8 w-8 mr-2' /> */}
					<span className='text-white text-2xl font-bold'>Your Site</span>
				</a>
			</div>

			{status === "authenticated" ? (
				<div>
					<a
						href={`/dashboard/${
							data?.user?.role === "admin" ? "admin" : "user"
						}`} // Replace with your login route
						className='text-white font-semibold mr-4 hover:underline'>
						Dashboard ({data?.user?.name} : {data?.user?.role})
					</a>

					<a
						onClick={handleLogout} // Replace with your register route
						className='text-white font-semibold hover:underline hover:cursor-pointer'>
						Logout
					</a>
				</div>
			) : (
				<div>
					<a
						href='/login' // Replace with your login route
						className='text-white font-semibold mr-4 hover:underline'>
						Login
					</a>

					<a
						href='/register' // Replace with your register route
						className='text-white font-semibold hover:underline'>
						Register
					</a>
				</div>
			)}
		</nav>
	);
};

export default TopNav;
