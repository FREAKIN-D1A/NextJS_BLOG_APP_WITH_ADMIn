"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function AdminBlogCreate() {
	// state
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState("");
	const [loading, setLoading] = useState(false);

	const router = useRouter();

	// image upload to cloudinary
	const uploadImage = async (e) => {
		const file = e.target.files[0];

		if (file) {
			setLoading(true);
			const formData = new FormData();
			formData.append("file", file);
			formData.append(
				"upload_preset",
				process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
			);

			// upload to cloudinary
			try {
				// console.log("\n\n\n\t....trying to upload the picture to cloudinary");
				const response = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL, {
					method: "POST",
					body: formData,
				});

				if (response.ok) {
					const data = await response.json();
					// console.log("\n\n\n\t....image upload response => ", data);
					setLoading(false);
					setImage(data.secure_url);
				} else {
					console.log("\n\n\n\t....response not ok dude.");
				}
			} catch (error) {
				setLoading(false);
				console.log(error);
				console.log(error.message);
			}
		}
	};

	// submit to create blog api
	const handleSubmit = async (e) => {
		// console.log(JSON.stringify({ title, content, category, image }));
		// console.log(`${process.env.NEXT_PUBLIC_API_URL}/admin/blog`);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/admin/blog`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ title, content, category, image }),
				}
			);

			if (response.ok) {
				router.push("/dashboard/admin");
				toast.success("Blog created successfully");
			} else {
				const errorData = await response.json();
				toast.error(errorData.err);
				toast.error(errorData.err);

				// console.log("\n\n\n\t....response not ok dude.");
			}
		} catch (error) {
			console.log(error);
			toast.error("An error occurred. Try again.");
		}
	};

	// return jsx / blog create form
	return (
		<div className='container mx-auto my-5  '>
			<div className=' mx-auto gap-6'>
				<div className=' mx-auto w-1/2'>
					<p className='text-xl text-center my-5 md:text-2xl font-semibold'>
						Create Blog
					</p>

					<label className='text-gray-600'>Blog title</label>
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='w-full p-2 my-2 border rounded'
					/>

					<label className='text-gray-600'>Blog content</label>
					<ReactQuill
						className='w-full p-2 my-2 border rounded'
						value={content}
						onChange={(e) => setContent(e)}
					/>

					<label className='text-gray-600'>Blog category</label>
					<input
						type='text'
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						className='w-full p-2 my-2 border rounded'
					/>

					{image && (
						<img
							src={image}
							alt='preview image'
							className='w-64 md:w-48 mt-2 rounded'
						/>
					)}

					<div className='mt-4'>
						<label className='inline-block text-gray-600 cursor-pointer rounded border-2 p-3'>
							{loading ? "Uploading..." : "Upload image"}
							<input
								type='file'
								accept='image/*'
								onChange={uploadImage}
								className='hidden'
							/>
						</label>
					</div>

					<button
						className='w-full mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 rounded'
						disabled={loading}
						onClick={handleSubmit}>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
