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
		<div className="min-h-screen bg-[#0B0F14] flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-md bg-[#121826] border border-white/10 rounded-lg p-8">
				<div className="mb-8">
					<h1 className="text-2xl font-semibold text-gray-200 mb-2">Merge</h1>
					<p className="text-sm text-gray-400">
						Where developers merge ideas and skills
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="w-full">
							<label
								className="block text-sm font-medium text-gray-300 mb-2"
								htmlFor="firstName">
								First Name
							</label>
							<input
								type="text"
								id="firstName"
								placeholder="John"
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
								placeholder="Doe"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								className="w-full bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:border-indigo-500 transition"
								required
							/>
						</div>
					</div>

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
							htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							placeholder="Create a strong password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:border-indigo-500 transition"
							required
						/>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8">
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

				<div className="mt-8 pt-8 border-t border-white/10">
					<p className="text-sm text-gray-400 text-center">
						Already have an account?{" "}
						<a
							href="#"
							className="text-gray-300 hover:text-white transition">
							Login
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
