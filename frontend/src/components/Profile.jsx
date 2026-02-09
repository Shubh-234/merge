import React from "react";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";

const Profile = ({ user }) => {
	return (
		<div className="min-h-screen bg-[#0B0F14] py-12 px-4">
			<div className="max-w-6xl mx-auto">
				<div className="mb-8">
					<h1 className="text-2xl font-semibold text-gray-200 mb-2">
						Your Profile
					</h1>
					<p className="text-sm text-gray-400">
						Edit your profile and see live preview
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
					<div className="w-full">
						<EditProfile user={user} />
					</div>

					<div className="w-full lg:sticky lg:top-8">
						<div className="bg-[#121826] border border-white/10 rounded-lg p-8">
							<h3 className="text-base font-medium text-gray-200 mb-4">
								Live Preview
							</h3>
							<UserCard user={user} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
