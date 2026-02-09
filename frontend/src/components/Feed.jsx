import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/slice/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
	const dispatch = useDispatch();
	const feedData = useSelector((store) => store.feed);
	const user = useSelector((store) => store.user);
	const getFeed = async () => {
		if (feedData) {
			return null;
		}
		try {
			const requestOptions = {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
			};
			const response = await fetch(
				"http://localhost:7777/api/users/feed",
				requestOptions,
			);
			const data = await response.json();
			dispatch(addFeed(data?.data));
		} catch (error) {
			console.error("Error fetching feed:", error);
		}
	};

	useEffect(() => {
		getFeed();
	}, []);

	if (feedData) {
		console.log("feed data in feed component", feedData);
	}

	const userToShow = feedData && feedData.length > 0 ? feedData[0] : null;

	return <UserCard user={userToShow} />;
};

export default Feed;
