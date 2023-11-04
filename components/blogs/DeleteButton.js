"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DeleteButton({ blog }) {
	const router = useRouter();

	const handleDelete = async (blogId) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this blog?"
		);

		if (confirmDelete) {
			try {
				const response = await fetch(`/api/admin/blog/${blogId}`, {
					method: "DELETE",
				});

				if (response.ok) {
					// router.push("/dashboard/admin/blog/list");
					toast.success("Blog updated successfully");
					window.location.reload();
				} else {
					console.error("Delete request failed.");
				}
			} catch (error) {
				console.error("An error occurred:::::::::", error);
			}
		}
	};

	return (
		<button
			// href={`/dashboard/admin/blog/delete/${blog.slug}`}
			onClick={async (e) => {
				handleDelete(blog._id);
			}}
			className='px-3 py-1 bg-red-500 text-white rounded-full ml-2'>
			Delete
		</button>
	);
}
