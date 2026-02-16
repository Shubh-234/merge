import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../store/slice/requestsSlice";

const Requests = () => {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const requests = useSelector((state) => state.requests);
	const dispatch = useDispatch();

	const fetchConnectionRequests = async () => {
		try {
			setLoading(true);
			setError("");

			const requestOptions = {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			};
			const response = await fetch(
				"http://localhost:7777/api/users/requests/receive",
				requestOptions,
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const responseData = await response.json();

			if (responseData?.success === true) {
				dispatch(addRequests(responseData?.data));
			} else {
				setError(responseData?.message || "Something went wrong");
			}
		} catch (error) {
			console.error("Error while fetching connection requests", error);
			setError(error?.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!requests) {
			fetchConnectionRequests();
		}
	}, []);

	const handleAccept = async (requestId) => {
		if (!requestId) return;
		try {
			setError("");
			const response = await fetch(
				`http://localhost:7777/api/request/review/accepted/${requestId}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const responseData = await response.json();
			if (responseData?.success) {
				const updatedRequests = (requests || []).filter(
					(request) => request?._id !== requestId,
				);
				dispatch(addRequests(updatedRequests));
			} else {
				throw new Error(responseData?.message || "Failed to accept request");
			}
		} catch (error) {
			console.error("Error accepting request", error);
			setError(error?.message || "Failed to accept request");
		}
	};

	const handleIgnore = async (requestId) => {
		if (!requestId) {
			return;
		}

		try {
			setError("");
			const response = await fetch(
				`http://localhost:7777/api/request/review/rejected/${requestId}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				},
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const responseData = await response.json();
			if (responseData?.success) {
				const updatedRequests = (requests || []).filter(
					(request) => request?._id !== requestId,
				);
				dispatch(addRequests(updatedRequests));
			} else {
				throw new Error(responseData?.message || "Failed to accept request");
			}
		} catch (error) {
			console.error("Error ignoring request", error);
			setError(error?.message || "Failed to ignore request");
		}
	};

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
						Connection Requests
					</h1>
					<p className="text-sm text-gray-500">
						Developers who want to connect with you
					</p>
				</div>

				{/* Loading State */}
				{loading && (
					<div className="flex items-center justify-center min-h-[400px]">
						<div className="text-center space-y-4">
							<div className="w-12 h-12 mx-auto border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
							<p className="text-sm text-gray-400">Loading requests...</p>
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
								Failed to load requests
							</h2>
							<p className="text-sm text-red-400">{error}</p>
							<button
								onClick={fetchConnectionRequests}
								className="mt-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition">
								Try Again
							</button>
						</div>
					</div>
				)}

				{/* Empty State */}
				{!loading && !error && requests && requests.length === 0 && (
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
										d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
									/>
								</svg>
							</div>
							<h2 className="text-lg font-medium text-gray-300">
								No pending requests
							</h2>
							<p className="text-sm text-gray-500">
								You're all caught up! Check back later for new connection
								requests
							</p>
						</div>
					</div>
				)}

				{/* Requests List */}
				{!loading && !error && requests && requests.length > 0 && (
					<div className="max-w-3xl mx-auto space-y-4">
						{requests.map((request) => (
							<RequestCard
								key={request?._id}
								request={request}
								onAccept={handleAccept}
								onIgnore={handleIgnore}
							/>
						))}
					</div>
				)}
			</main>
		</div>
	);
};

const RequestCard = ({ request, onAccept, onIgnore }) => {
	const requester = request?.fromUserId;

	return (
		<div className="relative group">
			{/* Glow effect */}
			<div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>

			{/* Card */}
			<div className="relative bg-[#121826] border border-white/10 rounded-xl hover:border-white/20 transition-all duration-300 p-6">
				<div className="flex items-start gap-6">
					{/* Circular Profile Photo */}
					<div className="flex-shrink-0">
						{requester?.photoUrl ? (
							<div className="relative group/avatar">
								<div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full opacity-60 group-hover/avatar:opacity-80 blur-sm transition duration-300"></div>
								<img
									src={requester.photoUrl}
									alt={`${requester?.firstName || "User"}'s profile`}
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
									{requester?.firstName} {requester?.lastName}
								</h3>
								<div className="flex items-center gap-3 text-xs text-gray-500">
									{requester?.age && <span>{requester.age} years</span>}
									{requester?.age && requester?.gender && (
										<span className="text-gray-700">•</span>
									)}
									{requester?.gender && (
										<span className="capitalize">{requester.gender}</span>
									)}
								</div>
							</div>

							{/* Status Badge */}
							<div className="flex-shrink-0">
								<span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs rounded-full">
									<svg
										className="w-3 h-3"
										fill="currentColor"
										viewBox="0 0 20 20">
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
											clipRule="evenodd"
										/>
									</svg>
									Pending
								</span>
							</div>
						</div>

						{/* About */}
						{requester?.about && (
							<p className="text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">
								{requester.about}
							</p>
						)}

						{/* Skills */}
						{requester?.skills && requester?.skills.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-4">
								{requester.skills.slice(0, 5).map((skill, index) => (
									<span
										key={index}
										className="px-3 py-1 bg-white/5 border border-white/10 text-gray-400 text-xs rounded-md">
										{skill}
									</span>
								))}
								{requester.skills.length > 5 && (
									<span className="px-3 py-1 text-gray-500 text-xs">
										+{requester.skills.length - 5} more
									</span>
								)}
							</div>
						)}

						{/* Action Buttons */}
						<div className="flex gap-3">
							<button
								onClick={() => onIgnore(request._id)}
								className="flex-1 relative group/btn overflow-hidden border border-white/10 hover:border-red-500/50 text-gray-300 hover:text-red-300 text-sm font-medium px-6 py-2.5 rounded-lg transition-all duration-300">
								<span className="relative z-10 flex items-center justify-center gap-2">
									<svg
										className="w-4 h-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
									Reject
								</span>
								<div className="absolute inset-0 bg-red-500/0 group-hover/btn:bg-red-500/10 transition-colors duration-300"></div>
							</button>

							<button
								onClick={() => onAccept(request._id)}
								className="flex-1 relative group/btn overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-600 text-white text-sm font-medium px-6 py-2.5 rounded-lg shadow-lg shadow-indigo-900/50 hover:shadow-indigo-900/70 transition-all duration-300">
								<span className="relative z-10 flex items-center justify-center gap-2">
									<svg
										className="w-4 h-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth={2}>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M5 13l4 4L19 7"
										/>
									</svg>
									Accept
								</span>
								<div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Requests;
