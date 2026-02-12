import React from "react";

const UserCard = ({ user }) => {
	if (!user) {
		return (
			<div className="flex items-center justify-center min-h-[600px]">
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
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
							/>
						</svg>
					</div>
					<h2 className="text-xl font-semibold text-gray-300">
						No more profiles
					</h2>
					<p className="text-sm text-gray-600">
						Check back later for new matches
					</p>
				</div>
			</div>
		);
	}

	const handleIgnore = () => {
		console.log("Ignored:", user);
	};

	const handleInterested = () => {
		console.log("Interested in:", user);
	};

	return (
		<div className="w-full max-w-lg mx-auto">
			<div className="relative group">
				<div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500"></div>

				<div className="relative bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
					<div className="relative h-[500px] overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D1117]/40 to-[#0D1117]"></div>
						<img
							src={user?.photoUrl}
							alt={`${user?.firstName || "User"}'s profile`}
							className="w-full h-full object-cover"
						/>

						<div className="absolute bottom-0 left-0 right-0 p-8 space-y-2">
							<div className="flex items-end justify-between">
								<div>
									<h2 className="text-3xl font-semibold text-white mb-1 tracking-tight">
										{user?.firstName} {user?.lastName}
										{user?.age && (
											<span className="text-2xl font-normal text-gray-300 ml-2">
												{user.age}
											</span>
										)}
									</h2>
									{user?.gender && (
										<p className="text-sm text-gray-400 capitalize tracking-wide">
											{user.gender}
										</p>
									)}
								</div>
							</div>
						</div>
					</div>

					<div className="p-8 bg-gradient-to-b from-[#0D1117] to-[#121826] space-y-8">
						{user?.about && (
							<div className="space-y-3">
								<h3 className="text-xs uppercase tracking-wider text-gray-500 font-medium">
									About
								</h3>
								<p className="text-sm text-gray-300 leading-relaxed">
									{user.about}
								</p>
							</div>
						)}

						{user?.skills && user?.skills.length > 0 && (
							<div className="space-y-4">
								<h3 className="text-xs uppercase tracking-wider text-gray-500 font-medium">
									Skills
								</h3>
								<div className="flex flex-wrap gap-2">
									{user?.skills.map((skill, index) => (
										<span
											key={index}
											className="group/skill relative px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/50 text-gray-300 hover:text-white text-sm rounded-lg transition-all duration-300 cursor-default">
											<span className="relative z-10">{skill}</span>
											<div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-600/10 to-purple-600/0 opacity-0 group-hover/skill:opacity-100 rounded-lg transition-opacity duration-300"></div>
										</span>
									))}
								</div>
							</div>
						)}

						<div className="flex gap-3 pt-6">
							<button
								onClick={handleIgnore}
								className="flex-1 relative group/btn overflow-hidden border border-white/10 hover:border-white/20 text-gray-300 hover:text-white text-sm font-medium px-6 py-3.5 rounded-xl transition-all duration-300">
								<span className="relative z-10 flex items-center justify-center gap-2">
									<svg
										className="w-5 h-5"
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
									Ignore
								</span>
								<div className="absolute inset-0 bg-white/0 group-hover/btn:bg-white/5 transition-colors duration-300"></div>
							</button>

							<button
								onClick={handleInterested}
								className="flex-1 relative group/btn overflow-hidden bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-600 text-white text-sm font-medium px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-900/50 hover:shadow-indigo-900/70 transition-all duration-300">
								<span className="relative z-10 flex items-center justify-center gap-2">
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 24 24">
										<path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
									</svg>
									Connect
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

export default UserCard;
