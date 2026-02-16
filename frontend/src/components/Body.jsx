import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/slice/userSlice";

const Body = () => {
	const userData = useSelector((store) => store.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const fetchUserData = async () => {
		if (userData) {
			return;
		}
		try {
			const url = "http://localhost:7777/api/profile/view";
			const response = await fetch(url, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			});
			if (response?.status === 401) {
				navigate("/login");
				return;
			}
			const data = await response.json();

			if (response.status === 200 && data?._id) {
				dispatch(addUser(data));
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

export default Body;
