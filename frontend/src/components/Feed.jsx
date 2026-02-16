import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/slice/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
	const dispatch = useDispatch();
	const feedData = useSelector((store) => store.feed);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const getFeed = async () => {
		if (feedData) {
			return;
		}

		try {
			setLoading(true);
			setError("");

			const requestOptions = {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			};
			const response = await fetch(
				"http://localhost:7777/api/users/feed",
				requestOptions,
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			if (data?.success) {
				dispatch(addFeed(data?.data || []));
			} else {
				setError(data?.message || "Failed to load feed");
			}
		} catch (error) {
			console.error("Error fetching feed:", error);
			setError(
				error?.message || "Failed to load feed. Please try again later.",
			);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getFeed();
	}, []);

	const userToShow = feedData && feedData.length > 0 ? feedData[0] : null;

	return (
		<div className="min-h-screen bg-[#0B0F14] relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

			<main className="relative max-w-6xl mx-auto px-4 py-12">
				<div className="mb-12 text-center space-y-3">
					<h1 className="text-2xl font-semibold text-gray-200 tracking-tight">
						Discover Developers
					</h1>
					<p className="text-sm text-gray-500">
						Connect with talented developers in your network
					</p>
				</div>

				{/* Loading State */}
				{loading && (
					<div className="flex items-center justify-center min-h-[600px]">
						<div className="text-center space-y-4">
							<div className="w-12 h-12 mx-auto border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
							<p className="text-sm text-gray-400">Loading developers...</p>
						</div>
					</div>
				)}

				{/* Error State */}
				{error && !loading && (
					<div className="flex items-center justify-center min-h-[600px]">
						<div className="text-center space-y-3">
							<div className="w-16 h-16 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
								<svg
									className="w-8 h-8 text-red-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
							</div>
							<h2 className="text-lg font-medium text-gray-300">
								Failed to load feed
							</h2>
							<p className="text-sm text-red-400">{error}</p>
							<button
								onClick={getFeed}
								className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition">
								Try Again
							</button>
						</div>
					</div>
				)}

				{/* Feed Content */}
				{!loading && !error && <UserCard user={userToShow} inFeed={true} />}
			</main>
		</div>
	);
};

export default Feed;
