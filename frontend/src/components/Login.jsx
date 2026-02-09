import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/slice/userSlice";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
				credentials: "include",
			};
			const response = await fetch(
				"http://localhost:7777/api/auth/login",
				requestOptions,
			).then((res) => res.json());

			if (response.success && response?.user) {
				dispatch(addUser(response.user));
				navigate("/");
			} else if (response.success === false) {
				setError(response.message || "Login failed.");
				setIsLoading(false);
			}
		} catch (error) {
			console.error("Login error:", error);
			setError("An error occurred during login. Please try again.");
			setIsLoading(false);
		}
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

				<form onSubmit={handleLogin} className="space-y-4">
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
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:border-indigo-500 transition"
							required
						/>
						<div className="mt-2 text-right">
							<a
								href="#"
								className="text-sm text-gray-400 hover:text-gray-300 transition">
								Forgot password?
							</a>
						</div>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8">
						{isLoading ? (
							<>
								<span className="loading loading-spinner loading-sm"></span>
								Logging in...
							</>
						) : (
							"Login"
						)}
					</button>
					{error && <p className="text-red-400 text-sm mt-2">{error}</p>}
				</form>

				<div className="mt-8 pt-8 border-t border-white/10">
					<p className="text-sm text-gray-400 text-center">
						Don't have an account?{" "}
						<a
							href="#"
							className="text-gray-300 hover:text-white transition">
							Sign up
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
