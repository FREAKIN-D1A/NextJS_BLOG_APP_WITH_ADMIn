"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();
	const buttonClasses = loading ? "bg-orange-500" : "bg-blue-500";

	const handleRegister = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			setLoading(true);
			console.log(
				` process.env.API_URL =>>> ${process.env.NEXT_PUBLIC_API_URL}`,
				JSON.stringify({ name, email, password })
			);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/register`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ name, email, password }),
				}
			);

			if (!response.ok) {
				const data = await response.json();
				console.log(`data =>>> ${data} `);
				toast.error(data.msg);
				toast.error(data.type);
				setLoading(false);
				return;
			}

			const data = await response.json();
			toast.success(data.msg);
			setLoading(false);
			router.push("/login");
		} catch (error) {
			console.error(error);
			toast.error("An client error occurred. Try again.");
			setLoading(false);
		}
	};

	const handleGoogleRegister = (e) => {
		// Perform Google registration logic here
		e.preventDefault();

		console.log("Registering with Google...");

		const handleGoogleLogin = () => {
			// Perform Google registration logic here
			console.log("Register SIgn in with Google...");
			signIn("google", {
				callbackUrl: `/`,
			});
		};
	};

	return (
		<div className='max-w-md mx-auto p-4'>
			<h2 className='text-2xl font-semibold mb-4'>Register</h2>
			<div className='mb-4'>
				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
					className='w-full px-3 py-2 rounded border'
				/>
			</div>
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
				onClick={handleRegister}
				disabled={loading || !name || !email || !password}
				className={
					loading || !name || !email || !password
						? `bg-orange-300 text-white p-2 rounded w-full mb-4`
						: `bg-blue-500 text-white p-2 rounded w-full mb-4`
				}>
				{!loading ? `Register` : `Please wait...`}
			</button>
			<button
				onClick={handleGoogleRegister}
				className='bg-red-500 text-white p-2 rounded w-full'>
				Register with Google
			</button>
		</div>
	);
};

export default Register;
