import React from "react";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";

const Profile = ({ user }) => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4">
			<div className="max-w-7xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-blue-600 mb-2">
						Your Profile
					</h1>
					<p className="text-gray-600">
						Edit your profile and see live preview
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
					<div className="w-full">
						<EditProfile user={user} />
					</div>

					<div className="w-full lg:sticky lg:top-8">
						<div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
							<h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
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
