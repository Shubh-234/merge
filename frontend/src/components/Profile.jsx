import React from "react";
import EditProfile from "./EditProfile";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";

const Profile = () => {
	const user = useSelector((store) => store.user);
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
					<EditProfile user={user} />
				</div>
			</div>
		</div>
	);
};

export default Profile;
