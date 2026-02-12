import { useState } from "react";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slice/userSlice";
import Toast from "./Toast";

const EditProfile = ({ user }) => {
	const [email, setEmail] = useState(user?.email || "");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [firstName, setFirstName] = useState(user?.firstName || "");
	const [lastName, setLastName] = useState(user?.lastName || "");
	const [age, setAge] = useState(user?.age || "");
	const [gender, setGender] = useState(user?.gender || "");
	const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
	const [about, setAbout] = useState(user?.about || "");
	const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
	const [showToast, setShowToast] = useState(false);

	const dispatch = useDispatch();

	const previewUser = {
		email,
		firstName,
		lastName,
		age,
		gender,
		photoUrl,
		about,
		skills: skills.split(",").map((skill) => skill.trim()),
		_id: user?._id,
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const requestOptions = {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(previewUser),
				credentials: "include",
			};
			const response = await fetch(
				`http://localhost:7777/api/users/update/${previewUser._id}`,
				requestOptions,
			);
			if (!response.ok) {
				throw new Error("Failed to update user");
			}
			const updatedUser = await response.json();
			dispatch(addUser(updatedUser?.updatedUser));
			setShowToast(true);
		} catch (error) {
			console.error("Update error:", error);
			setIsLoading(false);
			return;
		} finally {
			setIsLoading(false);
		}
	};

	const genderList = [
		{
			displayText: "Male",
			value: "male",
		},
		{
			displayText: "Female",
			value: "female",
		},
	];

	return (
		<>
			{/* Edit Form Section */}
			<div className="w-full bg-[#121826] border border-white/10 rounded-lg p-8">
				<div className="mb-8">
					<h2 className="text-xl font-semibold text-gray-200 mb-2">
						Edit Profile
					</h2>
					<p className="text-sm text-gray-400">Update your information</p>
				</div>

				<form onSubmit={handleUpdate} className="space-y-4">
					<div className="w-full">
						<label
							className="block text-sm font-medium text-gray-300 mb-2"
							htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:border-indigo-500 transition"
							required
						/>
					</div>

					<div className="w-full">
						<label
							className="block text-sm font-medium text-gray-300 mb-2"
							htmlFor="firstName">
							First Name
						</label>
						<input
							type="text"
							id="firstName"
							placeholder="Enter your first name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							className="w-full bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:border-indigo-500 transition"
							required
						/>
					</div>

					<div className="w-full">
						<label
							className="block text-sm font-medium text-gray-300 mb-2"
							htmlFor="lastName">
							Last Name
						</label>
						<input
							type="text"
							id="lastName"
							placeholder="Enter your last name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							className="w-full bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:border-indigo-500 transition"
							required
						/>
					</div>

					{user?.age && (
						<div className="w-full">
							<label
								className="block text-sm font-medium text-gray-300 mb-2"
								htmlFor="age">
								Age
							</label>
							<input
								type="number"
								id="age"
								placeholder="Enter your age"
								value={age}
								onChange={(e) => setAge(e.target.value)}
								className="w-full bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:border-indigo-500 transition"
								required
							/>
						</div>
					)}

					<div className="w-full">
						<label
							className="block text-sm font-medium text-gray-300 mb-2"
							htmlFor="gender">
							Gender
						</label>
						<select
							id="gender"
							value={gender}
							onChange={(e) => setGender(e.target.value)}
							className="w-full bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:border-indigo-500 transition"
							required>
							{genderList.map((genderOption) => (
								<option key={genderOption.value} value={genderOption.value}>
									{genderOption.displayText}
								</option>
							))}
						</select>
					</div>

					{user?.photoUrl && (
						<div className="w-full">
							<label
								className="block text-sm font-medium text-gray-300 mb-2"
								htmlFor="photoUrl">
								Photo URL
							</label>
							<input
								type="text"
								id="photoUrl"
								placeholder="Set your photo URL"
								value={photoUrl}
								onChange={(e) => setPhotoUrl(e.target.value)}
								className="w-full bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:border-indigo-500 transition"
								required
							/>
						</div>
					)}

					{user?.about && (
						<div className="w-full">
							<label
								className="block text-sm font-medium text-gray-300 mb-2"
								htmlFor="about">
								About
							</label>
							<textarea
								id="about"
								placeholder="Tell us about yourself"
								value={about}
								onChange={(e) => setAbout(e.target.value)}
								className="w-full bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:border-indigo-500 transition resize-none"
								rows="4"
								required
							/>
						</div>
					)}

					{user?.skills && user?.skills.length > 0 && (
						<div className="w-full">
							<label
								className="block text-sm font-medium text-gray-300 mb-2"
								htmlFor="skills">
								Skills
							</label>
							<input
								type="text"
								id="skills"
								placeholder="Enter your skills (comma separated)"
								value={skills}
								onChange={(e) => setSkills(e.target.value)}
								className="w-full bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:border-indigo-500 transition"
								required
							/>
						</div>
					)}

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8">
						{isLoading ? (
							<>
								<span className="loading loading-spinner loading-sm"></span>
								Updating Profile...
							</>
						) : (
							"Update Profile"
						)}
					</button>
					{error && <p className="text-red-400 text-sm mt-2">{error}</p>}
				</form>
			</div>

			{/* Live Preview Section */}
			<div className="w-full">
				<div className="bg-[#121826] border border-white/10 rounded-lg p-8">
					<h3 className="text-base font-medium text-gray-200 mb-4">
						Live Preview
					</h3>
					<UserCard user={previewUser} />
				</div>
			</div>

			{/* Success Toast */}
			{showToast && (
				<Toast
					message="Profile updated successfully"
					onClose={() => setShowToast(false)}
					duration={3000}
				/>
			)}
		</>
	);
};

export default EditProfile;
