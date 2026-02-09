import React from "react";
import { useState } from "react";

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

	return (
		<div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
			<div className="text-center mb-8">
				<h2 className="text-3xl font-bold text-blue-600 mb-2">
					Edit Profile
				</h2>
				<p className="text-gray-600">Update your information</p>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					alert("sd");
				}}
				className="space-y-5">
				<div className="w-full">
					<label
						className="block text-sm font-medium text-gray-700 mb-2"
						htmlFor="email">
						Email
					</label>
					<input
						type="email"
						id="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
						required
					/>
				</div>

				<div className="w-full">
					<label
						className="block text-sm font-medium text-gray-700 mb-2"
						htmlFor="firstName">
						First Name
					</label>
					<input
						type="text"
						id="firstName"
						placeholder="Enter your first name"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
						required
					/>
				</div>

				<div className="w-full">
					<label
						className="block text-sm font-medium text-gray-700 mb-2"
						htmlFor="lastName">
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						placeholder="Enter your last name"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
						required
					/>
				</div>

				{user?.age && (
					<div className="w-full">
						<label
							className="block text-sm font-medium text-gray-700 mb-2"
							htmlFor="age">
							Age
						</label>
						<input
							type="number"
							id="age"
							placeholder="Enter your age"
							value={age}
							onChange={(e) => setAge(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
							required
						/>
					</div>
				)}

				{user?.gender && (
					<div className="w-full">
						<label
							className="block text-sm font-medium text-gray-700 mb-2"
							htmlFor="gender">
							Gender
						</label>
						<input
							type="text"
							id="gender"
							placeholder="Enter your gender"
							value={gender}
							onChange={(e) => setGender(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
							required
						/>
					</div>
				)}

				{user?.photoUrl && (
					<div className="w-full">
						<label
							className="block text-sm font-medium text-gray-700 mb-2"
							htmlFor="photoUrl">
							Photo URL
						</label>
						<input
							type="text"
							id="photoUrl"
							placeholder="Set your photo URL"
							value={photoUrl}
							onChange={(e) => setPhotoUrl(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
							required
						/>
					</div>
				)}

				{user?.about && (
					<div className="w-full">
						<label
							className="block text-sm font-medium text-gray-700 mb-2"
							htmlFor="about">
							About
						</label>
						<textarea
							id="about"
							placeholder="Tell us about yourself"
							value={about}
							onChange={(e) => setAbout(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
							rows="4"
							required
						/>
					</div>
				)}

				{user?.skills && user?.skills.length > 0 && (
					<div className="w-full">
						<label
							className="block text-sm font-medium text-gray-700 mb-2"
							htmlFor="skills">
							Skills
						</label>
						<input
							type="text"
							id="skills"
							placeholder="Enter your skills (comma separated)"
							value={skills}
							onChange={(e) => setSkills(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
							required
						/>
					</div>
				)}

				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
					{isLoading ? (
						<>
							<span className="loading loading-spinner loading-sm"></span>
							Updating Profile...
						</>
					) : (
						"Update Profile"
					)}
				</button>
				{error && <p className="text-red-500 mt-2">{error}</p>}
			</form>
		</div>
	);
};

export default EditProfile;
