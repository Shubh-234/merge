import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/slice/userSlice";
import { removeFeed } from "../store/slice/feedSlice";
import { removeConnections } from "../store/slice/connectionsSlice";
import { removeRequests } from "../store/slice/requestsSlice";
import { useRef, useState } from "react";

const Navbar = () => {
	const userFromStore = useSelector((store) => store.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();
	const dropdownRef = useRef(null);
	const [logoutError, setLogoutError] = useState("");

	const handleLogout = async () => {
		dropdownRef.current?.blur();
		document.activeElement?.blur();
		setLogoutError("");

		try {
			const requestOptions = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({}),
			};
			const response = await fetch(
				"http://localhost:7777/api/auth/logout",
				requestOptions,
			);

			const data = await response.json();

			if (response.ok && data?.success) {
				dispatch(removeUser());
				dispatch(removeFeed());
				dispatch(removeConnections());
				dispatch(removeRequests());
				navigate("/login");
			} else {
				setLogoutError(data?.message || "Logout failed. Please try again.");
			}
		} catch (error) {
			console.error("Error during logout:", error);
			setLogoutError("Network error. Please check your connection.");
		}
	};

	// Don't show navbar on login/signup pages
	if (location.pathname === "/login" || location.pathname === "/signup") {
		return null;
	}

	return (
		<nav className="bg-[#121826] border-b border-white/10">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center gap-8">
						<NavLink
							to="/"
							className="text-xl font-semibold text-gray-200 hover:text-white transition">
							Merge
						</NavLink>

						{userFromStore && (
							<div className="hidden md:flex items-center gap-1">
								<NavLink
									to="/"
									className={({ isActive }) =>
										`px-4 py-2 text-sm font-medium rounded-md transition-all ${
											isActive
												? "text-white bg-white/10"
												: "text-gray-400 hover:text-gray-200 hover:bg-white/5"
										}`
									}>
									Feed
								</NavLink>
								<NavLink
									to="/connections"
									className={({ isActive }) =>
										`px-4 py-2 text-sm font-medium rounded-md transition-all ${
											isActive
												? "text-white bg-white/10"
												: "text-gray-400 hover:text-gray-200 hover:bg-white/5"
										}`
									}>
									Connections
								</NavLink>
								<NavLink
									to="/requests"
									className={({ isActive }) =>
										`px-4 py-2 text-sm font-medium rounded-md transition-all ${
											isActive
												? "text-white bg-white/10"
												: "text-gray-400 hover:text-gray-200 hover:bg-white/5"
										}`
									}>
									Requests
								</NavLink>
							</div>
						)}
					</div>

					<div className="flex items-center gap-4">
						{userFromStore && (
							<div className="dropdown dropdown-end">
								<div
									tabIndex={0}
									role="button"
									ref={dropdownRef}
									className="btn btn-ghost btn-circle avatar hover:bg-white/5">
									<div className="w-10 rounded-full ring-2 ring-white/10">
										<img
											alt="profile"
											src={
												userFromStore?.photoUrl ||
												"https://via.placeholder.com/150"
											}
										/>
									</div>
								</div>
								<ul
									tabIndex={0}
									className="menu dropdown-content bg-[#161C2C] border border-white/10 rounded-lg mt-3 w-52 p-2 shadow-xl z-50">
									<li>
										<button
											onClick={() => {
												navigate("/profile");
												dropdownRef.current?.blur();
											}}
											className="text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md">
											Profile
										</button>
									</li>
									<li>
										<button
											onClick={handleLogout}
											className="text-sm text-red-400 hover:text-red-300 hover:bg-white/5 rounded-md">
											Logout
										</button>
									</li>
									{logoutError && (
										<li className="px-4 py-2">
											<p className="text-xs text-red-400">{logoutError}</p>
										</li>
									)}
								</ul>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
