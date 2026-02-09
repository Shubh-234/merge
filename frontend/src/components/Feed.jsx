import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/slice/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
	const dispatch = useDispatch();
	const feedData = useSelector((store) => store.feed);
	const user = useSelector((store) => store.user);
	const getFeed = async () => {
		if (feedData) {
			return null;
		}
		try {
			const requestOptions = {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			};
			const response = await fetch(
				"http://localhost:7777/api/users/feed",
				requestOptions,
			);
			const data = await response.json();
			dispatch(addFeed(data?.data));
		} catch (error) {
			console.error("Error fetching feed:", error);
		}
	};

	useEffect(() => {
		getFeed();
	}, []);

	if (feedData) {
		console.log("feed data in feed component", feedData);
	}

	const userToShow = feedData && feedData.length > 0 ? feedData[0] : null;

	return (
		<div className="min-h-screen bg-[#0B0F14] relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

			<main className="relative max-w-6xl mx-auto px-4 py-12">
				<div className="mb-12 text-center space-y-3">
					<h1 className="text-2xl font-semibold text-gray-200 tracking-tight">Discover Developers</h1>
					<p className="text-sm text-gray-500">Connect with talented developers in your network</p>
				</div>

				<UserCard user={userToShow} />
			</main>
		</div>
	);
};

export default Feed;
