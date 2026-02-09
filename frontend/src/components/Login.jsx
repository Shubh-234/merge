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
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4 py-12">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
				<div className="text-center mb-8">
					<h1 className="text-4xl font-bold text-blue-600 mb-2">Merge</h1>
					<p className="text-gray-600">
						Where developers merge ideas and skills
					</p>
				</div>

				<form onSubmit={handleLogin} className="space-y-5">
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
							htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							placeholder="Enter your password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
							required
						/>
						<div className="mt-2 text-right">
							<a
								href="#"
								className="text-sm text-blue-600 hover:text-blue-700 hover:underline">
								Forgot password?
							</a>
						</div>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
						{isLoading ? (
							<>
								<span className="loading loading-spinner loading-sm"></span>
								Logging in...
							</>
						) : (
							"Login"
						)}
					</button>
					{error && <p className="text-red-500  mt-2">{error}</p>}
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

				<div className="text-center">
					<p className="text-sm text-gray-600">
						Don't have an account?{" "}
						<a
							href="#"
							className="text-blue-600 font-semibold hover:text-blue-700 hover:underline">
							Sign up
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
