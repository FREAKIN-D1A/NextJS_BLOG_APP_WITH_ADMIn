"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/";

	const buttonClasses = loading ? "bg-orange-500" : "bg-blue-500";

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			setLoading(true);
			console.log("Sign In via credentals ");
			const result = await signIn("credentials", {
				email,
				password,
				redirect: false,
			});

			if (result.error) {
				toast.error(result.error);
				setLoading(false);
			} else {
				toast.success("Login successful");
				setLoading(false);
				router.push(callbackUrl);
			}
		} catch (error) {
			toast.error(error.message);
			toast.error("something is wrong with your LOGIN");
			setLoading(false);
		}
		setLoading(false);
	};

	const handleGoogleLogin = (e) => {
		// Perform Google registration logic here
		e.preventDefault();
		console.log("SIgn in with Google...");
		signIn("google", {
			callbackUrl,
		});
	};

	return (
		<div className='max-w-md mx-auto p-4'>
			<h2 className='text-2xl font-semibold mb-4'>Login</h2>

			<div className='mb-4'>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className='w-full px-3 py-2 rounded border'
				/>
			</div>

			<div className='mb-4'>
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className='w-full px-3 py-2 rounded border'
				/>
			</div>

			<button
				onClick={handleLogin}
				disabled={loading || !email || !password}
				className={
					loading || !email || !password
						? `bg-orange-300 text-white p-2 rounded w-full mb-4`
						: `bg-blue-500 text-white p-2 rounded w-full mb-4`
				}>
				{!loading ? `Login` : `Please wait...`}
			</button>
			<button
				onClick={handleGoogleLogin}
				className='bg-red-500 text-white p-2 rounded w-full'>
				Sign in with Google
			</button>
		</div>
	);
};

export default Login;
