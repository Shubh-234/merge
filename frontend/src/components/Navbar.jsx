import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/slice/userSlice";
import { useRef } from "react";

const Navbar = () => {
	const userFromStore = useSelector((store) => store.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const dropdownRef = useRef(null);

	const handleLogout = async () => {
		dropdownRef.current?.blur();
		document.activeElement?.blur();
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

			console.log("Logout response", response);
			if (response.status === 200) {
				dispatch(removeUser());
			} else {
				console.error("Logout failed with status:", response.status);
			}
			navigate("/login");
		} catch (error) {
			console.error("Error during logout:", error);
			navigate("/login");
		}
	};

	return (
		<nav className="bg-white border-b border-gray-200 shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					{/* Logo */}
					<div className="flex-shrink-0">
						<a
							href="/"
							className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
							Merge
						</a>
					</div>

					{/* Right Section */}
					<div className="flex items-center gap-4">
						{/* Search */}
						<input
							type="text"
							placeholder="Search developers..."
							className="hidden md:block px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
						/>

						{/* User Menu */}
						<div className="dropdown dropdown-end">
							{userFromStore && userFromStore?.photoUrl && (
								<div
									tabIndex={0}
									role="button"
									ref={dropdownRef}
									className="btn btn-ghost btn-circle avatar hover:bg-blue-50">
									<div className="w-10 rounded-full ring-2 ring-blue-500">
										<img alt="profile-img" src={userFromStore.photoUrl} />
									</div>
								</div>
							)}
							<ul
								tabIndex={0}
								className="menu dropdown-content bg-white rounded-lg shadow-lg border border-gray-200 mt-3 w-52 p-2 z-10">
								<li>
									<a className="hover:bg-blue-50 rounded-lg">
										<span>Profile</span>
										<span className="badge badge-sm bg-blue-600 text-white border-0">
											New
										</span>
									</a>
								</li>
								<li>
									<a className="hover:bg-blue-50 rounded-lg">Settings</a>
								</li>
								<li>
									<a
										onClick={handleLogout}
										className="hover:bg-red-50 text-red-600 rounded-lg">
										Logout
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
