import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import feedReducer from "./slice/feedSlice";

const loadState = () => {
	try {
		const data = localStorage.getItem("app_state");
		console.log("Loaded state from localStorage:", data);
		return data ? JSON.parse(data) : undefined;
	} catch (e) {
		console.error("Failed to load state from localStorage:", e);
		return undefined;
	}
};

const store = configureStore({
	reducer: {
		user: userReducer,
		feed: feedReducer,
	},
	preloadedState: loadState(),
});

store.subscribe(() => {
	try {
		localStorage.setItem(
			"app_state",
			JSON.stringify({
				user: store.getState().user,
			}),
		);
	} catch (e) {
		console.error("Failed to save state:", e);
	}
});

export default store;
