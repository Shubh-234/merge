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
		<nav className="bg-[#121826] border-b border-white/10">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between items-center h-16">
					<div className="flex-shrink-0">
						<a
							href="/"
							className="text-xl font-semibold text-gray-200 hover:text-white transition">
							Merge
						</a>
					</div>

					<div className="flex items-center gap-4">
						<input
							type="text"
							placeholder="Search developers..."
							className="hidden md:block bg-transparent border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 rounded-md focus:outline-none focus:border-indigo-500 transition w-64"
						/>

						<div className="dropdown dropdown-end">
							{userFromStore && userFromStore?.photoUrl && (
								<div
									tabIndex={0}
									role="button"
									ref={dropdownRef}
									className="btn btn-ghost btn-circle avatar hover:bg-white/5">
									<div className="w-10 rounded-full ring-2 ring-white/10">
										<img alt="profile-img" src={userFromStore.photoUrl} />
									</div>
								</div>
							)}
							<ul
								tabIndex={0}
								className="menu dropdown-content bg-[#161C2C] border border-white/10 rounded-lg mt-3 w-52 p-2 z-10">
								<li>
									<a className="text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md">
										Profile
									</a>
								</li>
								<li>
									<a className="text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md">
										Settings
									</a>
								</li>
								<li>
									<a
										onClick={handleLogout}
										className="text-sm text-red-400 hover:text-red-300 hover:bg-white/5 rounded-md">
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
