import React from "react";

const UserCard = ({ user }) => {
	if (!user) {
		return (
			<div className="flex items-center justify-center min-h-[600px]">
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-600 mb-2">
						No more profiles
					</h2>
					<p className="text-gray-500">Check back later for new matches!</p>
				</div>
			</div>
		);
	}

	const handleIgnore = () => {
		console.log("Ignored:", user);
		// Add ignore logic here
	};

	const handleInterested = () => {
		console.log("Interested in:", user);
		// Add interested logic here
	};

	return (
		<div className="flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md">
				{/* Main Card */}
				<div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
					{/* Profile Image */}
					<div className="relative h-96 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
						<img
							src={
								user?.photoUrl ||
								"https://via.placeholder.com/400x600?text=No+Photo"
							}
							alt={`${user?.firstName || "User"}'s profile`}
							className="w-full h-full object-cover"
						/>
						{/* Gradient Overlay */}
						<div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

						{/* Name & Age Overlay */}
						<div className="absolute bottom-0 left-0 right-0 p-6 text-white">
							<h2 className="text-3xl font-bold mb-1">
								{user?.firstName} {user?.lastName}
								{user?.age && (
									<span className="font-normal text-2xl">, {user.age}</span>
								)}
							</h2>
							{user?.gender && (
								<p className="text-sm opacity-90 capitalize">{user.gender}</p>
							)}
						</div>
					</div>

					{/* Card Content */}
					<div className="p-6">
						{/* About Section */}
						{user?.about && (
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-2">
									About
								</h3>
								<p className="text-gray-600 leading-relaxed">{user.about}</p>
							</div>
						)}

						{/* Skills Section */}
						{user?.skills && user.skills.length > 0 && (
							<div className="mb-6">
								<h3 className="text-lg font-semibold text-gray-900 mb-3">
									Skills
								</h3>
								<div className="flex flex-wrap gap-2">
									{user.skills.map((skill, index) => (
										<span
											key={index}
											className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full border border-blue-200">
											{skill}
										</span>
									))}
								</div>
							</div>
						)}

						{/* Action Buttons */}
						<div className="flex gap-4 mt-8">
							{/* Ignore Button */}
							<button
								onClick={handleIgnore}
								className="flex-1 bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-semibold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-sm">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={2}
									stroke="currentColor"
									className="w-6 h-6">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
								Ignore
							</button>

							{/* Interested Button */}
							<button
								onClick={handleInterested}
								className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 24 24"
									strokeWidth={0}
									className="w-6 h-6">
									<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
								</svg>
								Interested
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
