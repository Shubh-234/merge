import { useState } from "react";

const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const requestOptions = {
			method: "POST",
			body: JSON.stringify({ firstName, lastName, email, password }),
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		};

		const response = await fetch(
			"http://localhost:7777/api/auth/signup",
			requestOptions,
		);
		const data = await response.json();
		console.log("response", data);
		setIsLoading(false);
		alert(data.message);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
				{/* Header */}
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-blue-600 mb-2">Merge</h1>
					<p className="text-gray-600">
						Where developers merge ideas and skills
					</p>
				</div>

				{/* Signup Form */}
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Name Fields - Side by Side */}
					<div className="grid grid-cols-2 gap-4">
						<div className="w-full">
							<label
								className="block text-sm font-medium text-gray-700 mb-2"
								htmlFor="firstName">
								First Name
							</label>
							<input
								type="text"
								id="firstName"
								placeholder="John"
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
								placeholder="Doe"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
								required
							/>
						</div>
					</div>

					{/* Email Field */}
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

					{/* Password Field */}
					<div className="w-full">
						<label
							className="block text-sm font-medium text-gray-700 mb-2"
							htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							placeholder="Create a strong password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
							required
						/>
					</div>

					{/* Signup Button */}
					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6">
						{isLoading ? (
							<>
								<span className="loading loading-spinner loading-sm"></span>
								Creating account...
							</>
						) : (
							"Sign Up"
						)}
					</button>
				</form>

				{/* Divider */}
				<div className="relative my-6">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-gray-300"></div>
					</div>
					<div className="relative flex justify-center text-sm">
						<span className="px-4 bg-white text-gray-500">OR</span>
					</div>
				</div>

				{/* Login Link */}
				<div className="text-center">
					<p className="text-sm text-gray-600">
						Already have an account?{" "}
						<a
							href="#"
							className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
							Login
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
