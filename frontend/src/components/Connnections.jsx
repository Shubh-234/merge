import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../store/slice/connectionsSlice";

const Connnections = () => {
	const [error, setError] = useState("");
	const connections = useSelector((store) => store.connections);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const fetchConnections = async () => {
		try {
			setLoading(true);
			setError("");

			const requestOptions = {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			};
			const response = await fetch(
				"http://localhost:7777/api/users/connections",
				requestOptions,
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const responseData = await response.json();

			if (responseData?.success === true) {
				dispatch(addConnections(responseData?.data));
			} else {
				setError(responseData?.message || "Failed to fetch connections");
			}
		} catch (error) {
			console.error("Error while fetching connections", error);

			setError(error?.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!connections) {
			console.log("fetching connections");
			fetchConnections();
		}
	}, []);

	if (!connections) {
		return null;
	}

	if (connections.length === 0) {
		return <div>No Connections found</div>;
	}

	return (
		<div className="min-h-screen bg-[#0B0F14] relative overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent"></div>
			<div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>
			<div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>

			<main className="relative max-w-6xl mx-auto px-4 py-12">
				{/* Header */}
				<div className="mb-12 space-y-3">
					<h1 className="text-2xl font-semibold text-gray-200 tracking-tight">
						Your Connections
					</h1>
					<p className="text-sm text-gray-500">
						Developers you've connected with on Merge
					</p>
				</div>

				{/* Loading State */}
				{loading && (
					<div className="flex items-center justify-center min-h-[400px]">
						<div className="text-center space-y-4">
							<div className="w-12 h-12 mx-auto border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
							<p className="text-sm text-gray-400">Loading connections...</p>
						</div>
					</div>
				)}

				{/* Error State */}
				{error && !loading && (
					<div className="flex items-center justify-center min-h-[400px]">
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
								Failed to load connections
							</h2>
							<p className="text-sm text-red-400">{error}</p>
							<button
								onClick={fetchConnections}
								className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition">
								Try Again
							</button>
						</div>
					</div>
				)}

				{/* Empty State */}
				{!loading && !error && connections.length === 0 && (
					<div className="flex items-center justify-center min-h-[400px]">
						<div className="text-center space-y-3">
							<div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center">
								<svg
									className="w-8 h-8 text-gray-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
							</div>
							<h2 className="text-lg font-medium text-gray-300">
								No connections yet
							</h2>
							<p className="text-sm text-gray-500">
								Start exploring developers to build your network
							</p>
						</div>
					</div>
				)}

				{/* Connections List */}
				{!loading && !error && connections.length > 0 && (
					<div className="max-w-3xl mx-auto space-y-4">
						{connections.map((connection) => (
							<ConnectionCard key={connection?._id} connection={connection} />
						))}
					</div>
				)}
			</main>
		</div>
	);
};

const ConnectionCard = ({ connection }) => {
	return (
		<div className="relative group">
			{/* Glow effect */}
			<div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

			{/* Card */}
			<div className="relative bg-[#121826] border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 p-6">
				<div className="flex items-start gap-6">
					{/* Circular Profile Photo */}
					<div className="flex-shrink-0">
						{connection?.photoUrl ? (
							<div className="relative group/avatar">
								<div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full opacity-60 group-hover/avatar:opacity-80 blur-sm transition duration-300"></div>
								<img
									src={connection.photoUrl}
									alt={`${connection?.firstName || "User"}'s profile`}
									className="relative w-24 h-24 rounded-full object-cover border-2 border-white/10"
								/>
							</div>
						) : (
							<div className="w-24 h-24 rounded-full bg-gradient-to-b from-indigo-600/20 to-transparent border-2 border-white/10 flex items-center justify-center">
								<svg
									className="w-12 h-12 text-gray-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
									/>
								</svg>
							</div>
						)}
					</div>

					{/* Content Section */}
					<div className="flex-grow min-w-0">
						<div className="flex items-start justify-between gap-4 mb-3">
							{/* Name and Info */}
							<div className="flex-grow min-w-0">
								<h3 className="text-lg font-semibold text-gray-200 tracking-tight mb-1">
									{connection?.firstName} {connection?.lastName}
								</h3>
								<div className="flex items-center gap-3 text-xs text-gray-500">
									{connection?.age && <span>{connection.age} years</span>}
									{connection?.age && connection?.gender && (
										<span className="text-gray-700">•</span>
									)}
									{connection?.gender && (
										<span className="capitalize">{connection.gender}</span>
									)}
								</div>
							</div>

							{/* Actions */}
							<div className="flex gap-2 flex-shrink-0">
								<button className="border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm px-4 py-2 rounded-lg transition-all duration-200">
									View Profile
								</button>
								<button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200">
									Message
								</button>
							</div>
						</div>

						{/* About */}
						{connection?.about && (
							<p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">
								{connection.about}
							</p>
						)}

						{/* Skills */}
						{connection?.skills && connection?.skills.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{connection.skills.slice(0, 5).map((skill, index) => (
									<span
										key={index}
										className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-md">
										{skill}
									</span>
								))}
								{connection.skills.length > 5 && (
									<span className="px-3 py-1 text-gray-500 text-xs">
										+{connection.skills.length - 5} more
									</span>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Connnections;
